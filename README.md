# TechniqueWeb
Traduction multilingue via des API


# I. Cahier des charges 

### <ins>Public cible</ins>
- tout public pour usage individuel
- pas possible de traduire des grosses quantités des données à la fois


### <ins>État de l'art</ins>

### 1. Idées API
1) Google cloud API (normalement fait toutes les langues)
2) DeepL  (pas de bengali)
3) [LibreTranslate](https://libretranslate.com/?source=auto&target=en&q=) -> ok pour l'arabe et le bengali , chinois,  français
4) [IBM cloud](https://cloud.ibm.com/catalog/services/language-translator)

- A tester d'autres APIs

### 2. Idées sites 
- [ChatDico](https://chatdico.com/)





### <ins>Ergonomie (logo, couleurs, police, accessibilité)</ins>
(à remplir)
### 1. Listes des pages 
Page d’accueil.
Fonctionnalité : Se connecter | Continuer sans se connecter
Page de connexion | d’inscription
Propose les deux méthodes en masquant / affichant la div d’inscription / de connexion.
Redirige sur la page de traduction une fois l’utilisateur connecté.

Page de traduction.
Fonctionnalité : texteArea pour rentrer son texte ; choix de la langue cible ; apparition des traductions provenant des API.
Bouton ‘Traduire’ qui provoque l’apparition des traductions provenant des API qui proposent la langue cible choisie.
Possibilité de choisir une traduction de référence pour l’éditer. Cliquer sur une des quatre traductions ouvre la page d’édition.

Page d’édition de la traduction
Fonctionnalité : modifier le texte , copier-coller le texte.
Propose un TextArea avec la traduction choisie provenant de la page précédente.
Propose d’éditer de deux manières : soit en se servant des traductions des API (récupérées de la page précédente), soit en éditant soi-même le texte.


Bouton enregistrer qui permet de garder ses traductions :
    
Si l’utilisateur n’est pas connecté et qu’il clique sur ‘enregistrer ma traduction’ : enregistrer dans des variables les traductions et ouvrir la page de connexion | inscription. Puis revient à la page de traduction.
Si l’utilisateur est connecté : affiche que la traduction est enregistrée mais ne quitte pas la page.

Bouton ‘copier’ pour faciliter la copie du texte.
Cette page n’est pas une page séparée de la page de Traduction. Il s’agit d’une div qui apparaît, afin de garder un aperçu sur les 
Page de consultation des traductions (Mes traductions)
Onglet présent en haut de la page uniquement si l’utilisateur est connecté.
Liste des traductions enregistrées pour l’utilisateur avec un aperçu langue-cible langue-source.
Cliquer sur cet aperçu ouvre une page d’édition de la traduction.

Page ‘Qui sommes-nous ?’
Page vitrine qui présente les membres du projet, le cadre du projet, nos différents diagrammes, notre cahier des charges, etc.


### <ins>Liste des fonctionnalités</ins>
côté interface (formulaires, visualisations, etc) et côté serveur (librairies Python à utiliser, format des données à manipuler, bases de données) 


### <ins>Conception</ins>
répartition des tâches au sein du groupe
(à remplir)




# II. Visuels
(Wireframes, prototypes)
(à remplir)



