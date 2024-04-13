$(document).ready(function() {
    // alert("Editting document"); // supprimer
    $("#edit-output-1").click(function() {
        $("#edit-text-1").toggle();
        var editText = $("#api-text-1").text();
        $("#edit-textarea-1").val(editText);
        $("#edit-textarea-1").css("display", "block"); //  .insertAfter("#copy-output-2")

    });

    $("#edit-output-2").click(function() {
        $("#edit-text-2").toggle();
       
        var editText = $("#api-text-2").text();
        $("#edit-textarea-2").val(editText);
        $("#edit-textarea-2").css("display", "block"); //  .insertAfter("#copy-output-2")
    
    });





    // star-2
    $("#save-edit-2").click(function() {

        alert("Saving the changes..."); // supprimer
    });


});