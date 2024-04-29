$(document).ready(function () {
  // Gestionnaire d'événement pour le clic sur l'icône d'enregistrement
  $("#save-edit").click(function () {
    // Récupérer le texte à enregistrer
    var cible = $("#edit-textarea").val();

    /******** Partie Solr ********************/
    var source = $("#input-text").val();
    var lang = $("input[name = targetLanguage]:checked").attr("id");
    var data = {
	"texte": cible,
	"source": source,
	"langue": lang
    };

    fetch("/save_traduction", {
	method: "POST",
	headers: {
		"Content-Type": "application/json",
	},
	body: JSON.stringify(data),
    })
	.then((response) => {
		alert("saved");
    		$(this).css("fill", "yellow");
	});
   });

    /******** Partie Cookies *****************/
    // Enregistrer le texte dans un cookie

    /*
    document.cookie =
      //"nomCookie" + Math.getRandomInt(100) + "=cookie;"
      "texte_enregistre=" +
      texte +
      "; expires=Thu, 31 Dec 9999 12:00:00 UTC; SameSite=Lax; path=/";

    // Pour que l'étoile devienne jaune après avoir été cliquée
    $(this).css("fill", "yellow");

    // Mettre à jour l'historique des traductions
    updateTranslationHistory();
  });

  // Fonction pour mettre à jour l'historique des traductions
  function updateTranslationHistory() {
    // Récupérer toutes les traductions enregistrées depuis les cookies
    var translations = getAllTranslationsFromCookies();

    // Afficher chaque traduction dans l'historique
    translations.forEach(function (translation) {
      $("#translation-history").append("<div>" + translation + "</div>");
    });
  }

  // Fonction pour récupérer toutes les traductions enregistrées depuis les cookies
  function getAllTranslationsFromCookies() {
    var translations = [];
    var cookies = document.cookie.split("; ");
    cookies.forEach(function (cookie) {
      var parts = cookie.split("=");
      if (parts[0] === "texte_enregistre") {
        translations.push(parts[1]);
      }
    });
    return translations;
  }

  // Appeler la fonction de mise à jour de l'historique des traductions au chargement de la page
  updateTranslationHistory();*/
});
