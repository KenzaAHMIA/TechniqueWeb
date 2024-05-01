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
      meteor();
    });

    function meteor() {
	var apis = [$("#api-text-1").text(), $("#api-text-2").text(), $("#api-text-3").text(), $("#api-text-4").text()];
        //apis.forEach(getMeteorScores);
	getMeteorScores(apis);
    }

    function getMeteorScores(translation) {
     var data = {
       trad1: translation,
       trad2: $("#edit-textarea").val(),
       lang: $("input[type=radio][name=targetLanguage]:checked").attr("id")
     };
    
     fetch("/scores_meteor", {
       method: "POST",
       headers: {
         "Content-Type": "application/json",
       },
       body: JSON.stringify(data),
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
    	var score_meteor_5 = data.score_meteor;
	var scores_meteor = data.single_scores_meteor;
	$("#meteor-5").css("visibility","visible");
	$("#score-meteor-5").text(score_meteor_5);
	for (var i = 1; i <= scores_meteor.length; i++) {
	 $("#meteor-" + i).css("visibility","visible");
         $("#score-meteor-" + i).text(scores_meteor[i-1]);
	}
	
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    }
});
