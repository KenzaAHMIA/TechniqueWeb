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

1. Positionnez-vous dans le répertoire d'installation de Solr.
2. Lancer solr : `bin/solr start`
3. Créez la base de données tradAPI : `bin/solr create -c tradAPI`
4. Définissez le schéma de la base de données :

```bash
        curl -X POST -H 'Content-type:application/json' --data-binary '{ "add-field": [{"name":"id", "type":"integer", "multiValued":false, "stored":true, "indexed":true} ,{"name":"langue", "type":"string", "multiValued":false, "stored":true, "indexed":true}, {"name":"trad_source", "type":"string", "multiValued":false, "stored":true, "indexed":true}, {"name":"trad_cible", "type":"string", "multiValued":false, "stored":true, "indexed":true} ]}' http://localhost:8983/solr/tradAPI/schema
```

### Étape 3 : Installer les dépendances

1. Accédez au dossier parent du site /site
2. Installez les librairies et modules requis à l'aide de la commande : `pip install -r requirements.txt`

## Étape 4 : Lancer le serveur

1.  Exécutez le script _start.sh_ pour démarrer le serveur : `bash start.sh*`
2.  Accédez au site en utilisant l'adresse : `127.0.0.1:8000`.
