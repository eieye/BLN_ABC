/* BLN ABC 0.9 (beta) A Primer for basic literacy development | Ein "Vorkurs" zur Alphabetisierung in Deutsch als Zweitsprache
 * Copyright (C) 2025 Jens Kreitmeyer <self@jenskreitmeyer.de>
 * This file is part of BLN ABC
 * (for the full length copyright notice see the HTML index file and "COPYING.txt")
 */

if (DEBUG_PIPE) {
	console.log('##MODULE## "HANDLERS BUTTONS" PART OF BLN ABC "STRESSTEST#04" (QUIZ) // 27-MAR-25');
}
// ##MEMO## (RE CANCEL ANIMATIONS)
		// ANIMATE_GLYPH/ANMATION_VORSCHRIFT (IN "WATCH") ###497### ANIMATE_DOT/ANIMATION_KARAOKEDOT (IN "QUIZ") ###737###');
// ##MEMO## (USABILITY) SET MARKER/HILITE ON CURRENTLY SELECTED BUTTON (140325)
		// (STATE UNCLEAR FOR USER AT LAUNCH AND AFTER STEPPER/POFO/QUIZ)
// ##MEMO## "CLEAR" DOES NOT INCLUDE ANIMATION // BUILD NEW COMMON FUNCTION "RESET/CANCEL ANIMATION" // @LINE ##648#

// 050325 // ADDED ALERT ON SAVE BTN // EDITED AND ADDED VARIOUS HELP TEXTS IN ALERTS)
// 100325 // MORE HELP TEXTS AND EXPLANATIONS 
// 110325 // USING TEMP CASE-TOGGLE FROM "FULL ALPHA" (020325)
// 130325 // FIXED AFFIXES TO AUDIO FILENAMES FOR SELECTLISTITEMS AND RECPLAY
// 150325 // CONNECT "QUIZ" TO SCRIPT "PLAYAUDIO SELECTOR" (SAME PARSING TO SPEAK/SPELL)
// 220325 // (REMOVED FILE "PARSE_AUDIOQUIZ")
// 230325	// MSG WITH DISMISS ("DONT SHOW AGAIN") // INIT @LINE ####117####



// WIRE BUTTONS           // LINE ##149##
// (TOP) NAVIGATION
		// BTN HOME						// LINE ##319##
					// HOME MSG 		// LINE ##336##
		// BTN WATCH					// LINE ##430##
		// BTN WRITE					// LINE ##510##
		// BTN MORE
		// BTN BACK
		// BTN QUIZ           // LINE ##596##
		// BTN STEPPER
					// STEPPER MSG  // LINE ##790##
		// BTN PORTFOLIO			// LINE ##853##
					// POFO MSG  		// LINE ##873##
// (BOTTOM) NAVIGATION
    // BTN SAVETRACE      // LINE ##835##
    // BTN UCLC           // LINE ##981##
					// TOGGLE CASE  // LINE ##1003##
// *CLEARDRAWING*         // LINE ##1117##
// MODULE OVERLAY
    // RECORDERPLAYER     // LINE ##1209##



																// SEARCH ##WATCH ITEM## FOR WORK IN PROGRESS



import { prepareAnimation } from './sample_animationLUT.js';
import { renderTemplate } from './render_template.js';
import { animateGlyph, renderAirlines } from './animation_vorschrift.js';

// SCHNITTSTELLE ANIMATION MODE
import { animateDot } from './animation_karaokedot.js'; // LINE ##53##
//import { animateComet } from './animation_cometobj_trail.js'; 																	// (TEMP DISCONNECTED)
//import { animateComet } from './animation_cometobj_string.js'; 																	// (NOT IMPLEMENTED)

// SCHNITTSTELLE CONFIG (PREFERENCES/DEFAULTS)
import { setDblRandomColor, rndmCol1, rndmCol2, pickRandomFromCollection } from './config_settings.js';

// SCHNITTSTELLE SAVEOUT
		// LINK MODULE
		// "SAVOUT_HTML" (SINGLE DRAWING VIEW) OR 
		// "SAVOUT_JSON" (TO ACCUMULATE FRAMES)
import { writeTimestamp, packageDownload } from './saveout_html.js'; // LINE ##69##								// PLUS SET "FULLFRAMEEXPORT" = true
//import { writeTimestamp, writeFrameData } from './saveout_json.js'; 														// PLUS SET "FULLFRAMEEXPORT" = false

// SCHNITTSTELLE VIEWS RECPLAY (RECORDING USER AUDIO)
import { recorderplayer, controlview, listenview, speakview, recordingview, playbackview, resetview, quizview, recplayforquiz, showelement, hideelement } from './recplay_views.js';
import { armaudiotemplatetrack, disarmaudiotemplatetrack, armplaybacktrack, disarmplaybacktrack } from './recplay_scrubbing.js';

// SCHNITTSTELLE PLAYAUDIO (TEMPLATES/TTS)
import { playAudioPhonetic } from '../playaudio_phonetic.js'; 																		// PLAIN "JUST-SOUND-THE-LTR"
		// "SPELL" SINGLE = PREFIX "GROSS/KLEINBUCHSTABE" PLUS LTRNAME 
		// "SPEAK" COMPOSITES = SOUND PHONEME PLUS POSTFIX "GROSS/KLEIN"
import { playAudioSelector } from '../playaudio_selector.js'; // @LINE ##555## 										// AFFIX WITH "GROSS/KLEIN(BUCHSTABE)"

// "QUIZ" ONLY // FORMAT BTNUCLC (BUT KEEP IT HIDDEN)
import { formatMinipreview } from './build_minipreview.js';

// HOME (LAUNCHER) // DISABLE REST-OF-MENU WHILE IN SELECTLIST
import { menumain, menumore, menuhomealone } from '../menu_states.js';



// CHECK PLATFORM EVENTTYPE
	console.log(`(HANDLERS BUTTONS) = = = EVENTTYPE ${eventtype} = = =`);
// CHECK SCOPE (IMPORTS FROM RECPLAY)
	//console.log(`(HANDLERS BUTTONS) ===== SPEAK ${speakview ? true : false} =====`); // OK
	console.log(`(INFOSYSTEM) = = = ALERTS ${ALERTS} = = =`);


																		// GLOBAL OBJECTS
	window.BUTTONS = {};

																		// GLOBAL FLAGS
				// (VAR MODULE-WIDE BUT NOT IN WINDOW)
	var REPETITION; // COUNTER AND TIMESTAMP REPETITION (ANY ATTEMPT)
				// EXPORT TO HTML-VIEW (TRUE) OR JSON-DATA ONLY (FALSE)
				// (VAR MODULE-WIDE BUT NOT IN WINDOW)
	var FULLFRAMEEXPORT = true; // LINE ##36##

				// SWITCH CASE
	var FIRSTSELECTION;
	var SWITCHTO;

// ON CLOSE_RECPLAY
	function resetAllFlags() {
		AUDIOBLOBPENDING = false;
		AUDIOTEMPLATEPLAYED = false;
		RECORDINGLOCKED = false;
		LIVERECORDING = false;
	}

														// MANAGE HELP-MESSAGES // LINE ##117##
// ACTIVATE OR "SILENCE" POP-OVERS
// (DEFAUT/INIT) SWITCH IS UN"CHECKED"
MSGFLAGS.msgLauncher = 
	{ 
		active: true,
		text: "undefined",
		checked: false
	};





			// IN VAR "BUTTONS"
// BTNOPEN_RECPLAY
// BTNCLOSE_RECPLAY

// BTNHOME
// BTNWATCH
// BTNWRITE
// BTNMORE
// BTNBACK
// BTNQUIZ
// REPEAT QUIZ
// BTNSTEPPER
// BTNPORTFOLIO

// BTNUCLC (CONDITIONAL "RECPLAY")
// BLANKTOGGLE (WITH BTNUCLC)
// BTNSAVETRACE (CONDITIONAL "WRITE")
// BTNAUDIOLOCK (IN QUIZ)



// LINE ##149##
// MODULE ("RECPLAY" IN "CONTROL")
	BUTTONS.btnopenRECPLAY = document.getElementById("btnopenRECPLAY");
	BUTTONS.btncloseRECPLAY = document.getElementById("btncloseRECPLAY");

// BUTTONS IN "NAVIGATION"
	BUTTONS.btnhome = document.getElementById("btnhome");
	BUTTONS.btnwatch = document.getElementById("btnwatch");
	BUTTONS.btnwrite = document.getElementById("btnwrite");
	BUTTONS.btnmore = document.getElementById("btnmore");
	BUTTONS.btnback = document.getElementById("btnback");
	BUTTONS.btnquiz = document.getElementById("btnquiz");
			// (PLUS HANDLER REPEAT QUIZ)
	BUTTONS.btnstepper = document.getElementById("btnstepper");
	BUTTONS.btnportfolio = document.getElementById("btnportfolio");

