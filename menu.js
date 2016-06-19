	//Klikki‰‰ni
	var Klick = new Audio("music/click.wav");

$(document).ready(function(){
	//Nappulat jotka avaavat toiminnot
	$('#playBTN').click(NewGame);
	$('#infoBTN').toggle (
	function () {
	$("#infopic").attr("src","graphics/info.jpg");
	Klick.play();
	},
	function () {
	$("#infopic").attr("src","graphics/dot.png");
	Klick.play();
	} );
	
	
	$('#creditsBTN').toggle (
	function () {
	$("#creditspic").attr("src","graphics/credits.jpg");
	Klick.play();
	},
	function () {
	$("#creditspic").attr("src","graphics/dot.png");
	Klick.play();
	} );

		
	//Taustamusiikki
	
	var Music = new Audio("music/mainmenu.wav");
	Music.play();
	
});

function NewGame(){
Klick.play();
window.location = "fistmaster.html";

}
