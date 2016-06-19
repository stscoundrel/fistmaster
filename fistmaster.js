/*
FISTMASTER 1.0
CODE: SAMPO SILVENNOINEN
27.11.2012 - 7.12.2012

TOMMI WIIK:
HTML, CSS, GRAPHICS & MUSIC

---------------------------------

DAMAGE, CRITICALS & MISS CHANCES;

HP 200

Punch
25% miss chance
10 - 20 dmg

Hook
33% miss chance
20 - 35 dmg

Kick
45% miss chance
30 - 50 dmg

Heal
Regain 20-50hp

-----------------------------------
*/

//Perusvakiot
var PlayerHP = 100;
var EnemyHP = 100;
var PunchDMG = 10;
var HookDMG = 20;
var KickDMG = 30;

//Kuvat

var PlayerIdlePic = 'graphics/playeridle.png';
var PlayerDamagePic = 'graphics/playerdamage.jpg';
var PlayerFlinchPic = 'graphics/playerflinch.png';
var PlayerKickPic = 'graphics/playerkick.png';
var PlayerPunchPic = 'graphics/playerpunch.png';
var PlayerHookPic = 'graphics/playerhook.png';
var PlayerHealPic = 'graphics/playerheal.png';
var EnemyIdlePic = 'graphics/enemyidle.png';
var EnemyDamagePic = 'graphics/enemydamage.png';
var EnemyFlinchPic = 'graphics/enemyflinch.png';
var EnemyPunchPic = 'graphics/enemypunch.png';
var EnemyHookPic = 'graphics/enemyhook.png';
var EnemyKickPic = 'graphics/enemykick.png';
var EnemyHealPic = 'graphics/enemyheal.png';

//Nappulakuvat

var PunchButtonDown = 'graphics/punchbuttondown.jpg';
var HookButtonDown = 'graphics/hookbuttondown.jpg';
var KickButtonDown = 'graphics/kickbuttondown.jpg';
var HealButtonDown = 'graphics/healbuttondown.jpg';

var PunchButton = 'graphics/punchbutton.jpg';
var HookButton = 'graphics/hookbutton.jpg';
var KickButton = 'graphics/kickbutton.jpg';
var HealButton = 'graphics/healbutton.jpg';

//Statistiikkalaskurit

var EHitsTaken = 0;
var EHitsDodged = 0;
var PHitsTaken = 0;
var PHitsDodged = 0;

//Ääniefektit

var Hit = new Audio("music/hit0.wav");
var Potion = new Audio("music/potion.wav");
var Miss = new Audio("music/miss.wav");


var EnemyBar = EnemyHP*2;
var PlayerBar = PlayerHP*2;
var EnemyDrinks = 0;
var Music = new Audio("music/battle.wav");

$(document).ready(function(){
	//Nappulat jotka avaavat toiminnot
	$('#punchbutton').click(PlayerPunch);
	$('#kickbutton').click(PlayerKick);
	$('#hookbutton').click(PlayerHook);
	$('#healbutton').click(PlayerHeal);
	
	//Vuoro käyntiin
	document.getElementById("infobox").innerHTML = "<p>Your turn</p>";
	
	//Pelaajien health numerona & Health barit	
	$('#EnemyHPNumber').text(EnemyHP);
	$('#PlayerHPNumber').text(PlayerHP);
	
	//Statistiikan sijoitus
	$('#phits').text("PLAYER: Hits taken "+PHitsTaken);
	$('#pdodges').text("Hits dodged "+PHitsDodged);
	
	$('#ehits').text("ENEMY: Hits taken: "+EHitsTaken);
	$('#edodges').text("Hits dodged: "+EHitsDodged);
	

	
	
	$("#enemyhp").animate({ width: EnemyBar});
	$("#playerhp").animate({ width: PlayerBar});
	
		
	//Taustamusiikki
	Music.addEventListener('ended', function() {
    this.currentTime = 0;
    this.play();
	}, false);
	Music.play();
	
	//Shake funktio ruudun värisyttämiseen iskussa

jQuery.fn.shake = function() {
    this.each(function(i) {
        $(this).css({ "position": "relative" });
        for (var x = 1; x <= 3; x++) {
            $(this).animate({ left: -15 }, 10).animate({ left: 0 }, 50).animate({ left: 15 }, 10).animate({ left: 0 }, 50);
        }
    });
    return this;
} 
	
});