// CONDITIONAL // ("NAVIGATION" IN "CONTROL")
	BUTTONS.btnuclc = document.getElementById("btnuclc");
	BUTTONS.blanktoggle = document.getElementById('blanktoggle');

// CONDITIONAL // ("WRITE" IN "CONTROL")
	BUTTONS.btnsavetrace = document.getElementById('btnsavetrace');

// ##TBD## NEW LAYOUT VIEW "RECPLAY_FOR_QUIZ"
	BUTTONS.btnaudiolock = document.getElementById('btnaudiolock');










// ––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
																					// OPEN "RECPLAY"
// ––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
																					// LINE ##144##
	BUTTONS.btnopenRECPLAY.addEventListener(eventtype, (e) => {
		e.preventDefault();
// MESSAGES
		//console.log('(BTNOPEN_RECPLAY) QUIZ_ON', QUIZ_ON);
		if (DEBUG_EVENTS) {
			console.log(`\t\t\t\tBTN "OPENRECPLAY" ${e.type} ${e.target.id} LOADITEM = ${SELECTED}`);
		}
		if (ALERTS) { alert('open "Recorderplayer" to listen and repeat'); }
// ALWAYS ALERT IF TRACE UNSAVED
// USE/MAKE COMPONENT "CUSTOM ALERT"
		if (TRACEFINISHED) {
			alert("(reminder: save trace now or never!)\n Y/N");
		}

// FLAGS
		TRACEFINISHED = false; // (ALLOW DELETION) HIDE "BTNSVETRACE"
		resetAllFlags();

		if (DEBUG_RECPLAY) {
			console.log("(OPENRECPLAY)");
			console.log(`PLAYED\tRECLOCK\tLIVE\tBLOB`);
			console.log(`${AUDIOTEMPLATEPLAYED}\t${RECORDINGLOCKED}\t${LIVERECORDING}\t${AUDIOBLOBPENDING}`);
		}

// LAYOUT // DEFAULT 
		if (!QUIZ_ON) {
			console.log("= = = (BTN OPENRECPLAY) DEFAULT *NOT* QUIZ_ON = = =");
			quizview(CLOSE);
			// ==> INCLUDES (BKGRND/DARK MODE)
			speakview(CLOSE);
			// ==> INCLUDES
			listenview(OPEN);
			// ==> INCLUDES
// SET/RESET
			armaudiotemplatetrack();
			// DO THIS IN "SPEAKVIEW"/"PLAYBACKVIEW" ONLY
			//armplaybacktrack();
																				// AUDIOPLAYER
		playAudioPhonetic(SELECTED);
																		// (TIME-TO-POSITION)
		audiotemplatetrack.style.width = "25%";

		}

// LAYOUT // QUIZ 
		if (QUIZ_ON) {
			speakview(CLOSE); // ##WATCH ITEM## // (CLEARDEFAULT)
			listenview(CLOSE);

			console.log("= = = (BTN OPEN RECPLAY) SET VIEW RECPLAY_FOR_QUIZ = = =");
			recplayforquiz(OPEN);
			// (OVERRIDE) // ##WATCH ITEM##
			console.log("(BTN OPENRECPLAY) QUIZ_ON) BTN AUDIOSTART", btnaudiostart);
			btnaudiostart.classList.add('displaynone');
		}


if (DEBUG_AUDIO) {
	console.log("(BUTTON OPENRECPLAY)", SELECTED);
}


	}); // BTNOPEN RECPLAY






// ––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
																					// CLOSE "RECPLAY"
// ––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
																					// LINE ##199##
	BUTTONS.btncloseRECPLAY.addEventListener(eventtype, (e) => {
		e.preventDefault();
		
		//console.log('(BTNCLOSE_RECPLAY) QUIZ_ON', QUIZ_ON);
// MESSAGES
		if (ALERTS) { alert(`close "Recorderplayer"
(IF RECORDING IS PENDING)
"save recording to your portfolio?"
YES/NO`); }

		if (DEBUG_EVENTS) {
			console.log(`\t\t\t\tBTN "CLOSERECPLAY"`); // ${e.type} ${e.target.id}`);
		}

// FLAGS
		// ##TBD## // if (AUDIOBLOBPENDING) { console.log("MSG SAVE Y/N"); };
		if (DEBUG_RECPLAY) {
			console.log("(CLOSE RECPLAY)");
			console.log(`PLAYED\tRECLOCK\tLIVE\tBLOB`);
			console.log(`${AUDIOTEMPLATEPLAYED}\t${RECORDINGLOCKED}\t${LIVERECORDING}\t${AUDIOBLOBPENDING}`);
		}

// LAYOUT // QUIZ
		if (!QUIZ_ON) {
			quizview(CLOSE);
			// ==> INCLUDES (BKGRND/DARK MODE)
		}
		if (QUIZ_ON) {
			console.log("= = = = = = = = = = (BUTTON CLOSE) SET VIEW RECPLAY_FOR_QUIZ = = = = = = = = = =");
			recplayforquiz(CLOSE);
		}

		listenview(CLOSE);
		// ==> INCLUDES

		speakview(CLOSE);
		// ==> INCLUDES

		controlview(CLOSE); // (SHOW BTN "SPEAKER")
		// ==> INCLUDES

// SET/RESET
		disarmaudiotemplatetrack(); // ##TBD## REDUNDANT WHEN HIDDEN
// DO THIS IN *ADDITION* IN "SPEAKVIEW"("PLAYBACKVIEW")
		disarmplaybacktrack();
		// ==> INCLUDES


// ##VIEW##
// "INPUTLEVELCONTAINER" == REMOVE DISPLAYNONE
// "INPUTLEVELBAR" (WHATEVER STATE)

	}); // BTNOPEN RECPLAY









// (TOP) NAVIGATION // LINE ##319##
// ––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
																			// HOME (VIEW--LAYOUT)
// ––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
	const handlerbtnhome = function(e) {
		e.preventDefault();
// MESSAGES
		if (ALERTS) { alert(`select another letter
#TBD# this will open module "Launcher"
(home of the speaking keyboard)
https://www.jenskreitmeyer.de/alphasprint/
LAUNCHER/main_chrome.html`); }


// INSERT INNER_HTML CUSTOM POP-OVER (USING "MSGCONTAINER" FROM INLINE-SCRIPT INDEX)
// --MSG--
if (MSGFLAGS.msgLauncher.active === true && MSGFLAGS.msgLauncher.checked === false) {
// LINE ##336##
	let alertlauncher =`
			<div style="white-space: pre-wrap;"><span class="blue">"LAUNCHER/HOME"</span>
The finished module will feature a "talking keyboard" and a menu listing as in the demo linked below.
      Tap a key to hear the corresponding sounding for the letter. Double-tap to open it for practicing. Select letter groups, including all composite graphemes, from the menu.
      Groups are configured for a variety of exercises: geometric and kinetic similarity, frequently confused shapes, place of articulation, voiced and unvoiced pairs etc pp
			</div>
			<div>
				<a href=${HOST + "LAUNCHER/main_chrome.html"} target="_new"><span class="blue">Demo "LAUNCHER/HOME"</span></a> 
			</div>
			<div>
				<div id="btnclose" class="alertbtn blue" onpointerup="MSGCONTAINER.classList.add('displaynone');">CLOSE</div>
			</div>

			<div class="switchcontainer">
				<div class="switchtrack" id="msgLauncher" onpointerup="toggle('msgLauncher');">
					<div class="switchthumb"></div>
				</div>
				<span style="position: relative; top: 10px; left: 10px;">Don't show again</span>
			</div>
			`;

	MSGCONTAINER.firstElementChild.innerHTML = alertlauncher;
			//console.log("INSERT TARGET", MSGCONTAINER.firstElementChild);
			// (CLASS "CUSTOMALERTBOX INIT" WITHOUT ID)
	MSGCONTAINER.classList.remove('displaynone');
}
// --END MSG--

		if (DEBUG_EVENTS) {
			//console.log(`BTN HOME ${e.type} ${e.target.id}`);
			console.log('\t\t\t\tBTN "HOME" #TBD# CANCEL ALL ANIMATIONS /nDISABLE NAVIGATION /nHIDE MODULE RECPLAY');
		}
// FLAGS
		resetAllFlags();
		if (DEBUG_RECPLAY) {
			console.log("(BTN HOME)");
			console.log(`PLAYED\tRECLOCK\tLIVE\tBLOB`);
			console.log(`${AUDIOTEMPLATEPLAYED}\t${RECORDINGLOCKED}\t${LIVERECORDING}\t${AUDIOBLOBPENDING}`);
		}
// LAYOUT
		menuhomealone(true); // ("ON" "OFF" NOT IN SCOPE)
			// SHOW NONE BUT "HOME"

		quizview(CLOSE);
		// ==> INCLUDES (BKGRND/DARK MODE)

		recorderplayer(CLOSE); 
		// ==> INCLUDES
					// (EXCLUDED MODULE FROM "SHOW/HIDE" FUNCTION)
					//recorderplayer.style.display = "none";

	}

