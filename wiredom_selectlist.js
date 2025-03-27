/* BLN ABC 0.9 (beta) A Primer for basic literacy development | Ein "Vorkurs" zur Alphabetisierung in Deutsch als Zweitsprache
 * Copyright (C) 2025 Jens Kreitmeyer <self@jenskreitmeyer.de>
 * This file is part of BLN ABC
 * (for the full length copyright notice see the HTML index file and "COPYING.txt")
 */

if (DEBUG_PIPE) {
	console.log('##MODULE## "WIREDOM_SELECTLIST" PART OF BLN ABC "STRESSTEST#04" (QUIZ) // 27-MAR-25');
}

/* console.log(`###MEMO### IMPORTANT /!\\
	#NEXT GEN# // MOVE THE PADDING OF VAR "LABEL" WITH SPACES (TO GET "SPACED_LABEL")
	TO ONLY *INSIDE* FUNCTIONS THAT ACTUALLY USE IT
	REMOVE SPACING FROM ALL OTHER INSTANCES TO SIMPLIFY HANDLING`);
*/

// WIRE-UP ALL TRACING-LAYERS
// AT RUNTIME BUILD SELECTLIST (OPTIONITEMS) FROM COLLECTION
// AT RUNTIME CREATE FONTINFO FOR LABEL AND COMPLEMENT
// INIT VIEW TO "WRITE" WITH FIRST ITEM IN COLLECTION

/* #MEMO# FOR ALL CONVERSIONS BETWEEN SPACED/UN-SPACED USE *ONLY* LOOK-UP IN "FONTINFO"
	"SPACEDLABEL" REMAINS *INDISPENSABLE* TO PARSE ("ATOMIC") VERSION-NUMS LIKE IN 'l i n g2'
	SEARCH ##PARSING## FOR ALL RELEVANT LINES
*/

// "FONTDATA" IN WINDOW FROM SCRIPT HEADER "INDEX"
				// UNITTEST ADDED FOR "COLLECTION" = FULL ALPHABET
				// WILL OVERWRITE ANY COLLECTION DEFINED IN "INDEX.HTML"
// #TBD# PASS "FLAG" (INDEX-TO-BE-RENDERED) FROM "LAUNCHER"
// #TEMP# "MAXCOMPWIDTH" (=2096) SET IN INDEX

// #MEMO# "CLEARDRAWING" @LINE ##438## INITIALIZES VIEW TO "WRITE"
// #MEMO# "LOADITEM" IS JUST A LOCAL VARIABLE(!)
	// (GLOBALLY) USE "FONTINFO.GET('LABEL').SPACEDLABEL" TO GET (PARSED AND SPACED) ARGUMENT
	// FOR "RENDER_TEMPLATE" AND "RENDER_MINIPREVIEW"

// #MEMO# FOR "LOWERCASE-ONLY" GRAPHEMES
	// EXCLUSIVELY USE EXECEPTIONS-LIST IN SCRIPT "LETTERCASE_COMPLEMENT" (@LINE ##20##)




import { GraphemeInfo } from './modules/conversion_ascii.js';
import { renderTemplate } from './modules/render_template.js';
import { formatMinipreview } from './modules/build_minipreview.js';

import { addTouchHandlers } from './modules/handlers_crawler.js'; // , addPoint, openLineTag
import { recorderplayer, controlview } from './modules/recplay_views.js'; // , showelement, hideelement
import { menuhomealone } from './menu_states.js';
import { cleardrawing } from './modules/handlers_buttons.js';

							// SPLIT SPEAK/SPELL TO TWO AUDIO-PLAYERS (WITH DIFFERENT SOURCE FILEPATH)
import { playAudioSelector } from './playaudio_selector.js';

// PARSING
import { ltrcaseComplement } from './ltrcase_complement.js';
import { parseVersion } from './parse_ltrversion.js';






 														// PARAMETERS SPECS (LOGGING IN WINDOW ONLY)
