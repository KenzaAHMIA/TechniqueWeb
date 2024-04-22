#!/bin/bash

# Script qui lance le serveur libretranslate puis le serveur main
# et enfin qui ferme les deux serveurs en même temps en cas de Ctrl-C

uvicorn main:app --reload & libretranslate --update-models --load-only fr,zh,ar,bn,en

