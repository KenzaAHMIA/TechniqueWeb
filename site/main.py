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

app = FastAPI()
templates = Jinja2Templates(directory="templates")

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
        target_language = data.get("target", "en")  # Anglais par défaut

        result = translator_deepl.translate_text(text_to_translate, target_lang=target_language)
        translation = result["translations"][0]["text"]
        data = {"translation": translation}
        return JSONResponse(content=data)
    except Exception as e:
        error_message = "An error occurred during translation: " + str(e)
        return JSONResponse(content={"error": error_message}, status_code=500)
