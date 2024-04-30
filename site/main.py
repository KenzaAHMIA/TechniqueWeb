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

from datasets import load_metric
meteor = load_metric('meteor')
import jieba

app = FastAPI()
templates = Jinja2Templates(directory="templates")

# URL de l'API Solr
solr_url = 'http://localhost:8983/solr/tradAPI'

# Initialisez l'objet Solr
solr = Solr(solr_url, always_commit=True)

# ressources statiques du site (css, images...)
app.mount("/static", StaticFiles(directory="static"), name="static")

@app.get("/hello-world")
def helloworld():
	return {"Hello": "World"}

@app.get("/")
async def root(request: Request): # il faut avoir une fonction root pour le lien de redirection du menu (dans index.html)
	return templates.TemplateResponse("home.html", {"request": request})

@app.get("/home")
async def root(request: Request):
	return templates.TemplateResponse("home.html", {"request": request})


# GET
@app.get("/translate", response_class=HTMLResponse)
async def recettes(request: Request):
	return templates.TemplateResponse("translate.html", {"request":request})

@app.get("/presentation", response_class=HTMLResponse)
async def recettes(request: Request):
	return templates.TemplateResponse("presentation.html", {"request":request})

@app.get("/history", response_class=HTMLResponse)
async def recettes(request: Request):
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
@app.get("/remove_saved_translation") # delete
async def remove_saved_trad(request: Request):
	try:
		# chercher dans la bd solr
		results = solr.search("*:*")
		traductions = results.docs
		#### Ici je sais pas comment tester la bdd, il faut 
		# 1. vérifier si la traduction existe
		# 2. si oui, la supprimer de la bdd
		# TODO: à compléter
  
	except Exception as e:
		error_message = "An error occurred during Solr access: " + str(e)
		return JSONResponse(content={"error": error_message}, status_code=500)

##### fin fonction remove_saved_trad ####
@app.post("/scores_meteor")
async def calcul_meteor(request:Request):
	try:
		data = await request.json() # 
		trad_ref = data.get("trad1", "") 
		trad_cible = data.get("trad2", "")
		langue = data.get("lang", "EN")
		if langue == "chinois":
			trad_ref = tokenize_chinese(trad_ref)
			trad_cible = tokenize_chinese(trad_cible)
		res = meteor.compute(predictions=trad_cible, references=trad_ref)
		return JSONResponse(content={"score_meteor": str(res)})
	except Exception as e:
		error_message = "An error occurred during scores meteor: " + str(e)
		return JSONResponse(content={"error": error_message}, status_code=500)
		
def tokenize_chinese(texte):
	return " ".join(jieba.cut(texte))