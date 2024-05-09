## Projet TechniqueWeb: Application de Traduction Multilingue

Le Projet TechniqueWeb se concentre sur le développement d'une application de traduction multilingue efficace, exploitant les API disponibles.

## Nom de l'application : tradAPI

## Membres de l'équipe du projet

- Alice WALLARD
- Kenza AHMIA
- Liza FRETEL
- Shami THIRION SEN

## Instructions d'installation

### Étape 1 : Cloner le référentiel

- Utilisez la commande suivante pour cloner le référentiel :

```bash
git clone git@github.com:KenzaAHMIA/TechniqueWeb.git
```

### Étape 2 : Créer la base de données Solr

1. Positionnez-vous dans le répertoire Solr.
2. Lancer le serveur solr :

```bash
   bin/solr start
```

3. Créez la base de données tradAPI :

```bash
bin/solr create -c tradAPI
```

4. Définissez le schéma de la base de données :

```bash
curl -X POST -H 'Content-type:application/json' --data-binary '{ "add-field": [{"name":"id", "type":"integer", "multiValued":false, "stored":true, "indexed":true} ,{"name":"langue", "type":"string", "multiValued":false, "stored":true, "indexed":true}, {"name":"trad_source", "type":"string", "multiValued":false, "stored":true, "indexed":true}, {"name":"trad_cible", "type":"string", "multiValued":false, "stored":true, "indexed":true} ]}' http://localhost:8983/solr/tradAPI/schema
```

### Étape 3 : Installer les dépendances

1. Depuis le dossier parent du projet /TechniqueWeb.
2. Installez les librairies et modules requis à l'aide de la commande :

```bash
pip install -r requirements.txt
```

### Étape 4 : Lancer le serveur

1.  Se potisionner dans le dossier du site ./site.
2.  Exécutez le script _start.sh_ pour démarrer le serveur :

```bash
bash start.sh*
```

2.  Accédez au site en utilisant l'adresse : `127.0.0.1:8000`.

## Fonctionnalités de l'application

- Traduire des textes dans 4 langues différentes (français, arabe, bengali, chinois) et à partir de n'importe quel autre langue.
- Copier le texte source et/ou la traduction.
- Éditer les traductions.
- Enregistrer les traductions en cliquant sur l'icône de l'étoile.
- Supprimer les traductions sauvegardées depuis **Mes Traductions** en cliquant sur l'étoile jaune.

## Autres

- Possibilité de navigation 100% clavier.
