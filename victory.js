$(document).ready(function(){

$('#newgame').click(NewGame);
var Music = new Audio("music/victory.wav");
Music.play();

});

function NewGame(){
	window.location = "fistmaster.html";
}