//PELAAJAN VUORO


	function PlayerTurn(){
	
		//Onko pelaaja elossa
		
		if(PlayerHP <= 0){
		window.location = "losery.html";
		}else{
			//Onko vihollinen elossa
			if(EnemyHP <= 0){
			window.location = "victory.html";
			}else{
			
			
			//Arvotaan osumaääni vaihtelun vuoksi
			
			var HitRand = Math.floor(Math.random()*3);			
			Hit = new Audio("music/hit"+HitRand+".wav");
		
	
		//Onko vahingoittunut tarpeeksi damagekuvaan
		/*
		if(PlayerHP <= 40){
		PlayerIdlePic = PlayerDamagePic;
		}else{
		PlayerIdlePic = PlayerIdlePic;
		}
		//Onko vihollinen vahingoittunut tarpeeksi damagekuvaan
		if(EnemyHP <= 40){
		EnemyIdlePic = EnemyDamagePic;
		}else{
		EnemyIdlePic = EnemyIdlePic;
		}
		*/
		
	
		document.getElementById("infobox").innerHTML = "<p>Your turn</p>";
		//Aktivoidaan nabbulat
		$("#punchbutton").attr("src",PunchButton);
		$("#hookbutton").attr("src",HookButton);
		$("#healbutton").attr("src",HealButton);
		$("#kickbutton").attr("src",KickButton);
				
		//Nollataan animaatiot
		$("#player").attr("src",PlayerIdlePic);
		$("#enemy").attr("src",EnemyIdlePic);
		
		}
		
		}
		
		}
		
		
		
	//ISKUNAPPIEN FUNKTIOT
	
		//Heal suoritus
		
		function PlayerHeal(){
		//Ääniefekti
		Potion.play();
		//Vain yksi käyttökerta, poistetaan nappi
		element = document.getElementById("healbutton");
		element.parentNode.removeChild(element);
		//Kuvan vaihto
		$("#player").attr("src",PlayerHealPic);
		//Arvotaan healin kokonaissumma
		$('<p>You drank healing potion</p>').insertAfter('p:last');
		var HealBonus = Math.floor(Math.random()*31);
		var Heal = 20 + HealBonus;
		//Vanha HP talteen laskua varten
		var OldHP = PlayerHP;
		var NewHP = PlayerHP + Heal;
		//Health ei saa ylittää 100hp, joten
		if(NewHP >= 100){
			PlayerHP = 100;
		}else{
			PlayerHP = PlayerHP + Heal;
		}
		//Nykyisen health määrän ja vanhan HP:n erotus, eli saatu määrä
		var RealGain = PlayerHP - OldHP;
		//Healthbar & Number päivitys
		var PlayerBar = PlayerHP*2;
		$("#playerhp").animate({ width: PlayerBar});
		$('<p>You regained '+RealGain+' HP! </p>').insertAfter('p:last');
		$('#PlayerHPNumber').text(PlayerHP);
		setTimeout(EnemyTurn, 3000);
			
		}
	
	
		//Punch suoritus

		function PlayerPunch(){
				//Kuvan vaihto
				$("#punchbutton").attr("src",PunchButtonDown);
				$("#player").attr("src",PlayerPunchPic);
				//Osumistodennäköisyys
				var ChanceToHit = Math.floor(Math.random()*100);
				if(ChanceToHit <= 25){
					//LAITA TÄHÄN VÄISTÖKUVA JOSKUS
					//Ääniefekti
					Miss.play();
					$('#enemy').shake();
					var Missed = Math.floor(Math.random()*2);
					if(Missed == 0){
					EHitsDodged++;
					$('#edodges').text("Hits dodged: "+EHitsDodged);
					$('<p>Missed!</p>').insertAfter('p:last');
					}else{
					EHitsDodged++;
					$('#edodges').text("Hits dodged: "+EHitsDodged);
					$('<p>He blocked!</p>').insertAfter('p:last');
					}
					//Ohi, vihulaisen vuoro
					setTimeout(EnemyTurn, 3000);
				}else{
				//Osumiskuva
				$("#enemy").attr("src",EnemyFlinchPic);
				//Ääniefekti
				Hit.play();
				//Ruudun värinä
				$('#base').shake();
				EHitsTaken++;
				$('#ehits').text("ENEMY: Hits taken: "+EHitsTaken);
				$('<p>You hit him!</p>').insertAfter('p:last');
				setTimeout(PlayerPunchHit, 2000);
				}
		}
	
		function PlayerPunchHit(){
			//Nollataan animaatiot
			$("#player").attr("src",PlayerIdlePic);
			$("#enemy").attr("src",EnemyIdlePic);
			//Arvotaan kriittistodennäköisyys
			var Critical = 1;
			var CriticalChance = Math.floor(Math.random()*10);
			if(CriticalChance == 5){
			Critical = 1.5;
			$('<p>Critical hit! 1,5x damage! </p>').insertAfter('p:last');
			}else{
			Critical = 1;
			}
			//Lasketaan damage
			var PunchDMGModifier = Math.floor(Math.random()*11);
			var PunchTotalDamage = (PunchDMG + PunchDMGModifier) * Critical;
			EnemyHP = Math.round(EnemyHP - PunchTotalDamage);
			//Health barin päivitys
			var EnemyBar = EnemyHP*2;
			$("#enemyhp").animate({ width: EnemyBar});
			//Ilmoitukset
			$('<p>Dealt '+PunchTotalDamage+' damage! </p>').insertAfter('p:last');
			$('#EnemyHPNumber').text(EnemyHP);
			//Vihun vuoro
			setTimeout(EnemyTurn, 3000);
		}

		//Hook suoritus
		
		function PlayerHook(){
				//Kuvan vaihto
				$("#hookbutton").attr("src",HookButtonDown);
				$("#player").attr("src",PlayerHookPic);
				//Osumistodennäköisyys
				var ChanceToHit = Math.floor(Math.random()*100);
				if(ChanceToHit <= 33){
					//LAITA TÄHÄN VÄISTÖKUVA JOSKUS
					//Ääniefekti
					Miss.play();
					$('#enemy').shake();
					var Missed = Math.floor(Math.random()*2);
					if(Missed == 0){
					EHitsDodged++;
					$('#edodges').text("Hits dodged: "+EHitsDodged);
					$('<p>Missed!</p>').insertAfter('p:last');
					}else{
					EHitsDodged++;
					$('#edodges').text("Hits dodged: "+EHitsDodged);
					$('<p>He blocked!</p>').insertAfter('p:last');
					}
					//Ohi, vihulaisen vuoro
					setTimeout(EnemyTurn, 3000);
				}else{
				//Osumiskuva
				$("#enemy").attr("src",EnemyFlinchPic);
				//Ääniefekti
					Hit.play();
				//Ruudun värinä
				$('#base').shake();
				EHitsTaken++;
				$('#ehits').text("ENEMY: Hits taken: "+EHitsTaken);
				$('<p>You hit him!</p>').insertAfter('p:last');
				setTimeout(PlayerHookHit, 2000);
				}
		}
	
		function PlayerHookHit(){
			//Nollataan animaatiot
			$("#player").attr("src",PlayerIdlePic);
			$("#enemy").attr("src",EnemyIdlePic);
			//Arvotaan kriittistodennäköisyys
			var Critical = 1;
			var CriticalChance = Math.floor(Math.random()*10);
			if(CriticalChance == 5){
			Critical = 1.5;
			$('<p>Critical hit! 1,5x damage! </p>').insertAfter('p:last');
			}else{
			Critical = 1;
			}
			//Lasketaan damage
			var HookDMGModifier = Math.floor(Math.random()*16);
			var HookTotalDamage = (HookDMG + HookDMGModifier) * Critical;
			EnemyHP = Math.round(EnemyHP - HookTotalDamage);
			//Health barin päivitys
			var EnemyBar = EnemyHP*2;
			$("#enemyhp").animate({ width: EnemyBar});
			//Ilmoitukset
			$('<p>Dealt '+HookTotalDamage+' damage! </p>').insertAfter('p:last');
			$('#EnemyHPNumber').text(EnemyHP);
			//Vihun vuoro
			setTimeout(EnemyTurn, 3000);
		}		
		
		//Kick suoritus
		
		function PlayerKick(){
				//Kuvan vaihto
				$("#kickbutton").attr("src",KickButtonDown);
				$("#player").attr("src",PlayerKickPic);
				//Osumistodennäköisyys
				var ChanceToHit = Math.floor(Math.random()*100);
				if(ChanceToHit <= 45){
					//LAITA TÄHÄN VÄISTÖKUVA JOSKUS
					//Ääniefekti
					Miss.play();
					$('#enemy').shake();
					var Missed = Math.floor(Math.random()*3);
					if(Missed == 0){
					EHitsDodged++;
					$('#edodges').text("Hits dodged: "+EHitsDodged);
					$('<p>He blocked!</p>').insertAfter('p:last');
					}else{
					EHitsDodged++;
					$('#edodges').text("Hits dodged: "+EHitsDodged);
					$('<p>Missed!</p>').insertAfter('p:last');
					}
					//Ohi, vihulaisen vuoro
					setTimeout(EnemyTurn, 3000);
				}else{
				//Osumiskuva
				$("#enemy").attr("src",EnemyFlinchPic);
				//Ääniefekti
				Hit.play();
				//Ruudun värinä
				$('#base').shake();
				EHitsTaken++;
				$('#ehits').text("ENEMY: Hits taken: "+EHitsTaken);
				$('<p>You kicked him!</p>').insertAfter('p:last');
				setTimeout(PlayerKickHit, 2000);
				}
		}
	
		function PlayerKickHit(){
			//Nollataan animaatiot
			$("#player").attr("src",PlayerIdlePic);
			$("#enemy").attr("src",EnemyIdlePic);
			//Arvotaan kriittistodennäköisyys
			var Critical = 1;
			var CriticalChance = Math.floor(Math.random()*10);
			if(CriticalChance == 5){
			Critical = 1.5;
			$('<p>Critical hit! 1,5x damage! </p>').insertAfter('p:last');
			}else{
			Critical = 1;
			}
			//Lasketaan damage
			var KickDMGModifier = Math.floor(Math.random()*21);
			var KickTotalDamage = (KickDMG + KickDMGModifier) * Critical;
			EnemyHP = Math.round(EnemyHP - KickTotalDamage);
			//Health barin päivitys
			var EnemyBar = EnemyHP*2;
			$("#enemyhp").animate({ width: EnemyBar});
			//Ilmoitukset
			$('<p>Dealt '+KickTotalDamage+' damage! </p>').insertAfter('p:last');
			$('#EnemyHPNumber').text(EnemyHP);
			//Vihun vuoro
			setTimeout(EnemyTurn, 3000);
		}	

		
