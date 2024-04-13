$(document).ready(function() {
    $("#edit-output-1").click(function() {
	$("#edit-div").addClass('active');
        var editText = $("#api-text-1").text();
        $("#edit-textarea").val(editText);
    });

    $("#edit-output-2").click(function() {
	$("#edit-div").addClass('active');
        var editText = $("#api-text-2").text();
        $("#edit-textarea").val(editText);
    });

    $("#edit-output-3").click(function() {
	$("#edit-div").addClass('active');
        var editText = $("#api-text-3").text();
        $("#edit-textarea").val(editText);
    });

    $("#edit-output-4").click(function() {
	$("#edit-div").addClass('active');
        var editText = $("#api-text-4").text();
        $("#edit-textarea").val(editText);
    });
});
