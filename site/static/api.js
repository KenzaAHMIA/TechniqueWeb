$(document).ready(function () {
  // ----------------- document vars -----------------
  // div du html qui sont manipulées par ce script.
  const traduire = $("#traduire");
  const textarea = $("#input-text");
  const api_div = $("#api");

  var old_text = "";

  //const translatePlus_output = $('#translatePlus-output');

  // ----------------- language codes ----------------
  // Définition des dictionnaires avec comme clé l'identifiant
  // des radio button, comme valeur le code langue selon l'API.
  // -------- 1. translatePlus -----------------------
  // SUPPORTED : bn, ar, fr, zh-CN
  const translatePlusLang = {
    arabe: "ar",
    bengali: "bn",
    chinois: "zh-CN",
    francais: "fr",
  };
  // Pas de bengali
  const deeplLang = {
    arabe: "AR",
    francais: "FR",
    chinois: "ZH"
  };
  const libreTranslateLang = {
    arabe: "ar",
    bengali: "bn",
    chinois: "zh",
    francais: "fr",
  };

  // Fonction qui renvoie l'attribut id du bouton radio sélectionné.
  // Peut renvoyer : arabe, bengali, chinois ou francais.
  function getSelectedLang() {
    return $("input[type=radio][name=targetLanguage]:checked").attr("id");
  }

  // -----------  clic sur le bouton traduire ---------
  $("form").submit(function (event) {
    event.preventDefault();
    var lang = "zh-CN";
    lang = getSelectedLang();
    text = textarea.val();
    if (text.length == 0) {
      return;
    }
    if (text != old_text || lang != old_lang) {
     // Affiche la div de chargement avec Spinner à la place du texte
     // "Traductions trouvées..."
     // show spinner
     $("#spinner").css("display", "block");
     $("#messageApiOk").css("display", "none");

     // Cache l'édition de l'ancienne traduction
     $("#edit-div").removeClass("active");
     // Remet l'étoile en blanc
     $("#save-edit").css("display", "inline");
     $("#undo-save").css("display", "none");

     // Cache les balises des anciennes traductions pour les 4 api
     $("#api").removeClass("active");
     // Cache et supprime le texte des anciennes traductions
     for (let index = 1; index <= 4; index++) {
       $("#api-col-" + index).css("display", "none");
       $("#api-text-" + index).text("");
     }

     // ------------ récupération des traductions ------------
     // i est le nombre d'API qui ont fonctionné.
     getTranslatePlus(textarea.val(), lang, 1);

     // Affiche la classe des traductions des APIs
     api_div.addClass("active");


     // Pour éviter de rappeler les API quand le texte est identique
     old_text = text;
     old_lang = lang;
    }
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
  const apiKey_tp = "83168afac2c13b8117482eb869bf5872f144ae5c";

  // Fonction qui appelle l'API de translatePlus
  // et écrit dans la balise de résultat la traduction
  // obtenue si l'API a réussi. La fonction doit obligatoirement
  // renvoyer une valeur de i. Soit i + 1 si l'API a réussi,
  // soit i si elle n'a pas réussi.
  function getTranslatePlus(text, target_language, i) {
    /*var lang = translatePlusLang[target_language];
  var data = {
   text: text,
   source: "auto", // Détection automatique de la langue par translatePlus
   target: lang
  };
  fetch(apiUrl_tp, {
   method: "POST",
   headers: {
    "Content-Type": "application/json",
    "X-API-KEY": apiKey_tp},
   body: JSON.stringify(data)})
   .then(response => {
    hideSpinner();
    if (!response.ok) {
      throw new Error('Network response was not ok. Response code: ' + response);
    }
    return response.json();
    })
    .then(protectedData => {
     var output_text = protectedData.translations.translation;
     // Ajout de la traduction dans la balise
     add_translation(output_text, "translatePlus", i);
     getGoogletrans(text, target_language, i + 1); // TODO copier-coller au même endroit dans les fonctions suivantes
    })
    .catch(error => {
     console.error('Error:', error);
     getGoogletrans(text, target_language, i);
   });
   */

    // Commenter le code précédent et utiliser ce code en cas de débugage d'une
    // autre API afin et décommenter les deux lignes suivantes afin
    // d'économiser des requêtes HTTP vers translatePlus
    add_translation("Debug mode", "translatePlus", i);
    hideSpinner();
    getGoogletrans(text, target_language, i + 1);
  }

  // ----------------------- googletrans  -----------------------
  function getGoogletrans(text, target_language, i) {
    var lang = translatePlusLang[target_language];
    var data = {
      text: text,
      source: "auto", // Détection automatique de la langue par googletrans
      target: lang,
    };

    // POST request to the backend
    fetch("/translate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        hideSpinner();
        if (!response.ok) {
          throw new Error(
            "Network response was not ok. Response code: " + response
          );
        }
        return response.json();
      })
      .then((data) => {
        var output_text = data.translation;
        // Ajout de la traduction dans la balise
        add_translation(output_text, "Google Translate", i);
        getDeepL(text, target_language, i + 1);
      })
      .catch((error) => {
        console.error("Error:", error);
        getDeepL(text, target_language, i);
      });
  }
  // ----------------- end googletrans -----------------

  // ----------------- DeepL API -----------------

  // the DeepL API does not support being used directly from within browser-based apps. The API Key is not supposed to be shared publicly as well and should always be kept secret. The best approach is to use a backend proxy for the API Calls.

  function getDeepL(text, target_language, i) {
    var lang = deeplLang[target_language];
    if (lang == null) {
     // Bengali pas présent sur deepl
     getLibreTranslate(text, target_language, i);
     hideSpinner();
     return;
    }
    var data = {
      text: text,
      //source: "auto", // Détection automatique de la langue par translatePlus
      target: lang,
    };

    fetch("/translate_deepl", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        hideSpinner();
        if (!response.ok) {
          throw new Error(
            "Network response was not ok. Response code: " + response.status
          );
        }
        return response.json();
      })
      .then((data) => {
        var output_text = data.translation;
        // Ajout de la traduction dans la balise
        add_translation(output_text, "DeepL", i);
	getLibreTranslate(text, target_language, i+1);
      })
      .catch((error) => {
        console.error("Error:", error);
        // Retenter la traduction en cas d'erreur
	getLibreTranslate(text, target_language, i);
      });
  }
  // ----------------- end DeepL API -----------------


// ----------------------- libreTranslate	-----------------------
function getLibreTranslate(text, target_language, i) {
	var lang = libreTranslateLang[target_language];
	/*
	var data = {
	 text: text,
	 target: lang
	};
	*/

	var data = {
	 q: text,
	 source: "auto",
	 target: lang,
	 format: "text",
	 api_key: ""
	};
	
	//POST request to the backend
	//addr = "/libre_translate"
	addr = "http://127.0.0.1:5000/translate"
	fetch(addr, {
		method: "POST",
		headers: {
			"Content-Type":"application/json"
		},
		body: JSON.stringify(data)
	})
	.then(response => {
		hideSpinner();
		if (!response.ok) {
			throw new Error('Network response was not ok. Response code: ' + response.status);
		}
		return response.json();
		})
		.then(data => {
			var output_text = data.translatedText;
			// Ajout de la traduction dans la balise
			add_translation(output_text, "LibreTranslate", i);
			hideSpinner();
		})
		.catch (error=> {
				console.error('Error:', error);
		});
	} // fin fonction getLibretranslate()
// ----------------- end libreTranslate -----------------

  var n_finis = 0;
  function hideSpinner() {
    n_finis += 1;
    if (n_finis == 4) {
      // TODO augmenter la valeur maximale après avoir ajouté une fonction d'API
      // Appelé une fois que les traductions ont terminé de charger.
      $("#spinner").css("display", "none");
      $("#messageApiOk").css("display", "block");
      n_finis = 0; // réinitialise
    }
  }
});