window.DIM = {}; // DIMENSIONS
DIM.vieww = visualViewport.width;
DIM.viewh = visualViewport.height;
DIM.clientw = touchUIwrapper.clientWidth;
DIM.clienth = touchUIwrapper.clientHeight;
DIM.availw = screen.availWidth;
DIM.availh = screen.availHeight;
DIM.screenw = screen.width;
DIM.screenh = screen.height;





																				 		// GLOBALS
// (NEEDED) IN WINDOW SCOPE (OK FROM MODULE/MAIN)
window.DOM = {}; 																																									// (ACCESSIBLE W/O PREFIX "WINDOW")

// IN MODULE SCOPE
var SELECTLIST = {}; // AVAILABLE GRAPHEMES



FONTDATA ? console.log("\t\t\t\t\tFONTDATA . . . IN MAIN OK") : console.log("\t\t\t\t\tFONTDATA . . . IN MAIN FAILED");






// ============================================================================================
// ============================================================================================
																				// WIRE LAYERS

// BODY
// (LITE/DARK MODE)
	DOM.bodyelement = document.getElementsByTagName("body")[0];

// WRAPPER
	DOM.touchUIwrapper = document.getElementById("touchUIwrapper");
	addTouchHandlers(touchUIwrapper);

// RULERS
	DOM.rulerslayer = document.getElementById("rulerslayer"); 										// ATTRIBUTE "VIEWBOX"
	DOM.rulers= document.getElementById("rulers"); // GROUP
// TYPEBOX
	DOM.typebox = document.getElementById("typebox"); // GROUP
// TEMPLATE
	DOM.templatelayer = document.getElementById("templatelayer");									// ATTRIBUTE "VIEWBOX"
// PATH-ELEMENT
	DOM.template_pathdata = document.getElementById("template_pathdata");					// ATTRIBUTE "D"
// SAMPLES (VISUAL INSPECTION OF POINTS AT INTERPOL-STEPS)
	DOM.sampleslayer = document.getElementById("sampleslayer");										// ATTRIBUTE "VIEWBOX"
	DOM.samples = document.getElementById("samples"); // GROUP
// OUTLINES (VISUAL INSPECTION OF CRAWL_ELEMS)
	DOM.outlineslayer = document.getElementById("outlineslayer");									// ATTRIBUTE "VIEWBOX"
	DOM.outlines = document.getElementById("outlines"); // GROUP
// TRACE
	DOM.tracelayer = document.getElementById("tracelayer");												// /!\ (DEVICE)VW /!\ (DEVICE)VH
	DOM.trace = document.getElementById("trace"); //GROUP
// CRAWLER (EL-FROM-POINT)
	DOM.crawlerlayer = document.getElementById("crawlerlayer");										// ATTRIBUTE "VIEWBOX"
	DOM.crawler = document.getElementById("crawler"); // GROUP
// ANIMATION
	DOM.vorschriftlayer = document.getElementById("vorschriftlayer");							// ATTRIBUTE "VIEWBOX"
	DOM.vorschrift = document.getElementById("vorschrift"); // GROUP
// BEZIER CONTROLPOINTS
	DOM.controlptslayer = document.getElementById("controlptslayer");							// ATTRIBUTE "VIEWBOX"
	DOM.controlpts = document.getElementById("controlpts"); // GROUP
// COMET (SPECIALFX)
	DOM.specialfxlayer = document.getElementById("specialfxlayer");								// ATTRIBUTE "VIEWBOX"
	DOM.specialfx = document.getElementById("specialfx"); // GROUP


			// OVERLAY SELECTLIST
	DOM.overlayselectlist = document.getElementById("overlayselectlist");					// UI-PROXY FOR SWIPER
			// SELECTLIST // ID=SELECTLIST CLASS=OPTIONLIST
	DOM.selectlist = document.getElementById("selectlist");												// ITEMS IN "COLLECTION"
			// LISTITEM // ID=<LTR> CLASS="OPTION" 																		// RENDERED FOR ITEMS

//##MEMO## 
//WHEN ADDING NEW LAYERS ALSO DEFINE ID-CLASS "#" IN CSS-STYLESHEET












