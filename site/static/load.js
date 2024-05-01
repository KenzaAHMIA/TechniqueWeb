$(document).ready(function () {
 // TODO afficher un spinner

 let i = 0;
 let history_div = $("#translation-history");
 function load_history() {
  // Efface le contenu
  $("#translation-history").text("");
  fetch("/load_translations", {
   method: "GET",
   headers: {
    "Content-Type": "application/json",
   }
 }).then((response) => {
  // TODO Arrêter le spinner
  if (!response.ok) {
   throw new Error(
    "Network response was not ok. Response code: " + response
   );
   }
   return response.json();
  }).then((data) => {
   data.forEach((element) => ajoute_element(element));
  });
 }
 //$(document).click(function() {
   load_history();
 //});

 function ajoute_element(element) {
    i = i + 1;
    var target_lang = element['target_lang'];
    var source_text = element['source_text'];
    var target_text = element['target_text'];
    var div = $("<div>").addClass("col-12")
	.addClass("col-md-5")
	.addClass("mx-4")
	.addClass("mb-4")
	.addClass("shadow-lg");
    var titleBar = $("<div>")
	.addClass("superposable");
    var star = $("<div>")
	.addClass("objet-superpose");
    var title = $("<h6>").addClass("text-center")
	.addClass("mt-2")
	.text(target_lang);
    var horizontal = $("<div>").addClass("row");
    var pSource = $("<p>").addClass("col-6")
	.addClass("text-center")
	.text(source_text);
    var pCible = $("<p>").addClass("col-6")
	.addClass("text-center")
	.css("border-left", "1px solid grey")
	.text(target_text);
var saveEditButton = $('<svg xmlns="http://www.w3.org/2000/svg" id="save-edit-' + i + '" width="16" height="16" fill="currentColor" class="bi bi-star" viewBox="0 0 16 16" style="display: none;"><path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.56.56 0 0 0-.163-.505L1.71 6.745l4.052-.576a.53.53 0 0 0 .393-.288L8 2.223l1.847 3.658a.53.53 0 0 0 .393.288l4.052.575-2.906 2.77a.56.56 0 0 0-.163.506l.694 3.957-3.686-1.894a.5.5 0 0 0-.461 0z"/></svg>');
var undoSaveButton = $('<svg xmlns="http://www.w3.org/2000/svg" id="undo-save-' + i + '" width="16" height="16" fill="none" stroke="black" stroke-width="1" class="bi bi-star-fill" viewBox="0 0 16 16"><path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" fill="yellow"/></svg>');

    star.append(saveEditButton);
    star.append(undoSaveButton);
    div.append(title);
    titleBar.append(star);
    div.append(titleBar);
    div.append(horizontal);
    horizontal.append(pSource);
    horizontal.append(pCible);
    history_div.append(div);
    saveEditButton.click(function() {save(pSource.text(), pCible.text(), title.text(), saveEditButton, undoSaveButton)});
    undoSaveButton.click(function() {unsave(pSource.text(), pCible.text(), title.text(), saveEditButton, undoSaveButton)});
 }

function save(source, cible, lang, saveEditButton, undoSaveButton) {
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
        undoSaveButton.toggle();
        //hide #save-edit
        saveEditButton.hide();
    });
}

function unsave(source, cible, lang, saveEditButton, undoSaveButton) {
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
     undoSaveButton.toggle();
     saveEditButton.show();
    });
  }
});
