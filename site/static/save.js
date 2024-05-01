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
        // toggle between two stars save-edit and undo-save
        $("#undo-save").toggle();
        //hide #save-edit
        $("#save-edit").hide();
	});
   });

  // quand on clique sur undo-save -> étoile jaune 
   $("#undo-save").click(function () {
    var cible = $("#edit-textarea").val();
    var source = $("#input-text").val();
    var lang = $("input[name = targetLanguage]:checked").attr("id");

    var data = {
    "texte": cible,
    "source": source,
    "langue": lang
    };

    fetch("/remove_saved_translation", {
	  method: "DELETE",
	  headers: {
		"Content-Type": "application/json",
          },
          body: JSON.stringify(data),
   })
   .then((response) => {
          $("#undo-save").toggle();
          $("#save-edit").show();
   });
 });
});