// ## UNITTEST ##
// LOAD FULL ALPHABET FROM JSON
// ============================================================================================
// ============================================================================================

									// (!)THIS WILL OVERWRITE ANY COLLECTION DEFINED IN INDEX.HTML
															// ##TBD## INTERFACE WITH "LAUNCHER"
// WHEN A SINGLE "LABEL"(KEY) (CHAR OR MTBG) IS PASSED FROM "KEYBOARD" 
// LOAD THE COLLECTION IT IS PART OF AND RENDER TEMPLATE FOR THE TAPPED KEY
// --FOR ANY SINGLE CHAR THE COLLECTION IS "FULL ALPHABET"
// --FOR ANY MTBG THE COLLECTION IS THE MENU-GROUP IT IS PART OF

if (FULLALPHA) {
	COLLECTION = ""; // LINE ##145## (FOR INDEX.HTML)
		for (const [key, value] of Object.entries(FONTDATA)) {
 	 	//console.log(`${key}: ${value}`);
 		 COLLECTION += `${key}, `;
		}
		COLLECTION = COLLECTION.slice(0, -2); // ##TBD## TRIM LAST "COMMA WORDSPACE"
		//console.log("COLLECTION", COLLECTION);
}









//  SELECTLIST#OVERLAY#
// ============================================================================================
// ============================================================================================

// HANDLER "CANCEL" (ANY CLICK OFF LISTITEM)
	DOM.overlayselectlist.addEventListener("pointerup", (e) => {
// CHANGED FROM "CLICK TO "POINTERUP" 20250225
// FIREFOX DESKTOP (NO-TOUCHSIM) WILL CLOSE OVERLAY ON END SCROLLING
// "CLICK" OK FOR CHROME DESKTOP
// "POINTERUP" OK MOBILE DESKTOP ONLY WITH RESPONSIVE-MODE

		DOM.overlayselectlist.classList.add('displaynone');
// SHOW FULL MENU
		menuhomealone(false);
// RESURFACE RECPLAY CNTROL BTN
		recorderplayer(OPEN);
		controlview(CLOSE);
	}, false);

																		// BUILD SELECTLIST
	//console.log("COLLECTION", COLLECTION);
	buildSelectlist(COLLECTION); // LINE ##182##
	//console.log("COLLECTION FIRST IN", COLLECTION[0]);









// MAP LOADED/SELECTED COLLECTION (FROM INDEX/LAUNCHER)
// AT #RUNTIME# TO "SELECTLIST" AND "FONTINFO"

// BUILD SELECT#LIST# FOR SELECTLIST#OVERLAY#
			// (PROXIE SWIPER SLIDES/LAUNCHER FILTER)
// ============================================================================================

