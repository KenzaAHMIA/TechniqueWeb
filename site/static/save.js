$(document).ready(function () {
  // Gestionnaire d'événement pour le clic sur l'icône d'enregistrement
  $("#save-edit").click(function () {
    // Récupérer le texte à enregistrer
    var texte = $("#edit-textarea").val();
    // Enregistrer le texte dans un cookie
    document.cookie =
      "texte_enregistre=" +
      texte +
      "; expires=Thu, 31 Dec 9999 12:00:00 UTC; path=/";

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
  updateTranslationHistory();
});
