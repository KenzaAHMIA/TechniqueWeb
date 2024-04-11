$(document).ready(function() {

// ----------------- document vars -----------------
// div du html qui sont manipulées par ce script.
const traduire = $('#traduire');
const textarea = $('#input-text');
const api_div = $('#api');

const apiRes = $("#api-res")
//const translatePlus_output = $('#translatePlus-output');

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
 }
  // Affiche la div de chargement avec Spinner à la place du texte
  // "Traductions trouvées..."
  $("#spinner").css("display", "block");
  $("#messageApiOk").css("display","none");

  // Cache les balises des anciennes traductions pour les 4 api
  api_div.removeClass('active');
  for (let index = 1; index < 4; index++) {
   $("#api-col-" + index).css("display", "none");
  }

  // ------------ récupération des traductions ------------
  // i est le nombre d'API qui ont fonctionné.
  let i = 1;
  i = getTranslatePlus(textarea.val(), translatePlusLang[lang], i);

  // TODO appeler les fonctions des autres API

  // appel fonction googletrans - shami 
  i = getGoogletrans(textarea.val(), translatePlusLang[lang], i);



  // i = getDeepl(textarea.val(), deepLLang[lang], i);



  // Affiche la classe des traductions des APIs
  $("#spinner").css("display", "none");
  $("#messageApiOk").css("display","block");
  api_div.addClass('active');

});

// ----------------- add_ranslation ----------------
// Fonction qui ajoute une traduction dans la liste des
// résultats et l'affiche. Elle doit être appelée uniquement
// si l'API a donné un résultat.
function add_translation(text, api_name, i) {
 $("#api-col-" + i).css("display", "block");
 $("#api-name-" + i).text(api_name);
 $("#api-text-" + i).text(text);
}

// ----------------- translatePlus -----------------
// Variables de la requête HTTP à envoyer à translatePlus
const apiUrl_tp = "https://api.translateplus.io/v1/translate";
const apiKey_tp = '83168afac2c13b8117482eb869bf5872f144ae5c';


// Fonction qui appelle l'API de translatePlus
// et écrit dans la balise de résultat la traduction
// obtenue si l'API a réussi. La fonction doit obligatoirement
// renvoyer une valeur de i. Soit i + 1 si l'API a réussi,
// soit i si elle n'a pas réussi.
function getTranslatePlus(text, target_language, i) {
  /*var data = {
   text: text,
   source: "auto", // Détection automatique de la langue par translatePlus
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
      throw new Error('Network response was not ok. Response code: ' + response);
    }
    return response.json();
    })
    .then(protectedData => {
     var output_text = protectedData.translations.translation;
     // Ajout de la traduction dans la balise
     add_translation(output_text, "translatePlus", i);
     return i + 1; //Ecris la prochaine api dans la colonne suivante.
    })
    .catch(error => {
     console.error('Error:', error);
   });
   return i;*/

   // Commenter le code précédent et utiliser ce code en cas de débugage d'une
   // autre API afin et décommenter les deux lignes suivantes afin
   // d'économiser des requêtes HTTP vers translatePlus

   add_translation("Debug mode", "translatePlus", i);
   return i + 1; // a fonctionné.
 }


 // ----------------------- googletrans  -----------------------
function getGoogletrans(text, target_language, i) {
  var data = {
    text: text,
    source: "auto", // Détection automatique de la langue par googletrans
    target: target_language
   };

  // POST request to the backend
  fetch("/translate", {
      method: "POST",
      headers: {
          "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok. Response code: ' + response);
    }
    return response.json();
    })
    .then(data => {
      var output_text = data.translation;
      // Ajout de la traduction dans la balise
      add_translation(output_text, "Google Translate", i);
      return i + 1; //Ecris la prochaine api dans la colonne suivante.
     })
     .catch(error => {
      console.error('Error:', error);
    });
    return i;

  }
// ----------------- end googletrans -----------------



});