// ––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
																			// HOME (STATES--SET/RESET)
// ––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
	BUTTONS.btnhome.addEventListener(eventtype, (e) => {
// ##TBD##
		//CANCEL/DISABLE ANIMATION "WATCH" (VORSCHRIFTLAYER) "QUIZ" (SPECIALFXLAYER) IF RUNNING
		DOM.specialfxlayer.classList.add('displaynone');
		DOM.vorschriftlayer.classList.add('displaynone');
// ##TBD##
		// WHILE "OVERLAYSELECTLIST"=TRUE DIS-ABLE (NOT HIDE) "NAVIGATION" AND "RECPLAY"

// SET "DO"
		// SET "LITE MODE"(AFTER QUIZ)
		DOM.bodyelement.classList = []; // (CLEARING ANY LEFT-OVER STYLES ON BODY!)										// PORT/LAND ON HTML-EL
		touchUIwrapper.removeEventListener(eventtype, repeatanimation, { passive: false } ); 					// (HANDLER ADDED @LINE ##383##)	
		// SHOW PROXIE SWIPE/KEYBOARD
		DOM.overlayselectlist.classList.remove('displaynone');

// RESET "UNDO"
		DOM.templatelayer.classList.remove('displaynone'); // (AFTER QUIZ STEPPER POFO)
		DOM.crawlerlayer.classList.remove('displaynone'); // (AFTER QUIZ STEPPER POFO)

// ALWAYS DELETE FOR NEW LETTER (IF RENDERED IN DEBUG-MODE)
		DOM.samples.replaceChildren("");
		DOM.controlpts.replaceChildren("");
	}, false);














// LINE ##430##
// ––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
																			// WATCH (VIEW--LAYOUT)
// ––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
	const handlerbtnwatch = function(e) {
		e.preventDefault();
// MESSAGES
		if (DEBUG_EVENTS) {
			//console.log(`BTN "WATCH" ${e.type} ${e.target.id}`);
			console.log(`\t\t\t\tBTN "WATCH" LOADITEM = ${SELECTED}`);
			//console.log('(BTN WATCH) #TBD# CANCEL ANIMATION "QUIZ"');
			//console.log('(BTN WATCH) #TBD# EN-ABLE ANIMATION "WATCH"');
		}
		if (ALERTS) { alert('run module "Watch" (how to write the letter)'); }
// FLAGS
		AUDIOTEMPLATEPLAYED = false;
		RECORDINGLOCKED = false;
		LIVERECORDING = false;
				// BLOB WARN ##TBD##
		if (DEBUG_RECPLAY) {
			console.log("(BTN WATCH)");
			console.log(`PLAYED\tRECLOCK\tLIVE\tBLOB`);
			console.log(`${AUDIOTEMPLATEPLAYED}\t${RECORDINGLOCKED}\t${LIVERECORDING}\t${AUDIOBLOBPENDING}`);
		}
// LAYOUT
		quizview(CLOSE);
		// ==> INCLUDES (BKGRND/DARK MODE)

		recorderplayer(OPEN);
		// ==> INCLUDES

		controlview(CLOSE);
		// ==> INCLUDES

	}
// ––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
																		// WATCH (STATES--SET/RESET)
// ––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
	BUTTONS.btnwatch.addEventListener(eventtype, (e) => {
		e.preventDefault();
// ##TBD##
		// EN-ABLE ANIMATION "WATCH" // DIS-ABLE ANIMATION "QUIZ" (SPECIALFXLAYER) IF RUNNING
		DOM.specialfxlayer.classList.add('displaynone');
		DOM.vorschriftlayer.classList.remove('displaynone');

// REMOVE POINTS IN LAYER-GROUP "ANIMATION"
		cleardrawing();

													// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

// RESET "UNDO"
// ##TBD## CANCEL ANIMATION "WATCH" (IF RUNNING)

		// SET "LITE MODE"(AFTER QUIZ)
		DOM.bodyelement.classList = []; 																															// (EXCLUDING ADDITIONAL STYLES ON BODY!
		touchUIwrapper.removeEventListener(eventtype, repeatanimation, { passive: false } );
		DOM.templatelayer.classList.remove('displaynone'); // (AFTER QUIZ STEPPER POFO)
		DOM.crawlerlayer.classList.add('displaynone'); // NO TRACING/FEEDBACK IN "WATCH"
		if (!DEBUG_PIPE) {
			DOM.outlineslayer.classList.add('displaynone');
		}

// SET "DO"
		// RUN ANIMATION INSTRUCTION																																	// SAMPLING STEP="ASTEP" FROM CONFIG
				//console.log("ANIMATE BTN (THIS)", this); // IS WINDOW
				//console.log("ANIMATE BTN (ANIMPTS_LUT)", importname, ANIMPTS_LUT);
		prepareAnimation(); 																																					// (IMPORTED FROM SAMPLE_ANIMATION_LUT)
		//renderAirlines();																																						// (CHECK/DEBUG PAUSES)
		animateGlyph(); //###497###																																		// (IMPORTED FROM ANIMATION_VORSCHRIFT)

	}); // WATCH









// LINE ##510##
// ––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
																				// WRITE (VIEW--LAYOUT)
// ––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
	const handlerbtnwrite = function(e) {
		e.preventDefault();
// MESSAGES
		if (ALERTS) { alert('run module "Write" (trace the letter)'); }
		if (DEBUG_EVENTS) {
			//console.log(`BTN "WRITE" ${e.type} ${e.target.id}`);
			console.log(`\t\t\t\t\tBTN "WRITE" LOADITEM = ${SELECTED} #TBD# CANCEL ALL ANIMATIONS`);
		}
// FLAGS
		AUDIOTEMPLATEPLAYED = false;
		RECORDINGLOCKED = false;
		LIVERECORDING = false;
		// BLOB WARN ##TBD##
		if (DEBUG_RECPLAY) {
			console.log("(BTN WRITE)");
			console.log(`PLAYED\tRECLOCK\tLIVE\tBLOB`);
			console.log(`${AUDIOTEMPLATEPLAYED}\t${RECORDINGLOCKED}\t${LIVERECORDING}\t${AUDIOBLOBPENDING}`);
		}
// LAYOUT
		quizview(CLOSE);
		// ==> INCLUDES (BKGRND/DARK MODE)

		recorderplayer(OPEN);
		// ==> INCLUDES

		controlview(CLOSE);
		// ==> INCLUDES

	}
// ––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
																			// WRITE (STATES--SET/RESET)
// ––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
	BUTTONS.btnwrite.addEventListener(eventtype, (e) => {
		e.preventDefault();
// SET "DO"
// ##TBD##
		// ##CANCEL ANIMATION## "WATCH" (VORSCHRIFTLAYER) "QUIZ" (SPECIALFXLAYER) IF RUNNING
		DOM.specialfxlayer.classList.add('displaynone');
		DOM.vorschriftlayer.classList.add('displaynone');

		// SET "LITE MODE"(AFTER QUIZ)
		DOM.bodyelement.classList = []; 																															// (EXCLUDING ADDITIONAL STYLES ON BODY!
		// REMOVE REPEAT (AFTER QUIZ)
		touchUIwrapper.removeEventListener(eventtype, repeatanimation, { passive: false } ); // (AFTER QUIZ)
		DOM.templatelayer.classList.remove('displaynone'); // (AFTER QUIZ STEPPER POFO)
		DOM.crawlerlayer.classList.remove('displaynone'); // (AFTER QUIZ STEPPER POFO)

// CLEARDRAWING
		document.dispatchEvent(shakeevt); 																														// (=SYNTHETIC EVENT-NAME)
	});








// ––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
																				// MORE (VIEW--LAYOUT)
// ––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
	const handlerbtnmore = function(e) {
		e.preventDefault();
		if (ALERTS) { alert('show menu "More"'); }
		menumain(CLOSE);
		menumore(OPEN);
	}
	
	
	
