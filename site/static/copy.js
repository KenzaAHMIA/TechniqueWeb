$(document).ready(function() {

 $("#copy-source-text").click(function() {
  text = $("#input-text").val();
  navigator.clipboard.writeText(text);
 });

});
