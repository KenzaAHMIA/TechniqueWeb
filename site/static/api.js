$(document).ready(function() {

// ----------------- document vars -----------------
// div du html qui sont manipulées par ce script.
const traduire = $('#traduire');
const textarea = $('#input-text');
const api_div = $('#api');

const translatePlus_output = $('#translatePlus-output');

// ----------------- language codes ----------------
// Définition des dictionnaires avec comme clé l'identifiant
// des radio button, comme valeur le code langue selon l'API.
// -------- 1. translatePlus -----------------------
// SUPPORTED : bn, ar, fr, zh-CN
const translatePlusLang = {
 'arabe': 'ar',
 'bengali': 'bn',
 'chinois':'zh-CN',
 'francais':'fr'};

// Fonction qui renvoie l'attribut id du bouton radio sélectionné.
// Peut renvoyer : arabe, bengali, chinois ou francais.
function getSelectedLang() {
 return $('input[type=radio][name=targetLanguage]:checked').attr('id');
}

// -----------  clic sur le bouton traduire ---------
$('form').submit(function(event) {
 event.preventDefault();
 var lang = "zh-CN";
 lang = getSelectedLang();
 text = textarea.val();
 if (text.length == 0) {
  return;
 }else {
  // TODO afficher la div de chargement

  // ------------ récupération des traductions ----__------
  getTranslatePlus(textarea.val(), translatePlusLang[lang]);
  // TODO appeler les fonctions des autres API

  // Affiche la classe des traductions des APIs
  api_div.addClass('active');
 }
});

// ----------------- translateplus -----------------
// Fonction qui appelle l'API de translatePlus
// et écrit dans la balise de résultat la traduction
// obtenue.
// TODO pour améliorer le résultat, il faut faire en sorte
// que la balise ne soit pas affichée si l'API ne renvoie
// rien.
const apiUrl_tp = "https://api.translateplus.io/v1/translate";
const apiKey_tp = '83168afac2c13b8117482eb869bf5872f144ae5c';

function getTranslatePlus(text, target_language) {
  // Récupération de la langue source si nécessaire
  /*
  console.log(text);
  var data = {
   text: text,
   source: "auto",
   target: target_language
  };
  fetch(apiUrl_tp, {
   method: "POST",
   headers: {
    "Content-Type": "application/json",
    "X-API-KEY": apiKey_tp},
   body: JSON.stringify(data)})
   .then(response => {
    if (!response.ok) {
      translatePlus_output.text("Une erreur s'est produite lors de la connexion à l'API de translatePlus.");
      throw new Error('Network response was not ok. Response code: ' + response);
    }
    return response.json();
    })
    .then(protectedData => {
     var output_text = protectedData.translations.translation;
     // Ajout de la traduction dans la balise
     translatePlus_output.text(output_text);
    })
    .catch(error => {
     console.error('Error:', error);
   });*/
   translatePlus_output.text("Debug mode");
}

});