function buildSelectlist(COLLECTION) {

// COMMA-SEPARATED #STRING#
	console.log("COLLECTION", COLLECTION); 																													

// REMOVE SPACES (FOR SAFETY IN CASE ANY ARE MISSING)
	COLLECTION = COLLECTION.replaceAll(" ", "");
// SPLIT TO ARRAY
	let COLLECTION_LABELS = COLLECTION.split(",");
// (UNUSED)
	console.log("COLLECTION LENGTH", COLLECTION_LABELS.length); 																	

	let COLLECTION_SPACEDLABELS = [];



// –––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
 													
// WYSIWYG "LABEL" IS *LETTERING* ON KEYBOARD-BTN AND *NAME* IN COLLECTION AND *KEY* IN FONTDATA
 									// "LABEL" IS TYPE STRING FOR SINGLE ("S") OR MTBG ("Sch")
									// PARSE/CRISPR "LABEL" TO "(WORD)SPACEDLABEL" FOR PROCESSING
									// /!\ ALSO PARSE "STYLISTIC VARIANTS" W/O BREAKING CHARNUM-CODE ("g2" NOT "g 2")

	COLLECTION_LABELS.forEach((label) => {
		let spacedlabel = "";

// MTBG *OR* SINGLE WITH VERSION-NUM
		if (label.length > 1) {
						// CRISPR THE STRING AND CATCH VERSION-NUM (IF ANY)
			spacedlabel = parseVersion(label); // LINE ##251##
		} else {
						// IS A SINGLE CHAR WITHOUT VERSION NUMBER
			spacedlabel = label;
		}

									// (VERIFY CORRECT SPACING-FORMAT FOR PROPERTY "SPACELABEL"
// //console.log(`––––––––– (BUILD SELECTLIST) SPACEDLABEL ${spacedlabel} LABEL ${label}–––––––––`);

// ADD (WORD)SPACED STRING TO "LIVE" RENDER-ABLE LIST (FOR SELECTLISTITEMS)
// *ONLY* WORDSPACED MTBG-LABEL CAN BE PARSED (TO ARRAY "KEYCHARS") FOR RENDERING
		COLLECTION_SPACEDLABELS.push(spacedlabel);


// PARSING
// CREATE NEW "GRAPHEME_INFO" OBJECT IN MAP "FONTINFO"
// WITH FIELDS "LABEL" AND "SPACEDLABEL"
// (MAP-KEY IS (UNSPACED) LABEL)
		FONTINFO.set(label, new GraphemeInfo(label, spacedlabel)); // LINE ##272##

// PARSING
// CREATE NEW FONTINFO PROPERTY "COMPLEMENT" IN MAP "FONTINFO"
//console.log("(RETURN) SPACEDLABEL", spacedlabel, " COMPLEMENT", ltrcaseComplement(spacedlabel)); // OK (250221 2249)
		FONTINFO.get(label).complement = ltrcaseComplement(FONTINFO.get(label).spacedlabel);

	}); // FOR EACH (IN COLLECTION_LABELS)







														// #TEMP# ABBREVIATE FONTINFO.INFO 																		// NEXT GEN SUPPLEMENTARY
														// ##########TBD#######
														// MERGE WITH SUFFIX-INFO SPEAK/SPELL
// #SELECTLIST# MUST USE #(WORD)SPACED# LABELS ON MAP = "GET(OBJ).SPACED_LABEL"
// –––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
	COLLECTION_LABELS.forEach( (label) => { 

		let info = FONTINFO.get(label).info;
		let shortinfo = info.slice(0, 14) + (info.length > 13 ? "..." : "");

		SELECTLIST[label] = FONTINFO.get(label).spacedlabel; // + shortinfo; // LABEL=OBJ-PROPERTY-KEY
	});

	console.log("\t\t\t\t\tSELECTLIST", SELECTLIST);
	// SELECTLIST IS OBJECT WITH ENTRIES-FORMAT (KEY) "LABEL": (VALUE) "(WORD)SPACEDLABEL"


															// WRITE HTML "OPTIONS" IN "SELECT"(LIST)
																		// #PROXIE# SWIPER-SLIDES


// CREATE LISTITEMS (OPTIONS) IN SELECTLIST
// ADD LISTENER ON EACH

	DOM.selectlist.replaceChildren(''); 																														// CLEAR
// ––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
	for (const [label, value] of Object.entries(SELECTLIST)) {

		let optionel = document.createElement("div");																									// ALL ITEMS IN "SELECTLIST"
		optionel.setAttribute("class", "option");
		optionel.setAttribute("id", `${value}`); 																											// SPACEDLABEL
		//console.log("_____HTML ELEM SPACEDLABEL_____", spacedlabel); 																						



														// EVENT LISTENER ON OPTIONS // LINE ##248##
// LISTENER #CAN# ACCESS "FONTDATA" FROM WITHIN HTML
// BECAUSE IT CALLS THIS FUNCTION (HERE) THAT IS IN THE SAME SCOPE AS DATA


// LISTENER ON LISTITEM (GRAPHEME)
// ––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––

		optionel.addEventListener('pointerup', (e) => {
			e.preventDefault();

			if (DEBUG_EVENTS) {
				console.log("\t\t\t\t(LISTENER SELECTLISTITEM) GLOBAL EVENTTYPE", eventtype); // LINE ##224##
				console.log(`\t\t\t\t(LISTENER SELECTLISTITEM) EVENT ${e.type} TARGET ${e.target.id}`);
			}
			let loaditem = e.target.id; 																																// WORDSPACED STRING (ESSENTIAL FOR MTBG)
			SELECTED = label;																																						// (UN-SPACED) LABEL

// (TOGGLE LTRCASE FOR BTNUCLC)
		let initltr = SELECTED[0];
		if (initltr.toUpperCase() === SELECTED[0]) {
			LTRCASE = "upper";
		} else {
			LTRCASE = "lower";
		}

// PRE-RENDER GLYPHPREVIEW BTNUCLC
			formatMinipreview(label, FONTINFO.get(label).complement); // ARG UN-SPACED/SPACED						// LINE ##342##

// RENDER NEW TEMPLATE
			renderTemplate(loaditem); // (WORD)SPACED STRING																						// LINE ##341##

		if (DEBUG_PIPE) {
			console.log(`\t(LISTENER SELECTLISTITEM) LOADITEM=="${loaditem}" (==ID "${e.target.id}") SELECTED=="${SELECTED}"`);
		}
// (CALL TO SET STARTPOINT AND FIRST CEL TO VISIBLE)
			cleardrawing();			

// PLAY AUDIO FOR LISTITEM
// ("PLAYAUDIO" CALLS "PARSE_AUDIO SELECTLIST" TO RETURN SPEAK/SPELL FORMATTING)
			playAudioSelector(SELECTED);


// CLOSE SELF
			DOM.overlayselectlist.classList.add('displaynone'); // ##WATCH ITEM##
// SHOW FULL MENU
			menuhomealone(false);

// RESURFACE RECPLAY CONTAINER
			recorderplayer(OPEN); // ##WATCH ITEM##
			controlview(CLOSE); // IS INCLUDED

		});

// ––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
// END LISTENER LISTITEM





		optionel.innerHTML = `${value}`; // (OBJ VALUE)
		DOM.selectlist.append(optionel);																															// APPEND LISTITEM

	} // FOR (ENTRIES SELECTLIST)



}
// ============================================================================================
 // END "BUILD SELECTLIST"