// ––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
																		  	// BACK (VIEW--LAYOUT)
// ––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
	const handlerbtnback = function(e) {
		e.preventDefault();
		if (ALERTS) { alert('"Back" to menu main'); }
		menumain(OPEN);
		menumore(CLOSE);
	}







// LINE ##596##
// ––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
																			 // QUIZ (VIEW--LAYOUT)
// ––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
	const handlerbtnquiz = function(e) {
		e.preventDefault();
// MESSAGES
		if (ALERTS) { alert(`run module "Quiz"
(HINT: if you can't solve it 
go to "Watch"/"Write" to look it up!)
for a new glyph tap the "Q"-button
to repeat the same glyph tap on background`); }

		if (DEBUG_EVENTS) {
			console.log('\t\t\t\tBTN "QUIZ" #TBD# CANCEL ANIMATION "WATCH" ENABLE ANIMATION "QUIZ"');
		}
// = = = = = = = = = = = = = = = = = = = = = = = = 

// ##TBD## NEXT GEN // ADD CUSTOM ALERT "SELECT QUIZ STYLE"
// BTNS "COMET"/"KARAOKE"

// = = = = = = = = = = = = = = = = = = = = = = = = 

// FLAGS
		AUDIOTEMPLATEPLAYED = false;
		RECORDINGLOCKED = false;
		LIVERECORDING = false;
		if (DEBUG_RECPLAY) {
			console.log("(BTN QUIZ)");
			console.log(`PLAYED\tRECLOCK\tLIVE\tBLOB`);
			console.log(`${AUDIOTEMPLATEPLAYED}\t${RECORDINGLOCKED}\t${LIVERECORDING}\t${AUDIOBLOBPENDING}`);
		}

// LAYOUT
// # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #

																// ##TBD## MERGE TO DEFINE NEW VIEW

// # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #

		quizview(OPEN); // (SEQUENCE OVERRIDE CONTROL WITH UCLC)
		// ==> INCLUDES
				// QUIZ_ON = TRUE

		recorderplayer(OPEN);
		// ==> INCLUDES

		controlview(CLOSE);
		// ==> INCLUDES
		// SHOWELEMENT(BTNUCLC);
				//IF (QUIZ_ON)
				// ##EXCEPTION## HIDEELEMENT (DO *NOT* SHOW BTNUCLC)

// /!\ NO // DON'T PLAY AUDIO BEFORE SOLVE
 		//playAudioSelector(SELECTED);
					// UMLAUTS/!\ (#TBD# USE CHARS/UTF-8 // CHECK SERVER)
					// USE (AS IS) "SELECTED" == KEY"LABEL" (UNSPACED CHARS)

	} // (HANDLER BTNQUIZ/VIEW)


// ––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
																		 	// QUIZ (STATES--SET/RESET)
// ––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
	BUTTONS.btnquiz.addEventListener(eventtype, (e) => {
		e.preventDefault();
// SET "DO"
// ##TBD## 
		// EN-ABLE ANIMATION "QUIZ" ##CANCEL## ANIMATION "WATCH" (IF RUNNING)
		DOM.specialfxlayer.classList.remove('displaynone');
		DOM.vorschriftlayer.classList.add('displaynone');

		// RANDOMIZED GRAPHEME FROM CURRENT "COLLECTION" // (FUNCTION IN CONFIG_SETTINGS)
		let pick = pickRandomFromCollection(); 																												// LABEL
		SELECTED = pick;

// MUST USE SPACEDLABEL ELSE CAN NOT RENDER MTBG
// (SPACEDLABEL USED IN ORDER TO NOT SPLIT NUMBER FROM VERSIONED GLYPH)
		let loaditem = FONTINFO.get(pick).spacedlabel;																								// (WORD)SPACEDLABEL /!\
		console.log(`(QUIZ) LOCAL "LOADITEM" ${loaditem} "SELECTED" ${SELECTED}`);

// (UNITCHECK)
// 		console.log("(QUIZ)", SELECTED);
// 		console.log("(QUIZ)", FONTINFO.get(SELECTED).info);

// CLEAR
// ##TBD## CROSS CHECK OVERLAP OF EXPLICIT DELETES BELOW WITH FUNCTIONS IN "CLEARDRAWING"
		cleardrawing();

// ALWAYS DELETE SAMPLING/INSPECTORS WITH NEW LETTER
		if (!DEBUG_PIPE) {
			DOM.samples.replaceChildren("");
			DOM.controlpts.replaceChildren("");
		}
		// REMOVE DRAWING ("UNWANTED HINTS") // ##TBD## ALSO REMOVE PREVIOUS POINTS (IF ANY) IN LAYERGROUP "SPECIALFX"
		DOM.trace.replaceChildren("");

																					// GO "DARK" 																						// (POSSIBLE HINTS)
		DOM.templatelayer.classList.add('displaynone');
		DOM.crawlerlayer.classList.add('displaynone');
		touchUIwrapper.addEventListener(eventtype, repeatanimation, { passive: false });							// ADD REPEAT-HANDLER // LINE ##450##

		if (!DEBUG_PIPE) {
			DOM.sampleslayer.classList.add('displaynone');
			DOM.outlineslayer.classList.add('displaynone');
		}

											// (#TBD# LIMIT "RANDOM" COLOR RANGE TO WORKING CONTRASTS)
																			// SET TWO COLORS BG/PT
// 	setDblRandomColor();
// 	document.documentElement.style.setProperty('--dotbgcol', `hsla(${rndmCol1} 100% 75% / .75)`); // ON HTML "ROOT"
// 	document.documentElement.style.setProperty('--dotptcol', `hsla(${rndmCol2} 100% 75% / .75)`);

																	// PREPARE GRAPHEME DATA
		renderTemplate(loaditem); // (SPACED STRING)

// ALSO SET "BTNUCLC" TO CURRENT GLYPH
// (TO ENABLE LOOK-UP/"SOLVING" BY SWITCHING FROM "QUIZ"-MODE TO "WRITE" OR "WATCH") 

// /!\ BUT KEEP "BTNUCLC" *HIDDEN* IN "QUIZ"
		formatMinipreview(SELECTED, FONTINFO.get(SELECTED).complement);

		// ALWAYS RE-SAMPLE ANIMATION (BOTH VERSIONS USE SAME LUT) 
		prepareAnimation();

															// SWITCH BACKGROUND ("DARK MODE")
// COMET OPTION // LINE ##730##
		// DOM.bodyelement.classList.remove('dotbg');
		// DOM.bodyelement.classList.add('cometbg'); // cometpt/cometbg
		// animateComet();
// DOT OPTION
		DOM.bodyelement.classList.remove('cometbg');
		DOM.bodyelement.classList.add('dotbg'); // dotbg/dotpt
		animateDot();

	}); // END BTNQUIZ ("STATES")









// ––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
																	 // REPLAY QUIZ (REPEAT SAME GLYPH)
// ––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
var repeatanimation = function(e) {																								// (HANDLER ADDED @LINE ##383##)
	e.preventDefault();

// "CLEAR" DOES NOT INCLUDE ANIMATION // BUILD NEW COMMON FUNCTION "RESETANIMATION"
// ##TBD## (IF ANY RUNNING)
	// "QUIZ" CANCEL CURRENT ANIMATION IN FUNCTION "ANIMATE_DOT" (FROM SCRIPT "ANIMATION_KARAOKEDOT") IN "SPECIALFXLAYER"
	// "WATCH" CANCEL CURRENT ANIMATION IN FUNCTION "ANIMATE_GLYPH" (FROM SCRIPT "ANIMATION_VORSCHRIFT") IN "VORSCHRIFTLAYER"

	cleardrawing(); // ##WATCH ITEM## // FOR STATE OF "BTNUCLC"

	console.log(`REPEATING QUIZ WITH SELECTED/LUT = "${SELECTED}"`);
// REPEAT (WITH CURRENT LUT-OBJECT)
	// FOR DOT
	animateDot();
	// FOR COMET
	//animateComet();

}








// ––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
																			// STEPPER (VIEW--LAYOUT)
