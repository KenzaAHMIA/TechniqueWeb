$(document).ready(function () {
  $("#copy-source-text").click(function () {
    text = $("#input-text").val();
    navigator.clipboard.writeText(text);
  });

  $("#copy-output-1").click(function () {
    text = $("#api-text-1").text();
    navigator.clipboard.writeText(text);
  });
  $("#copy-output-2").click(function () {
    text = $("#api-text-2").text();
    navigator.clipboard.writeText(text);
  });
  $("#copy-output-3").click(function () {
    text = $("#api-text-3").text();
    navigator.clipboard.writeText(text);
  });
  $("#copy-output-4").click(function () {
    text = $("#api-text-4").text();
    navigator.clipboard.writeText(text);
  });

  $("#copy-edit").click(function () {
    text = $("#edit-textarea").val();
    navigator.clipboard.writeText(text);
  });
});
