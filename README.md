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






### <ins>Ergonomie (logo, couleurs, police, accessibilité)</ins>
(à remplir)


### 1. Listes des pages 
**Page d’accueil.**<br/>
<ins>Fonctionnalité</ins> Se connecter | Continuer sans se connecter.
Les deux redirigent sur la page de traduction.
<ins>Page présente dans la navbar<ins> : oui.

**Page et div de connexion | d’inscription**<br/>
<ins>Fonctionnalité</ins> : s’inscrire / se connecter
Il y a une page de connexion ET une div de connexion. Cette div est utilisée sur la page d’accueil. Elle est utilisée aussi sur la page d’édition de la traduction (si l’utilisateur veut enregistrer sa traduction). Le format <div> cachée permet de ne pas avoir besoin de quitter la page courante pour se connecter et donc de garder l’environnement actif avec toutes ses variables : les textes traduits notamment.
Propose les deux méthodes en masquant / affichant la div d’inscription / de connexion.
S’il s’agit de la page de connexion, redirige sur la page de traduction une fois l’utilisateur connecté.
<ins>Page présente dans la navbar</ins> : si l’utilisateur n’est pas connecté. S’il est connecté, lien ‘Se déconnecter’ dans la navbar.


**Page de traduction.**<br/>
<ins>Fonctionnalité</ins> : texteArea pour rentrer son texte ; choix de la langue cible.
Bouton ‘Traduire’ qui provoque l’apparition des traductions provenant des API qui proposent la langue cible choisie.
<ins>Page présente dans la navbar</ins> : oui


**Div des traductions proposées**<br/>
<ins>Fonctionnalité</ins> : visualiser le résultat des traductions provenant des API.
Div qui apparaît lorsqu’on appuie sur le bouton ‘Traduire’.
Possibilité de choisir une traduction de référence pour l’éditer. Cliquer sur une des quatre traductions ou sur le petit crayon fait apparaître la div d’édition.
<ins>Page présente dans la navbar</ins>: non

**Div d’édition de la traduction**<br/>
<ins>Fonctionnalité</ins>: modifier le texte , copier-coller le texte.
Div qui apparaît lorsque l’utilisateur clique sur une des traductions proposées ou sur un bouton d’édition. 
Propose un TextArea avec la traduction choisie provenant de la page précédente.
Propose d’éditer de deux manières : soit en se servant des traductions des API (récupérées de la page précédente), soit en éditant soi-même le texte.
Bouton enregistrer qui permet de garder ses traductions :
	- Si l’utilisateur n’est pas connecté et qu’il clique sur ‘enregistrer ma traduction’ : enregistrer dans des variables les traductions et ouvrir la page de connexion | inscription. Puis revient à la page de traduction.
	- Si l’utilisateur est connecté : affiche que la traduction est enregistrée mais ne quitte pas la page.
Bouton ‘copier’ pour faciliter la copie du texte.
Cette page n’est pas une page séparée de la page de Traduction. Il s’agit d’une div qui apparaît, afin de garder un aperçu sur les 
<ins>Page présente dans la navbar</ins>:  non

**Page de consultation des traductions (Mes traductions)**<br/>
<ins>Fonctionnalité</ins>:  lister les traductions enregistrées pour un utilisateur.
Liste des traductions enregistrées pour l’utilisateur avec un aperçu langue-cible langue-source.
Cliquer sur cet aperçu ouvre la div d’édition de la traduction.
<ins>Page présente dans la navbar</ins>:si l’utilisateur est connecté


**Page ‘Qui sommes-nous ?’**<br/>
Page vitrine qui présente les membres du projet, le cadre du projet, nos différents diagrammes, notre cahier des charges, etc.

<ins>Page présente dans la navbar</ins>: oui



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


### <ins>Conception</ins>
répartition des tâches au sein du groupe
(à remplir)




# II. Visuels
(Wireframes, prototypes)
(à remplir)



