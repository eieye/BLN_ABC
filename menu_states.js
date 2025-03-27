/* BLN ABC 0.9 (beta) A Primer for basic literacy development | Ein "Vorkurs" zur Alphabetisierung in Deutsch als Zweitsprache
 * Copyright (C) 2025 Jens Kreitmeyer <self@jenskreitmeyer.de>
 * This file is part of BLN ABC
 * (for the full length copyright notice see the HTML index file and "COPYING.txt")
 */

if (DEBUG_PIPE) {
	console.log('##MODUEL## "MENU STATES" PART OF BLN ABC "STRESSTEST#04" (QUIZ) // 27-MAR-25');
}
// HANDLERS FOR MAIN MENU ITEMS AND BUTTONS TEXT DIALOG/HELP




																					// LAYERSTACK
// ––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
/*
TOUCHUIWRAPPER												 										 										 						(LAYER AND GROUP NAMES)
		RULERS
		TEMPLATE
		SAMPLES
		OUTLINES
		TRACE
		VORSCHRIFT
		SPECIALFX
		CONTROLPTS
		CRAWLER
OVERLAYSELECTLIST
		SELECTLIST
CUSTOMALERT
GUIFRAME 															 										 										 						(FORMATTING ONLY)
		NAVIGATION
				NAVIGATIONMAIN
				NAVIGATIONMORE
		MODULERECORDERPLAYER
				SEGMENTSPEAK
				SEGMENTLISTEN
				SEGMENTCONTROL 					 										 										 									(SHARED WITH NAVIGATION)
		//END
*/




// INIT NAVIGATION																																				// WATCH/WRITE/QUIZ/STEPPER
	document.addEventListener("DOMContentLoaded", (e) => {
		console.log("(DOCUMENT) DOM_CONTENT_LOADED");
		navmainmenu.style.visibility = "visible";
		navmoremenu.style.visibility = "hidden"; 																							// (PRESERVE DIV FOR SWIPING)
	});


/* (VISIBILITY PRESERVES SPACE // NEEDS POSTION=ABSOLUTE) */
/* KEEP VALUE="HIDDEN" WHEN ATTRIBUTE="VISIBILITY" */

// TOGGLE NAVIGATION
	function menumain(state) {
		if (state) { // ON
			navmainmenu.style.visibility = "visible"; 
		} else { // OFF
			navmainmenu.style.visibility = "hidden"; 
		}
	}

	function menumore(state) {
		if (state) {
			navmoremenu.style.visibility = "visible";
		} else {
			navmoremenu.style.visibility = "hidden";
		}
	}


	let guiframe = document.getElementById('guiframe');
// NAVIGATION
	let navigation = document.getElementById('navigation');
	let navmainmenu = document.getElementById('navigationmain');
	let navmoremenu = document.getElementById('navigationmore');

	




// ============================================================================================
													// ## (SCOPING SERVICEFUNCTION MENU_STATES) ##

	function menuhomealone(state) {
		if (state) { // ON 																																						// NO ONE BUT "HOME"
			BUTTONS.btnwatch.classList.add('displaynone');
			BUTTONS.btnwrite.classList.add('displaynone');
			BUTTONS.btnmore.classList.add('displaynone');
		} else { // OFF 																																							// SHOW ALL
			BUTTONS.btnwatch.classList.remove('displaynone');
			BUTTONS.btnwrite.classList.remove('displaynone');
			BUTTONS.btnmore.classList.remove('displaynone');
		}
	}






// ##WATCH ITEM##
export { menumain, menumore, menuhomealone };