// LOAD INITIAL ITEM TO "WRITE"
// ##TEMP## OF ANY "COLLECTION" RENDER FIRST ENTRY
// ==============================================================================================

FONTDATA ? console.log("\t\t\t\t\tFONTDATA . . . IN INIT OK") : console.log("\t\t\t\t\tFONTDATA . . . IN INIT FAILED");
	if (FONTDATA) {


// RENDER DEFAULT IN COLLECTION = FIRST 
// RENDER DEFAULT IN FULL ALPHABET = INDEX (OF spacedlabel-TAP) 
		SELECTED = COLLECTION.split(", ")[0]; // (MUST BE 0 FOR COLLECTIONS OF 1)

		//let inititem = parseVersion(SELECTED); // RETURNS "SPACEDLABEL" // LINE ##423##
		//console.log(`(LOAD INIT) RENDER ARGS = "SELECTED" ${SELECTED} "INITITEM" ${inititem}`);

// PARSING
// UN-SPACED/SPACED
		formatMinipreview(SELECTED, FONTINFO.get(SELECTED).complement);

// PARSING
// SPACEDLABEL FOR RENDERING
// USE LOOK-UP FONTNFO
		renderTemplate(FONTINFO.get(SELECTED).spacedlabel);


// INIT VIEW
		recorderplayer(OPEN); // (SHOW BOTTOM NAVIGATION)
		controlview(CLOSE);// (INITIALLY SHOW "BTNUCLC" AND "BTNOPENRECPLAY")
// #TBD# (FROM LAUNCHER)
		cleardrawing(); // LINE ##438##

	} else {
		console.log('(LOAD INIT) FONTDATA NOT AVAILABLE<br>(MSG) RELOAD OR CLICK "NEW LTR"');
// /!\ ABSOLUTE NO-NO
		//window.location.reload(); // ####### VERYVERYVERY UGLY//DON'T USE ########
	}









