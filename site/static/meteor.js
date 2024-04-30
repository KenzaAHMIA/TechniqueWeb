$(document).ready(function() {

	$("#edit-output-1").click(function() {
		meteor();
    });

    $("#edit-output-2").click(function() {
		meteor();
    });

    $("#edit-output-3").click(function() {
    	meteor();
    });

    $("#edit-output-4").click(function() {
    	meteor();
    });
    
    $("#edit-textarea").on('change', function() { //en listener sur l'évènement change
      alert("ca marche");
      meteor();
    });

    function meteor() {
    //récupère la val dans une var
	var apis = [$("#api-text-1").text(), $("#api-text-2").text(), $("#api-text-3").text(), $("#api-text-4").text()];
     apis.forEach(getMeteorScores);
    }
    // itérer sur les 4 id pour
    //définition de la fonction getMeteorScores
    function getMeteorScores(translation) {
    var data = {
      trad1: translation, // qui contient la var apis
      trad2: $("#edit-textarea").val(),
      lang: $("input[type=radio][name=targetLanguage]:checked").attr("id")
    };
    
    fetch("/scores_meteor", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data), // ce qu'on envoie au serveur : un fichier json 
      													// que l'on récupère avec request dans main.py
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            "Network response was not ok. Response code: " + response.status
          );
        }
        return response.json();
      })
      .then((data) => {
    	alert(data.score_meteor);
      })
      .catch((error) => {
        console.error("Error:", error);
        // Retenter la traduction en cas d'erreur
      });
    }
});