#!/bin/python3

from fastapi import FastAPI, Request, Form
from fastapi.templating import Jinja2Templates
from fastapi.staticfiles import StaticFiles
from fastapi.responses import HTMLResponse

from googletrans import Translator
# pour installation : conda install -c conda-forge googletrans
# ou : pip3 install googletrans==3.1.0a0

import deepl

import json
import os
from fastapi.responses import JSONResponse

from pysolr import Solr

import nltk # score meteor
import jieba # tokenisation

app = FastAPI()
templates = Jinja2Templates(directory="templates")

# URL de l'API Solr
solr_url = 'http://localhost:8983/solr/tradAPI'

# Initialisez l'objet Solr
solr = Solr(solr_url, always_commit=True)

# ressources statiques du site (css, images...)
app.mount("/static", StaticFiles(directory="static"), name="static")

@app.get("/")
async def root(request: Request): # il faut avoir une fonction root pour le lien de redirection du menu (dans index.html)
	return templates.TemplateResponse("home.html", {"request": request})

@app.get("/home")
async def root(request: Request):
	return templates.TemplateResponse("home.html", {"request": request})

# GET
@app.get("/translate", response_class=HTMLResponse)
async def api_trad(request: Request):
	return templates.TemplateResponse("translate.html", {"request":request})

@app.get("/presentation", response_class=HTMLResponse)
async def presentation(request: Request):
	return templates.TemplateResponse("presentation.html", {"request":request})

@app.get("/history", response_class=HTMLResponse)
async def history(request: Request):
	return templates.TemplateResponse("history.html", {"request":request})
	
# googletrans # 
@app.post("/translate")
async def translate_text(request: Request):
	try:
		data = await request.json()
		text_to_translate = data.get("text", "")
		target_language = data.get("target", "en")  # anglais par défaut
		# target_language = 'asdfasdfasd'  # delete error
		
		translator = Translator()
		translation = translator.translate(text_to_translate, dest=target_language).text
		data = {"translation": translation}
		return JSONResponse(content=data)
	except Exception as e:
		error_message = "An error occurred during translation: " + str(e)
		return JSONResponse(content={"error": error_message}, status_code=500)

# DeepL
auth_key = "f14fc7aa-2487-49ee-a08f-088a09ad039a:fx"  # Remplacez par votre clé
translator_deepl = deepl.Translator(auth_key)

@app.post("/translate_deepl")
async def translate_text_deepl(request: Request):
    try:
        data = await request.json()
        text_to_translate = data.get("text", "")
        target_language = data.get("target", "EN")  # Anglais par défaut
        result = translator_deepl.translate_text(text_to_translate, target_lang=target_language)
        translation = result.text
        data = {"translation": translation}
        return JSONResponse(content=data)
    except Exception as e:
        error_message = "An error occurred during translation: " + str(e)
        return JSONResponse(content={"error": error_message}, status_code=500)

@app.post("/save_traduction")
async def ajouter_element(request: Request):
	try:
		data = await request.json()
		trad_source = data.get("source", "")
		trad_cible = data.get("texte", "")
		langue = data.get("langue", "EN")

		# Créez un document à ajouter à Solr
		document = {
			"langue": langue,
			"trad_source": trad_source,
			"trad_cible": trad_cible
		}

		# Ajoutez le document à Solr
		solr.add([document])

		# Renvoyez une réponse confirmant que l'élément a été ajouté avec succès
		return JSONResponse(content={"message": "L'élément a été ajouté avec succès à Solr."})
	except Exception as e:
		error_message = "An error occurred during Solr access: " + str(e)
		return JSONResponse(content={"error": error_message}, status_code=500)


@app.get("/load_translations")
async def load_translations(request: Request):
    try:
        # Effectuez une requête à Solr pour récupérer les traductions
        # Assurez-vous d'adapter cette partie selon votre modèle de données et votre configuration Solr
        translations = solr.search('*:*', rows=1000000)  # Exemple de requête pour récupérer toutes les traductions
        translations = translations.raw_response['response']['docs']

        formatted_translations = []

        for translation in translations:
            if 'trad_cible' in translation and 'trad_source' in translation and 'langue' in translation:
                formatted_translation = {
                    'target_lang': translation['langue'],
                    'source_text': translation['trad_source'],
                    'target_text': translation['trad_cible']
                }
                formatted_translations.append(formatted_translation)
   
        # Renvoyez les données de traduction formatées
        return JSONResponse(content=formatted_translations)
    except Exception as e:
        error_message = "An error occurred while loading translations: " + str(e)
        return JSONResponse(content={"error": error_message}, status_code=500)

### ajout de la partie pour enlever les traductions sauvegardées	####
@app.delete("/remove_saved_translation")  # supprimer
async def delete_translation(request: Request):
	try:
		data = await request.json()
		trad_source = data.get("source", "")
		trad_cible = data.get("texte", "")
		langue = data.get("langue", "EN")
		
		# Find and delete the translation from Solr
		query = f"trad_source:\"{trad_source}\" AND trad_cible:\"{trad_cible}\" AND langue:\"{langue}\""
		results = solr.search(query)
        
		if len(results) > 0:
			traductions = results.raw_response['response']['docs']
			for t in traductions:
				id_trad = t['id']
				print(t)
				solr.delete(id_trad)#delete_by_query(query)
			solr.commit()
			return JSONResponse(content="message:Translation of {trad_source} deleted successfully.")
		else:
            # If the translation does not exist, return a message
			return {"message": f"No translation found for {trad_source} with target text {trad_cible} in language {langue}."}
	except Exception as e:
		error_message = "An error occurred during Solr access: " + str(e)
		return JSONResponse(content={"error": error_message}, status_code=500)

##### fin fonction remove_saved_trad ####
@app.post("/scores_meteor")
async def calcul_meteor(request:Request):
	"""
	On a 4 traductions de référence. N'appeler la fonction qu'une fois.
	"""
	try:
		data = await request.json() 
		trad_ref = data.get("trad1", "") 
		trad_cible = data.get("trad2", "")
		langue = data.get("lang", "EN")
		if langue == "chinois":
			trad_ref = [tokenize_chinese(t) for t in trad_ref]
			trad_cible = tokenize_chinese(trad_cible)
		else:
			trad_ref = [tokenize_autre(t) for t in trad_ref]
			trad_cible = tokenize_autre(trad_cible)
		res = nltk.translate.meteor_score.meteor_score(trad_ref, trad_cible, gamma=0)
		res = round(res, 3)
		res_single = []
		for ref in trad_ref:
			res_single.append(round(nltk.translate.meteor_score.single_meteor_score(ref, trad_cible, gamma=0), 3))
		return JSONResponse(content={"score_meteor": str(res), "single_scores_meteor":res_single})
	except Exception as e:
		error_message = "An error occurred during scores meteor: " + str(e)
		return JSONResponse(content={"error": error_message}, status_code=500)
		
def tokenize_chinese(texte):
	return list(jieba.cut(texte))
def tokenize_autre(texte):
	return list(texte.split())