// ––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
	const handlerbtnstepper = function(e) {
		e.preventDefault();
// MESSAGES
		if (ALERTS) { alert(`run module "Stepper" (hear a word and write it)
#TBD# this will load module from 
https://www.jenskreitmeyer.de/alphasprint/
SILBENSCHIEBER/audioautocomp.html`); }
		if (DEBUG_EVENTS) {
			console.log('\t\t\t\tBTN "STEPPER" #TBD# CANCEL ALL ANIMATIONS');
		}

// --MSG---
// INSERT INNER_HTML CUSTOM OVERLAY (USING MSGCONTAINER) FOR PLACEHOLDER "PORTFOLIO"
// LINK #TEMP# TO "STEPPER" // LINE ##790##
	let alertpofo =`
			<div>
				<span class="blue">"STEPPER"</span> (Silbenschieber)<br>
				Progress from practicing grapheme "${SELECTED}" to using it in syllables and words.<br>
				Sound out words step-by-step adding letter-for-letter (and composite graphemes).<br>
				Hear a word, write it, speak it and look it up in the "Lexikon" (linked dictionary).
			</div>
			<div>
				<a href=${HOST + "SILBENSCHIEBER/audioautocomp.html"} target="_new">Demo "STEPPER"</a> 
				(turn on auto-rotate for your device to view in landscape)<br>
			</div>
			<div style="display: flex; flex-direction: row;">
				<div id="btnclose" class="alertbtn blue" onpointerup="MSGCONTAINER.classList.add('displaynone');">CLOSE</div>
			</div>`;

	MSGCONTAINER.firstElementChild.innerHTML = alertpofo;
	MSGCONTAINER.classList.remove('displaynone');
// --END MSG---

// FLAGS
		AUDIOTEMPLATEPLAYED = false;
		RECORDINGLOCKED = false;
		LIVERECORDING = false;
		// BLOB WARN ##TBD##
		if (DEBUG_RECPLAY) {
			console.log("(BTN STEPPER)");
			console.log(`PLAYED\tRECLOCK\tLIVE\tBLOB`);
			console.log(`${AUDIOTEMPLATEPLAYED}\t${RECORDINGLOCKED}\t${LIVERECORDING}\t${AUDIOBLOBPENDING}`);
		}
// LAYOUT
		quizview(CLOSE);
		// ==> INCLUDES (BKGRND/DARK MODE)

		recorderplayer(CLOSE); // (SET TO CLOSE 160325)
		// ==> INCLUDES

		controlview(CLOSE);
		// ==> INCLUDES


																			// ##TBD## // LANDSCAPE
		// ########################## LOAD NEW WINDOW //DEMO STEPPER ###########################

// SET "DO"

// ##TBD## CANCEL/DISABLE ANIMATION "WATCH" (VORSCHRIFTLAYER) "QUIZ" (SPECIALFXLAYER) IF RUNNING
		DOM.specialfxlayer.classList.add('displaynone');
		DOM.vorschriftlayer.classList.add('displaynone');

		// SET "LITE MODE"(AFTER QUIZ)
		DOM.bodyelement.classList = []; // (EXCLUDING ADDITIONAL STYLES ON BODY!											// PORT/LAND ON HTML
		touchUIwrapper.removeEventListener(eventtype, repeatanimation, { passive: false } );
		// (DISBALE WRITING)
		DOM.templatelayer.classList.add('displaynone');
		DOM.crawlerlayer.classList.add('displaynone');
		
		cleardrawing();
	}







// LINE ##853##
// ––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
																		// PORTFOLIO (VIEW--LAYOUT)
// ––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
	const handlerbtnportfolio = function(e) {
		e.preventDefault();
// MESSAGES
		if (ALERTS) { alert(`run module "Portfolio" (filesystem storage)
#TBD# this will show a list of all tracings and audio
saved for practiced letters/groups (Lernstand).
Play the frames in the "stack" as a movie:
https://www.jenskreitmeyer.de/alphasprint/
__TEMP/eiPLAYER/view_bunt_PLAYER.html`); }

		if (DEBUG_EVENTS) {
			console.log('\t\t\t\tBTN "PORTFOLIO" #TBD# CANCEL ALL ANIMATIONS');
		}

// --MSG---
// INSERT INNER_HTML CUSTOM OVERLAY (USING MSGCONTAINER) FOR PLACEHOLDER "PORTFOLIO"
// LINK #TEMP# TO "EI-MOVIE" // LINE ##873##
	let alertpofo =`
			<div>
				<span class="blue">"PORTFOLIO"</span> (Lernstand) will show the files saved from the app to your device.<br>
				You can save tracings from "Write" or recorded audio from "RecPlay".
			</div>
			<div>
				Traces ("frames") saved for a letter can be viewed as an 
				<a href=${HOST + "__TEMP/eiPLAYER/view_bunt_PLAYER.html"} target="_new">animation</a> 
				(tap to start/pause).<br>
				All files can also be shared/mailed.
			</div>
			<div style="display: flex; flex-direction: row;">
				<div id="btnclose" class="alertbtn blue" onpointerup="MSGCONTAINER.classList.add('displaynone');">CLOSE</div>
			</div>
`;
	MSGCONTAINER.firstElementChild.innerHTML = alertpofo;
	MSGCONTAINER.classList.remove('displaynone');
// --END MSG---

// FLAGS
		resetAllFlags();
		if (DEBUG_RECPLAY) {
			console.log("(BTN PORTFOLIO)");
			console.log(`PLAYED\tRECLOCK\tLIVE\tBLOB`);
			console.log(`${AUDIOTEMPLATEPLAYED}\t${RECORDINGLOCKED}\t${LIVERECORDING}\t${AUDIOBLOBPENDING}`);
		}
// LAYOUT
		quizview(CLOSE);
		// ==> INCLUDES (BKGRND/DARK MODE)

		recorderplayer(CLOSE); // (SET TO CLOSE 160325)
		// ==> INCLUDES

		controlview(CLOSE);
		// ==> INCLUDES
		// ==> LOCAL
				hideelement(btnopenRECPLAY);

											/* VIEW IS "FILTERES" FOR CURRENTLY SELECTED GRAPHEME */
															/* NEW SELCTION ONLY THRU "HOME" */
		/* ########################## NEW WINDOW //DEMO "EI-MOVIE" ########################### */
		// ##TBD## // LANDSCAPE
		
// SET "DO"
// ##TBD## CANCEL/DISABLE ANIMATION "WATCH" (VORSCHRIFTLAYER) "QUIZ" (SPECIALFXLAYER) IF RUNNING
		DOM.specialfxlayer.classList.add('displaynone');
		DOM.vorschriftlayer.classList.add('displaynone');

		// SET "LITE MODE"(AFTER QUIZ)
		DOM.bodyelement.classList = []; 																															// (EXCLUDING ADDITIONAL STYLES ON BODY!
		touchUIwrapper.removeEventListener(eventtype, repeatanimation, { passive: false } );
		// (DISBALE WRITING)
		DOM.templatelayer.classList.add('displaynone');
		DOM.crawlerlayer.classList.add('displaynone');

		cleardrawing();
	} // (HANDLER BTNPOFO)








// LINE ##835##
// ––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
																	  // SAVETRACE (VIEW--LAYOUT)
// ––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
// ##TBD## LINK DOWNLOAD-PROCEDURE FROM #MODULE# "SAVEOUT"
// ##TBD## DISPLAY MSG "TRACE HAS BEEN SAVED" #IF# SAVING IS OPTIONAL USER-ACTION

	BUTTONS.btnsavetrace.addEventListener(eventtype, (e) => {
		if (DEBUG_EVENTS) {
			console.log('\t\t\t\tBTN "SAVETRACE"');
		}
		if (ALERTS) {
			alert(`save your writing to your device
send it to someone to make them happy!
#TBD# files will be saved to a "stack" of frames
that can be played as a movie from "Portfolio"`);
		}
		if (FULLFRAMEEXPORT) {
			packageDownload();
		} else {
			writeFrameData();
		}
		console.log(`––––––––––––––––––––––––––––––– SAVED FRAMEDATA ${SELECTED} ${writeTimestamp()} –––––––––––––––––––––––––––`);
		TRACEFINISHED = false;
		console.log(`FULLFRAMEEXPORT ${FULLFRAMEEXPORT} TRACEFINISHED ${TRACEFINISHED}`);

// LAYOUT
		BUTTONS.btnsavetrace.classList.add('displaynone');																						// DISABLE FURTHER SAVEOUTS
		BUTTONS.btnuclc.classList.remove('displaynone');
	});

// #TBD# TRACE IS ONLY DELETED WITH NEXT "CLEARDRAWING" (BY ANY HANDLER)
// TRACE MAY STILL BE THERE AFTER RECPLAY BUT CANT BE SAVE ANYMORE
// THEREFORE ALERT WARNS "SAVE NOW OR NEVER" BEFORE OPENING RECPLAY (FEELS "DISCOVERABLE")