//VIHOLLISEN VUORO
		//Valtaosa iskujen kommenteista/ohjeista löytyy Playerin vastaavista, koska lähes identtiset.
		//Poikkeavia kommentoitu
	
					
						
			//Iskun valinta

			function EnemyTurn(){
			
			//Onko pelaaja elossa
		
			if(PlayerHP <= 0){
			window.location = "losery.html";
			}else{
				//Onko vihollinen elossa
				if(EnemyHP <= 0){
				window.location = "victory.html";
				}else{
			
			//Osumaäänen arvonta vaihtelun vuoksi
			
			var HitRand = Math.floor(Math.random()*3);			
			var Hit = new Audio("music/hit"+HitRand+".wav");
			
			//Onko vahingoittunut tarpeeksi damagekuvaan
			/*
			if(PlayerHP <= 40){
			PlayerIdlePic = PlayerDamagePic;
			}else{
			PlayerIdlePic = PlayerIdlePic;
			}
			//Onko vihollinen vahingoittunut tarpeeksi damagekuvaan
			if(EnemyHP <= 40){
			EnemyIdlePic = EnemyDamagePic;
			}else{
			EnemyIdlePic = EnemyIdlePic;
			}
			*/
			
			//Nappulat pohjaan
			
			$("#punchbutton").attr("src",PunchButtonDown);
			$("#hookbutton").attr("src",HookButtonDown);
			$("#healbutton").attr("src",HealButtonDown);
			$("#kickbutton").attr("src",KickButtonDown);
					
			//Nollataan animaatiot
			$("#player").attr("src",PlayerIdlePic);
			$("#enemy").attr("src",EnemyIdlePic);
			document.getElementById("infobox").innerHTML = "<p>Enemy turn...</p>";
							
			
			//Pitääkö juoda energiajuoma
			if((EnemyHP <= 30) && (EnemyDrinks == 0)){
				setTimeout(EnemyHeal, 2000);
			}else{
				//Jos pelaaja heikossa hapessa, käytetään iskua joka tiputtaa kerralla
					if(PlayerHP <=14){
					setTimeout(EnemyPunch, 2000);
					}else{
						//Hook variaatio edellisestä 
						if(PlayerHP <=25){
						setTimeout(EnemyHook, 2000);
						}else{
							//Jos pahasti tappiolla, vain kovia iskuja
							if((PlayerHP >= EnemyHP) && (EnemyHP <=30)){
							setTimeout(EnemyKick, 2000);
							}else{
					
					
				//Satunnainen isku vaihtoehdoista
			
				var ChooseStrike = Math.floor(Math.random()*3);
					switch(ChooseStrike){
					case 0:
					setTimeout(EnemyPunch, 2000);
					break;
					case 1:
					setTimeout(EnemyKick, 2000);
					break;
					case 2:
					setTimeout(EnemyHook, 2000);
					break;
					default:
					document.getElementById("infobox").innerHTML = "<p>Error: Vituix meni vihulaisen tekoäly</p>"
					break;
					}
				}
				}
				}
			}
			}
			}
			}
			
			//Vihollisen healin suoritus
			
			function EnemyHeal(){
			EnemyDrinks++;
			//Kuvan vaihto
			$("#enemy").attr("src",EnemyHealPic);
			//Ääniefekti
			Potion.play();
			//Arvotaan healin kokonaissumma
			$('<p>He drank healing potion</p>').insertAfter('p:last');
			var HealBonus = Math.floor(Math.random()*31);
			var Heal = 20 + HealBonus;
			//Vanha HP talteen laskua varten
			var OldHP = EnemyHP;
			var NewHP = EnemyHP + Heal;
			//Health ei saa ylittää 100hp, joten
			if(NewHP >= 100){
				EnemyHP = 100;
			}else{
				EnemyHP = EnemyHP + Heal;
			}
			//Nykyisen health määrän ja vanhan HP:n erotus, eli saatu määrä
			var RealGain = EnemyHP - OldHP;
			//Healthbar & Number päivitys
			var EnemyBar = EnemyHP*2;
			$("#enemyhp").animate({ width: EnemyBar});
			$('<p>He regained '+RealGain+' HP! That bastard! </p>').insertAfter('p:last');
			$('#EnemyHPNumber').text(EnemyHP);
			setTimeout(PlayerTurn, 3000);
				
			}

			
			//Vihollisen punchin suoritus
			
			function EnemyPunch(){
				//Kuvan vaihto
				$("#enemy").attr("src",EnemyPunchPic);
				//Todennäköisyys osua
				var ChanceToHit = Math.floor(Math.random()*100);
					if(ChanceToHit <= 25){
						//LAITA TÄHÄN VÄISTÖKUVA!
						//Ääniefekti
						Miss.play();
						$('#player').shake();
						var Missed = Math.floor(Math.random()*2);
						if(Missed == 0){
						PHitsDodged++;
						$('#pdodges').text("Hits dodged "+PHitsDodged);
						$('<p>You dodged!</p>').insertAfter('p:last');
						}else{
						PHitsDodged++;
						$('#pdodges').text("Hits dodged "+PHitsDodged);
						$('<p>You blocked!!</p>').insertAfter('p:last');
						}
						setTimeout(PlayerTurn, 3000);
						}else{
						$("#player").attr("src",PlayerFlinchPic);
						//Ruudun värinä
						$('#base').shake();
						//Ääniefekti
						Hit.play();
						PHitsTaken++;
						$('#phits').text("PLAYER: Hits taken "+PHitsTaken);
						$('<p>He hit you!</p>').insertAfter("p:last");
						setTimeout(EnemyPunchHit, 2000);
						}
			}

			function EnemyPunchHit(){
				$("#enemy").attr("src",EnemyIdlePic);
				$("#player").attr("src",PlayerIdlePic);
				var Critical = 1;
				var CriticalChance = Math.floor(Math.random()*10);
				if(CriticalChance == 5){
				Critical = 1.5;
				$('<p>Critical hit! 1,5x damage! </p>').insertAfter('p:last');
				}else{
				Critical = 1;
				}
				var PunchDMGModifier = Math.floor(Math.random()*11);
				var PunchTotalDamage = (PunchDMG + PunchDMGModifier) * Critical;
				PlayerHP = Math.round(PlayerHP - PunchTotalDamage);
				var PlayerBar = PlayerHP*2;
				$("#playerhp").animate({ width: PlayerBar});
				$('<p>You suffered '+PunchTotalDamage+' damage! </p>').insertAfter('p:last');
				$('#PlayerHPNumber').text(PlayerHP);
				setTimeout(PlayerTurn, 3000);
				}
			
			//Vihollisen Hook suoritus
			
			function EnemyHook(){
					//Kuvan vaihto
					$("#enemy").attr("src",EnemyHookPic);
					//Osumistodennäköisyys
					var ChanceToHit = Math.floor(Math.random()*100);
					if(ChanceToHit <= 33){
						//LAITA TÄHÄN VÄISTÖKUVA JOSKUS
						//Ääniefekti
						Miss.play();
						$('#player').shake();
						var Missed = Math.floor(Math.random()*2);
						if(Missed == 0){
						PHitsDodged++;
						$('#pdodges').text("Hits dodged "+PHitsDodged);
						$('<p>His hook missed!</p>').insertAfter('p:last');
						}else{
						PHitsDodged++;
						$('#pdodges').text("Hits dodged "+PHitsDodged);
						$('<p>You blocked his hook!</p>').insertAfter('p:last');
						}
						//Ohi, vihulaisen vuoro
						setTimeout(PlayerTurn, 3000);
					}else{
					//Osumiskuva
					$("#player").attr("src",PlayerFlinchPic);
					//Ääniefekti
					Hit.play();
					//Ruudun värinä
					$('#base').shake();
					PHitsTaken++;
					$('#phits').text("PLAYER: Hits taken "+PHitsTaken);
					$('<p>He hit you with a hook!</p>').insertAfter('p:last');
					setTimeout(EnemyHookHit, 2000);
					}
			}
		
			function EnemyHookHit(){
				//Nollataan animaatiot
				$("#enemy").attr("src",EnemyIdlePic);
				$("#player").attr("src",PlayerIdlePic);
				//Arvotaan kriittistodennäköisyys
				var Critical = 1;
				var CriticalChance = Math.floor(Math.random()*10);
				if(CriticalChance == 5){
				Critical = 1.5;
				$('<p>Critical hit! 1,5x damage! </p>').insertAfter('p:last');
				}else{
				Critical = 1;
				}
				//Lasketaan damage
				var HookDMGModifier = Math.floor(Math.random()*16);
				var HookTotalDamage = (HookDMG + HookDMGModifier) * Critical;
				PlayerHP = Math.round(PlayerHP - HookTotalDamage);
				//Health barin päivitys
				var PlayerBar = PlayerHP*2;
				$("#playerhp").animate({ width: PlayerBar});
				//Ilmoitukset
				$('<p>You suffered '+HookTotalDamage+' damage! </p>').insertAfter('p:last');
				$('#PlayerHPNumber').text(PlayerHP);
				//Vihun vuoro
				setTimeout(PlayerTurn, 3000);
			}
				
			//Vihollisen kickin suoritus
			
			function EnemyKick(){
				$("#enemy").attr("src",EnemyKickPic);
				//Todennäköisyys osua
				var ChanceToHit = Math.floor(Math.random()*100);
					if(ChanceToHit <= 45){
						//LAITA TÄHÄN VÄISTÖKUVA!
						//Ääniefekti
						Miss.play();
						$('#player').shake();
						var Missed = Math.floor(Math.random()*3);
						if(Missed == 0){
						PHitsDodged++;
						$('#pdodges').text("Hits dodged "+PHitsDodged);
						$('<p>You blocked his kick!</p>').insertAfter('p:last');
						}else{
						PHitsDodged++;
						$('#pdodges').text("Hits dodged "+PHitsDodged);
						$('<p>His kick missed!</p>').insertAfter('p:last');
						}
						setTimeout(PlayerTurn, 3000);
						}else{
						PHitsTaken++;
						$('#phits').text("PLAYER: Hits taken "+PHitsTaken);
						$("#player").attr("src",PlayerFlinchPic);
						//Ruudun värinä
						$('#base').shake();
						//Ääniefekti
						Hit.play();
						$('<p>He kicked you!</p>').insertAfter("p:last");
						setTimeout(EnemyKickHit, 2000);
						}
			}

			function EnemyKickHit(){
				$("#enemy").attr("src",EnemyIdlePic);
				$("#player").attr("src",PlayerIdlePic);
				var Critical = 1;
				var CriticalChance = Math.floor(Math.random()*10);
				if(CriticalChance == 5){
				Critical = 1.5;
				$('<p>Critical hit! 1,5x damage! </p>').insertAfter('p:last');
				}else{
				Critical = 1;
				}
				var KickDMGModifier = Math.floor(Math.random()*21);
				var KickTotalDamage = (KickDMG + KickDMGModifier) * Critical;
				PlayerHP = Math.round(PlayerHP - KickTotalDamage);
				var PlayerBar = PlayerHP*2;
				$("#playerhp").animate({ width: PlayerBar});
				$('<p>You suffered '+KickTotalDamage+' damage! </p>').insertAfter('p:last');
				$('#PlayerHPNumber').text(PlayerHP);
				setTimeout(PlayerTurn, 3000);
				}
			


