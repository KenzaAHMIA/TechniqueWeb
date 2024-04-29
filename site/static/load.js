$(document).ready(function () {
 // TODO afficher un spinner

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
    console.log(element);
    var target_lang = element['target_lang'];
    var source_text = element['source_text'];
    var target_text = element['target_text'];
    var div = $("<div>").addClass("col-12")
	.addClass("col-md-5")
	.addClass("mx-4")
	.addClass("mb-4")
	.addClass("shadow-lg");
    var title = $("<h6>").addClass("text-center")
	.addClass("mt-2")
	.text(target_lang);
    var horizontal = $("<div>").addClass("row");
    var pSource = $("<p>").addClass("col-6")
	.addClass("text-center")
	.text(source_text);
    var pCible = $("<p>").addClass("col-6")
	.addClass("text-center")
	.css("border-left", "1px solid black")
	.text(target_text);
    div.append(title);
    div.append(horizontal);
    horizontal.append(pSource);
    horizontal.append(pCible);

    history_div.append(div);
 }
});