// LINE ##981##
// ––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
																// "UCLC" SWITCH CASE (VIEW--LAYOUT)
// ––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––



	BUTTONS.btnuclc.addEventListener(eventtype, (e) => {

		if (ALERTS) { alert('switch between upper and lower case'); }

// SAVE TOGGLE-PAIR // (CAN BE "ASYMMETRIC" ALT-GLYPH/REGULAR)
		let upperglyph;
		let lowerglyph;
		let TOGGLE = [ upperglyph, lowerglyph ]; // TOGLE-PAIR // LINE ##1003##


// GET CASE OF THE INCOMING (SELECTED) LETTER
// AND DEFINE THE PAIR Of "OPPOSING" LTRS
											// ###TBD### ALL THIS MIGHT BE DONE IN SELECTLIST HANDLER
		let initltr = SELECTED[0];
		if (initltr.toUpperCase() === SELECTED[0]) {
			TOGGLE[0] = FONTINFO.get(SELECTED).spacedlabel; // IS UPPERCASE
			TOGGLE[1] = FONTINFO.get(SELECTED).complement; 																							// (IS SPACED STRING)
		} else {
			TOGGLE[1] = FONTINFO.get(SELECTED).spacedlabel; // IS LOWERCASE
			if (FONTINFO.get(SELECTED).complement !== "") { 																						// LOWERCASE MAY NOT HAVE A COMPLEMENT
				TOGGLE[0] = FONTINFO.get(SELECTED).complement;
			} else {
				console.log("TOGGLE", TOGGLE);
				alert(`/!\\ NO UPPERCASE FOR ${SELECTED} (${FONTINFO.get(SELECTED).info})`);
				return;
			}
		}

	if(DEBUG_UCLC){
		console.log("TOGGLE", TOGGLE);
	}

		if (LTRCASE === "upper") {
			renderTemplate(TOGGLE[1]); // LOWER
			LTRCASE = "lower";
		} else {
			renderTemplate(TOGGLE[0]); // UPPER
			LTRCASE = "upper";
		}


		cleardrawing();

		AUDIOTEMPLATEPLAYED = false;
		RECORDINGLOCKED = false;
			if (DEBUG_RECPLAY) {
				console.log("(BTN UCLC)");
				console.log(`PLAYED\tRECLOCK\tLIVE\tBLOB`);
				console.log(`${AUDIOTEMPLATEPLAYED}\t${RECORDINGLOCKED}\t${LIVERECORDING}\t${AUDIOBLOBPENDING}`);
			}

	}); // (HANDLER BTNUCLC)










																		// ADD (SECOND) HANDLERS
// ––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
// ––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––

																		// BUTTONS IN MAIN MENU
// ADD LISTENERS
	BUTTONS.btnhome.addEventListener(eventtype, handlerbtnhome, { passive: false } );
	BUTTONS.btnwatch.addEventListener(eventtype, handlerbtnwatch, { passive: false } );
	BUTTONS.btnwrite.addEventListener(eventtype, handlerbtnwrite, { passive: false } );
	BUTTONS.btnmore.addEventListener(eventtype, handlerbtnmore, { passive: false } );
	BUTTONS.btnback.addEventListener(eventtype, handlerbtnback, { passive: false } );
	BUTTONS.btnquiz.addEventListener(eventtype, handlerbtnquiz, { passive: false } );
	BUTTONS.btnstepper.addEventListener(eventtype, handlerbtnstepper, { passive: false } );
	BUTTONS.btnportfolio.addEventListener(eventtype, handlerbtnportfolio, { passive: false } );











// ––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
// ––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
																		//  SHAKE TO RESET (MOBILE-ONLY)
// ––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
	const myShakeEvent = new Shake({																											// INSTANTIATE FROM PROTOTYPE
		threshold: 5,
		timeout: 500
	});
	myShakeEvent.start();																																	// ACTIVATE // START LISTENING TO DEVICE MOTION
	window.addEventListener('shake', (e) => {																							// REGISTER EVENT
		//console.log("DELETING TRACE");
		cleardrawing();
	}, false);






// ––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
																				// BACKSPACE DESKTOP 
													// (ADDITIONAL DELETE OPTION IN DESKTOP TOUCH-SIM)
	window.addEventListener("keydown", (e) => {
		//console.log(`KeyboardEvent: key='${event.key}' code='${event.code}'`);
		if(event.key === "Backspace") {
			document.dispatchEvent(shakeevt); 																							// ("SHAKEEVT" IS THE CUSTOM EVENT-NAME)
		}
  }, true);







// !!FUNCTION ALSO ON EVERY LISTITEM (OPTION) IN "SELECTLIST" HANDLER
// ––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
																				// "CLEAR" / RESET
// ––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
function cleardrawing() {
// LINE ##1117##
															// "SCHNITTSTELLE" PROTO-STATISTICS

// ##TBD## RESEARCH/CREATE PERSISTENT DATA STORAGE
// AT TOP LEVEL CREATE MAP (LIKE "FONTINFO")
// WITH KEYS FOR EACH GRAPHEME
// ADD SAME-TO-SAME ONLY (LTRS/MTBG)


// ##MEMO## CREATE (NUMERIC) "METRIC" OBJECT // 06-DEC-24
		// SELECTED // (IN WINDOW SCOPE)
					// SINGLE CHAR IDENTIFIES "PORT" TWO OR MORE "LAND" ORIENTATION
					// DIMENSIONS MUST BE FIXED (AT DEVICE FULLSCREEN)
		// REPEATS PER GRAPHEME
					// VIEWED/HEARD (SHOW/TELL)
					// LISTENED/RECORDED
								// OF WHICH WERE SAVED ...(?)
					// QUIZED (TOTAL AND REPETITIONS IN A ROW?)
					// TRACED (AS SEEN BY DELETE OR SAVED)
								// COUNTER AND TIMESTAMP FOR ANY ATTEMPT (BUT NO CAPTURE)
					// TRACEFINISHED (AS SEEN BY "BING")
								// ONLY FINISHED TRACE CAN BE EXPORTED (CAPTURED)
								// COUNTER AND TIMESTAMP FOR ANY ATTEMPT (BUT NO CAPTURE)


																// UN-LOCK REPEAT OF SAVE-SEQUENCE
	TRACEFINISHED = false; // USED FOR STATISTICS IN HANDLER "CRAWLER"
	AUDIOLOCK = false; // USED WITH SIGNAL/SAVE BTN
	//console.log("(CLEARDRAWING) AUDIOLOCK", AUDIOLOCK, "TRACEFINISHED", TRACEFINISHED);

	BUTTONS.btnsavetrace.classList.add('displaynone');
	//BUTTONS.btnuclc.classList.remove('displaynone'); // (AFTER SAVE #OR# TRACE DELETED)
	if (!QUIZ_ON) {
		BUTTONS.btnuclc.classList = []; // TABULA RASA // ##WATCH ITEM##
	}

// CLEARDRAWING ANIMATION (IF RENDERED)
										// ##TBD## CLEARING TRACE ALSO RE-STARTS ANIMATION
	//DOM.vorschrift.replaceChildren('');
	let ptcount = 0;


														// (STATE) ##TBD## PRIME FOR NEXT TRACING
					//laststate = 0;
// RESET #CRAWL_TRACK#
	let CELS = DOM.crawler.children; // NODELIST 																				// ##TBD## ADD CONDITIONAL FOR INIT-STATE = EMPTY NODE
// (AT LOAD IS EMPTY) 
	if (CELS.length) { // IS NOT ZERO
		 				// /!\ ABSOLUTELY KEEP THIS AS PROPERTY (KEY) "VISIBILITY" (VALUE) "HIDDEN"
						 // THIS IS #NOT# A CLASS="HIDDEN" IS #NOT# APPLYING STYLE "DISPLAY: NONE"
		for (let i = 0; i < CELS.length; i++) { 
			CELS[i].setAttribute('visibility', 'hidden'); 																	// (ONLY TWO VISIBLE AT A TIME // BUT WELL)
		}
// INIT STARTPOINT AND FIRST CEL // LINE ##699##
		CELS[0].setAttribute('visibility', 'visible'); // STARTPOINT
		CELS[1].setAttribute('visibility', 'visible'); // FIRST CEL
	}


													// MERGED RESETS // DELETE PREVIOUS DRAWINGS
						// CALLED FROM 
						// "SELECT-LIST" (RESET) HANDLER ON LIST ITEMS
		DOM.trace.replaceChildren("");

		DOM.vorschrift.replaceChildren(""); // "AIRLINES" // #TBD# FRAMES // (21-OKT-24)
		DOM.specialfx.replaceChildren("");

 // (SHOW BEZ-POINTS IN DEBUG-MODE) // BUT ALWAYS REMOVE WITH "NEW LTR"
 //console.log("(HANDLERS) DEBUG_PIPE", DEBUG_PIPE);
		if (!DEBUG_PIPE) {
			DOM.samples.replaceChildren("");
			DOM.controlpts.replaceChildren("");
		}

		if (DEBUG_RECPLAY) {
			console.log("(#CLEARDRAWING#)");
			console.log(`PLAYED\tRECLOCK\tLIVE\tBLOB`);
			console.log(`${AUDIOTEMPLATEPLAYED}\t${RECORDINGLOCKED}\t${LIVERECORDING}\t${AUDIOBLOBPENDING}`);
		}

} // CLEARDRAWING









