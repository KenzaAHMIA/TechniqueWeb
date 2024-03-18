# TechniqueWeb
Traduction multilingue via des API


# I. Cahier des charges 

### <ins>Public cible</ins>
- Notre public cible est tout utilisateur qui a besoin de traduire un texte mais ne sait pas quel traducteur utiliser.
- Usage individuel et particulier, non industriel, car les API de traduction proposées sur le marché ont une limite de mots par mois. Peu de public, sinon il va falloir envisager un abonnement mensuel (les API en illimité sont payantes).
- limitation de mots : 500 mots, à titre indicatif


### <ins>État de l'art</ins>

### 1. Idées API
1) Google cloud API (normalement fait toutes les langues)
2) DeepL  (pas de bengali)
3) [LibreTranslate](https://libretranslate.com/?source=auto&target=en&q=) -> ok pour l'arabe et le bengali , chinois,  français
4) [IBM cloud](https://cloud.ibm.com/catalog/services/language-translator)

- A tester d'autres APIs

### 2. Idées sites 
- [ChatDico](https://chatdico.com/)



### <ins>Liste des fonctionnalités</ins> - Analyse fonctionnelle
### Fonctionnalité Principale
- FP1  Traduire un texte de n’importe quelle langue source vers une langue cible parmi : chinois, arabe, bengali et français.

### Fonctionnalités Secondaires
FS1 Ecrire ou coller un texte dans n’importe quelle langue source
- Choisir une langue cible
- Comparer les traductions
- Editer les traductions en piochant entre les différentes traductions proposées
- Editer le texte traduit directement
- Copier le texte facilement (bouton copier)
- Créer un compte
- Se connecter / Se déconnecter
- Enregistrer nos traductions (BDD)
- Consulter nos traductions (triées par dernière modification)
- Modifier nos traductions

: « Bête à cornes » et « Diagramme pieuvre »

### Scénario utilisateur
Le visiteur peut choisir de se connecter ou non sur TradAPI. Lorsqu’il arrive sur le site, il a le choix de tester directement la traduction ou de créer un compte.


### <ins>Ergonomie (logo, couleurs, police, accessibilité)</ins>
(à remplir)


### 1. Listes des pages 
**Page d’accueil.**<br/>
<ins>Fonctionnalité</ins> Se connecter | Continuer sans se connecter.
Les deux redirigent sur la page de traduction.
<ins>Page présente dans la navbar<ins> : oui.

**Page de traduction.**<br/>
<ins>Fonctionnalité</ins> : texteArea pour rentrer son texte ; choix de la langue cible ; apparition des traductions provenant des API.
Bouton ‘Traduire’ qui provoque l’apparition des traductions provenant des API qui proposent la langue cible choisie.
Possibilité de choisir une traduction de référence pour l’éditer. Cliquer sur une des quatre traductions ouvre la page d’édition.

**Page d’édition de la traduction**<br/>
<ins>Fonctionnalité</ins> : modifier le texte , copier-coller le texte.
Propose un TextArea avec la traduction choisie provenant de la page précédente.
Propose d’éditer de deux manières : soit en se servant des traductions des API (récupérées de la page précédente), soit en éditant soi-même le texte.


Bouton enregistrer qui permet de garder ses traductions :
    
Si l’utilisateur n’est pas connecté et qu’il clique sur ‘enregistrer ma traduction’ : enregistrer dans des variables les traductions et ouvrir la page de connexion | inscription. Puis revient à la page de traduction.
Si l’utilisateur estaccessibilité connecté : affiche que la traduction est enregistrée mais ne quitte pas la page.

Bouton ‘copier’ pour faciliter la copie du texte.
Cette page n’est pas une page séparée de la page de Traduction. Il s’agit d’une div qui apparaît, afin de garder un aperçu sur les 
Page de consultation des traductions (Mes traductions)
Onglet présent en haut de la page uniquement si l’utilisateur est connecté.
Liste des traductions enregistrées pour l’utilisateur avec un aperçu langue-cible langue-source.
Cliquer sur cet aperçu ouvre une page d’édition de la traduction.

**Page ‘Qui sommes-nous ?’**<br/>
Page vitrine qui présente les membres du projet, le cadre du projet, nos différents diagrammes, notre cahier des charges, etc.


### <ins>Liste des fonctionnalités</ins>
côté interface (formulaires, visualisations, etc) et côté serveur (librairies Python à utiliser, format des données à manipuler, bases de données) 


### <ins>Conception</ins>
répartition des tâches au sein du groupe
(à remplir)




# II. Visuels
(Wireframes, prototypes)
(à remplir)



