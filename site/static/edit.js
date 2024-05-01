$(document).ready(function() {
    $("#edit-output-1").click(function() {
	$("#edit-div").addClass('active');
        var editText = $("#api-text-1").text();
        $("#edit-textarea").val(editText);
        reset_save();
    });

    $("#edit-output-2").click(function() {
	$("#edit-div").addClass('active');
        var editText = $("#api-text-2").text();
        $("#edit-textarea").val(editText);
        reset_save();
    });

    $("#edit-output-3").click(function() {
	$("#edit-div").addClass('active');
        var editText = $("#api-text-3").text();
        $("#edit-textarea").val(editText);
        reset_save();
    });

    $("#edit-output-4").click(function() {
	$("#edit-div").addClass('active');
        var editText = $("#api-text-4").text();
        $("#edit-textarea").val(editText);
        reset_save();
    });
    function reset_save() {
        // Remet l'étoile en blanc
        $("#save-edit").css("display", "inline");
        $("#undo-save").css("display", "none");
    }
});