// LINE ##1209##
// =============================================================================================
													/* ALL "RECPLAY" ELEMENTS AND HANDLERS" */



				// IN VAR "RECPLAY" // (STATUS 25-MAR-25)
/*
// MODULE SECTIONS
MODULERECORDERPLAYER
SEGMENTLISTEN
SEGMENTSPEAK
SEGMENTCONTROL

// TRACK CONTAINERS
AUDIOTEMPLATECONTAINER
AUDIOTEMPLATETRACK
RECSCRUBBERCONTAINER
RECSCRUBBERBAR
INPUTLEVELCONTAINER
INPUTLEVELBAR
// ICON SCRUBBING
TEMPLATESCRUBARROWS
RECORDINGSCRUBARROWS

// BUTTONS
BTNAUDIORESET
BTNAUDIOSTART
BTNAUDIOSTOP
BTNSTARTRECORDING
BTNSTOPRECORDING
BTNPLAYRECORDING
*/

																	// GLOBAL OBJECTS SCOPE ISSUE
// # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # 
// ##### HAD A DBL AS "var RECPLAY  {}" @LINE ##52## IN MODULE "SETUP_DOMLAYERS" #####

														// MUST HAVE THIS SYNTAX HERE
	window.RECPLAY = {}; // WILL BE IN SCOPE AS (W/O PREFIX) "RECPLAY"
//var RECPLAY = {}; // THIS FORMAT WILL NOT BE IN SCOPE IN "SETUP_DOMLAYERS"


// CHECK SCOPE
//console.log('(HANDLERS RECPLAY) FUNCTION "RECPLAYVIEW"', recorderplayer); // OK (250214 21:40)
	console.log(`(HANDLERS RECPLAY) "OPEN" ${OPEN} "CLOSE" ${CLOSE}`); // OK
												// OK BUT EMPTY AT THIS POINT (BUT MUTATING) 
												// CAN BE ACCESSED EITHER WAY WITH/WITHOUT "WINDOW-DOT"
	// /!\ //console.log(`(HANDLERS RECPLAY) "WINDOW.RECPLAY"`, window.RECPLAY);
// # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # 


																// CONTAINER RECPLAY
// ––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
// MODULE RECPLAY
	RECPLAY.modulerecorderplayer = document.getElementById('modulerecorderplayer');
	RECPLAY.segmentlisten = document.getElementById('segmentlisten');
	RECPLAY.segmentspeak = document.getElementById('segmentspeak');
	RECPLAY.segmentcontrol = document.getElementById('segmentcontrol');

// TRACKS // LINE ##1092##
	RECPLAY.audiotemplatecontainer = document.getElementById('audiotemplatecontainer');
	RECPLAY.audiotemplatetrack = document.getElementById('audiotemplatetrack');
	RECPLAY.recscrubbercontainer = document.getElementById('recscrubbercontainer');
	RECPLAY.recscrubberbar = document.getElementById('recscrubberbar');
	// #####NEW######
	RECPLAY.inputlevelcontainer = document.getElementById('inputlevelcontainer'); // LINE ##1098##
	RECPLAY.inputlevelbar = document.getElementById('inputlevelbar');

// SCRUBBING STATUS
	RECPLAY.templatescrubarrows = document.getElementById('templatescrubarrows');
	RECPLAY.recordingscrubarrows = document.getElementById('recordingscrubarrows');


																// BUTTONS IN MODUL RECPLAY
// ––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––

	// BTN OPEN RECPLAY // SHARED NAVIGATION
	// BTN CLOSE RECPLAY // SHARED NAVIGATION
	// AUDIODELETE/RESET
	RECPLAY.btnaudioreset = document.getElementById('btnaudioreset');		// NEW									// DELETE AUDIO/RESET RECORDING

// LISTEN
	RECPLAY.btnaudiostart = document.getElementById('btnaudiostart');														// BTN SPEAKER
	RECPLAY.btnaudiostop = document.getElementById('btnaudiostop');															// BTN GENERIC STOP (NOMINAL)

// RECORDING
	RECPLAY.btnstartrecording = document.getElementById('btnstartrecording');										// BTN MIC
	RECPLAY.btnstoprecording = document.getElementById('btnstoprecording');											// BTN DOT

// PLAYBACK
	RECPLAY.btnplayrecording = document.getElementById('btnplayrecording');											// BTN TAPE REEL (START)

// REMOVED FROM HTML
	/*RECPLAY.btnpauseplayback = document.getElementById('btnpauseplayback');*/
// #TEMP# DISABLED TO BE SET BY AUDIOPLAYER ONL(!)
	/*RECPLAY.btnstopplayrecorded = document.getElementById('btnstopplayrecorded');*/




/* DOM ACCESS MODULE RECPLAY
modulerecorderplayer.attributes
NamedNodeMap(3) [ id="modulerecorderplayer", class="modulerecorderplayer", style="" ]

modulerecorderplayer.attributes.removeNamedItem('style')
style=""

modulerecorderplayer.attributes
NamedNodeMap [ id="modulerecorderplayer", class="modulerecorderplayer" ]
*/









																		// HANDLERS CONTROL 
/* / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / */

	btnaudioreset.addEventListener(eventtype, (e) => {
		if (ALERTS) { alert(`record again (reset recorder)
       IF RECORDING IS PENDING
"save recording to your portfolio?"
       YES/NO`); }
		if (DEBUG_EVENTS) {
			console.log('\t\t\t\t"BTN" AUDIODELETE');
		}

// FLAG
		if (AUDIOBLOBPENDING) {
			// (NOT FOR DEMO)
			//alert("(CUSTOM ALERT) DO YOU WANT TO SAVE THIS RECORDING Y/N");
		};
		// ##TBD## OPTION NO=SET FALSE
		// ##TBD## OPTION YES==DOWNLOAD
		AUDIOBLOBPENDING = false;

		//if (DEBUG_RECPLAY) {
			console.log("(BTN AUDIODELETE (RESET RECORDING))");
			console.log(`PLAYED\tRECLOCK\tLIVE\tBLOB`);
			console.log(`${AUDIOTEMPLATEPLAYED}\t${RECORDINGLOCKED}\t${LIVERECORDING}\t${AUDIOBLOBPENDING}`);
		//}





/* ######## ######## ######## ######## ######## AUDIOPLAYER ######## ######## ######## ######## */
																		// KILL B(L)OB
																		// SET RECORDINGTIME=0 RECORDINGDUR=0 (?)
		recscrubberbar.style.width = "25%"; // ##DUMMY##

		speakview(OPEN);
		// ==> INCLUDES
					//controlview(OPEN)
					//playbackview(CLOSE);

		recordingview(CLOSE); // CONNECTED BUT NOT RECORDING
		// ==> INCLUDES
					//playbackview(CLOSE);
					// ==> INCLUDES
								//disarmplaybacktrack();
								//hideelement(btnplayrecording);  // (REEL) // (ELSE CLASSLIST EMPTY)

	}); // (BTNAUDIORESET)












																			// HANDLERS LISTEN
/* / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / */




																			// PLAY TEMPLATE
	btnaudiostart.addEventListener(eventtype, (e) => {
		if (ALERTS) { alert(`play audio (the template) by tapping the "speaker" button.
"tap the blue dot to open the recorder
"pull" the blue dot to #TBD# "scrub" the audio`); }

		if (DEBUG_EVENTS) {
			console.log('\t\t\t\tBTN "START(PLAY)TEMPLATE" (AUDIO)');
		}

		if (DEBUG_RECPLAY) {
			console.log("(HANDLER AUDIOSTART)");
			console.log(`PLAYED\tRECLOCK\tLIVE\tBLOB`);
			console.log(`${AUDIOTEMPLATEPLAYED}\t${RECORDINGLOCKED}\t${LIVERECORDING}\t${AUDIOBLOBPENDING}`);
		}

		if (!LIVERECORDING) {
// ––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––	
/* IF ... HAS ENDED ...
			AUDIOTEMPLATEPLAYED = true; // ##WATCH ITEM##
*/
			if (AUDIOTEMPLATEPLAYED && !RECORDINGLOCKED) {
				console.log('\t- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -');	
				console.log('\t(BTNAUDIOSTART) SPEAKVIEW(OPEN) "AUTOMATIC FOR THE PEOPLE!"');			
				speakview(OPEN);
			}
// ––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––	

			console.log(`(BUTTON AUDIOSTART)"${SELECTED}"`);

							// ##TBD## ADD "AUDIO ENDED" FOR FIRST PLAY // THEN ACTIVATE RECORDING
			playAudioPhonetic(SELECTED); // ##WATCH ITEM##
																			// AUDIOPLAYER #TBD#
																			// (TIME-TO-POSITION)
			audiotemplatetrack.style.width = "25%";



		} // (NOT LIVERECORDING)

	}); // (HANDLER AUDIOSTART)








													// MUST BE VISIBLE (NOMINAL) *ONLY* WHILE PLAYING
 																		  // STOP TEMPLATE
	btnaudiostop.addEventListener(eventtype, (e) => {
		if (ALERTS) { alert("stop audio (the template)"); }
		if (DEBUG_EVENTS) {
			console.log('\t\t\t\tBTN "STOP(PLAY)TEMPLATE" (AUDIO)');
		}

		if (DEBUG_RECPLAY) {
			console.log("SET AUDIOTEMPLATEPLAYED=TRUE AFTER #PLAYENDED#\nIN TOUCH-SIM SET AFTER #SCRUBBING# TEMPLATE");
		}
		if (DEBUG_RECPLAY) {
			console.log("(BTN STOPTEMPLATE)");
			console.log(`PLAYED\tRECLOCK\tLIVE\tBLOB`);
			console.log(`${AUDIOTEMPLATEPLAYED}\t${RECORDINGLOCKED}\t${LIVERECORDING}\t${AUDIOBLOBPENDING}`);
		}

		showelement(btnaudiostart)
		hideelement(btnaudiostop);

																					// AUDIOPLAYER
		audiotemplatetrack.style.width = "25%"; // SET TIME=0

	}); // BTN AUDIOSTOP (NOMINAL)










																			// HANDLERS IN RECORDING
/* / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / */


// START RECORDING (PROMPT/MIC)
	btnstartrecording.addEventListener(eventtype, (e) => {
		if (ALERTS) { alert("start recording (speak/sound the letters)"); }
		if (DEBUG_EVENTS) {
			console.log('\t\t\t\tBTN "STARTRECORDING"');
		}

// FLAGS
		LIVERECORDING = true;
		AUDIOBLOBPENDING = false; // (SAFETY) REDUNDANT
// VIEW
		recordingview(OPEN);
		// ==> INCLUDES

		playbackview(CLOSE);
		// ##TBD## // DISARM PLAYBACKTRACK HERE
		// ==> INCLUDES

		if (DEBUG_RECPLAY) {
			console.log("(BTN STARTRECORDING)");
			console.log(`PLAYED\tRECLOCK\tLIVE\tBLOB`);
			console.log(`${AUDIOTEMPLATEPLAYED}\t${RECORDINGLOCKED}\t${LIVERECORDING}\t${AUDIOBLOBPENDING}`);
		}
	});







// STOP RECORDING (ICON "RED DOT")
	btnstoprecording.addEventListener(eventtype, (e) => {
		if (ALERTS) { alert("stop recording (of sounding the letter)"); }
		if (DEBUG_EVENTS) {
			console.log('\t\t\t\tBTN "STOPRECORDING"');
		}

// FLAGS
		LIVERECORDING = false;
		AUDIOBLOBPENDING = true; // DELETE TEMPLATE (DEFAULT==SAVE-TO-FILE)
		RECORDINGLOCKED = true;
		if (DEBUG_RECPLAY) {
			console.log("(BTN STOPRECORDING)");
			console.log(`PLAYED\tRECLOCK\tLIVE\tBLOB`);
			console.log(`${AUDIOTEMPLATEPLAYED}\t${RECORDINGLOCKED}\t${LIVERECORDING}\t${AUDIOBLOBPENDING}`);
		}
// VIEW
		playbackview(OPEN); // LINE ##1115##
		// ==> INCLUDES
					// showelement(segmentspeak);																															/**** SHOW SEGMENT SPEAK ****/
					// DISABLE RECORDING/RECORDER
								// (ATTENTION) NOT "HIDE RECORDING" BUT "HIDE RECORDER"
								// hideelement(inputlevelbar);																											// AUDIO INPUT CONNECTED
								// hideelement(btnstoprecording); // (DOT)
								// hideelement(btnstartrecording); // (MIC)
					// ENABLE PLAYBACK (INIT)
								// showelement(recscrubberbar); 																											// SET RBAR TO FULL WIDTH
								// showelement(btnplayrecording);
								// hideelement(btnstopplayrecorded); // "REEL"
// (QUIZ OVERRIDE)
		if (QUIZ_ON) {
			hideelement(btnuclc); // ##WATCH ITEM##
		}

		resetview(OPEN); // LINE ##1128##
		// ==> INCLUDES
					// showelement(btnaudioreset);
								// hideelement(blanktoggle);
								// hideelement(btnplayrecording); // "REEL"

		armplaybacktrack();

/* ######## ######## ######## ######## ######## AUDIOPLAYER ######## ######## ######## ######## */
																// AUTO-SHUTOFF AFTER MAX REC-TIME (2SEC)
																// AUTO SWITCH TO PLAYBACK
																// SET PLAYBACKTIME=0
		recscrubberbar.style.width = "25%";
	});









													 							// HANDLERS PLAYBACK
/* / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / */
// FLAGS AUDIOPLAYER PLAYBACK
	let PLAYBACK = false;
	let PLAYBACKSTOPPED = false;
	let PLAYBACKPAUSED = false; // ON SCRUBBING PLAYBACK
	let PLAYBACKENDED = false;



// START PLAYBACK (RECORDEDTRACK)
	btnplayrecording.addEventListener(eventtype, (e) => {

		if (ALERTS) { alert(`play your recording by tapping the "tape" icon.
"pull" the green dot to #TBD# scrub the recording`); }

		if (DEBUG_EVENTS) {
			console.log('\t\t\t\tBTN "STARTPLAY(BACK)RECORDED"');
		}

		if (DEBUG_RECPLAY) {
			console.log("(BTN STARTPLAY(BACK)RECORDED)");
			console.log(`PLAYED\tRECLOCK\tLIVE\tBLOB`);
			console.log(`${AUDIOTEMPLATEPLAYED}\t${RECORDINGLOCKED}\t${LIVERECORDING}\t${AUDIOBLOBPENDING}`);
		}

// WHY HIDE(?) // WOULD NEED TOGGLE WITH BLANK
		//hideelement(btnplayrecording);
		//showelement(btnstopplayrecorded); // (NOMINAL) ONLY SET BY #AUDIOPLAYER#

/* ######## ######## ######## ######## ######## AUDIOPLAYER ######## ######## ######## ######## */
																		// SET POSITION/WIDTH-TO-TIME
																		// PLAY UP TO END

		recscrubberbar.style.width = "25%";
	});





// STOP PLAYBACK (RECORDEDTRACK)
// ##TBD## TEMP DIS-ABLED (TO BE SET BY AUDIOPLAYER ONLY)
/*
	btnstopplayrecorded.addEventListener(eventtype, (e) => {
		if (ALERTS) { alert("stop tape (your recording)"); }
		if (DEBUG_EVENTS) {
			console.log("(\t\t\t\tBTN STOPPLAY(BACK)RECORDED");
		}

		if (DEBUG_RECPLAY) {
			console.log("(BTN STOPPLAY(BACK)RECORDED)");
			console.log(`PLAYED\tRECLOCK\tLIVE\tBLOB`);
			console.log(`${AUDIOTEMPLATEPLAYED}\t${RECORDINGLOCKED}\t${LIVERECORDING}\t${AUDIOBLOBPENDING}`);
		}
																						// AUDIOPLAYER
																			// ON PLAYENDED SET TIME=0
																			// ##TBD## SET POSITION ==100%(?)
		showelement(btnplayrecording);
		hideelement(btnstopplayrecorded); // (NOMINAL) ONLY SET BY AUDIOPLAYER
	});
*/








export { cleardrawing };

