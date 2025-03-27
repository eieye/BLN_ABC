/* BLN ABC 0.9 (beta) A Primer for basic literacy development | Ein "Vorkurs" zur Alphabetisierung in Deutsch als Zweitsprache
 * Copyright (C) 2025 Jens Kreitmeyer <self@jenskreitmeyer.de>
 * This file is part of BLN ABC
 * (for the full length copyright notice see the HTML index file and "COPYING.txt")
 */

if (DEBUG_PIPE) {
	console.log('##MODULE## "HANDLERS CRAWLER" PART OF BLN ABC "STRESSTEST#04" (QUIZ) // 27-MAR-25');
}



import { showelement, hideelement } from './recplay_views.js';
import { playAudioUI } from '../playaudio_ui.js';


// GLOBAL
// TRACING STATE (ON/OFF TRACK)
var laststate, state;
// EXPLICIT "DOWN" ONLY FOR INCLUSION OF POINTER-EVENTS
var DOWN = false;





																					// CRAWLER SCRIPT



function addTouchHandlers(touchUIwrapper) {


																				  	// TOUCHSTART
	let handletouchstart = function(e) {
		e.preventDefault();
		let px, py;

//console.log("(e)", e);
//console.log("e.type", e.type); // OK
//console.log("E.CHANGED TOUCHES", e.changedTouches);
//console.log("E.CHANGED TOUCHES LEN", e.changedTouches.length);

// TOUCH/POINTER SWITCH // LINE ##59##
		if (e.type === "touchstart") {

			if (e.changedTouches.length === 1) {
				DOWN = true; // (ONLY FOR POINTER-EVE INCLUSION)
				if(DEBUG_PIPE) {
					console.log("(TRACING) 1F TOUCH START");
				}	
				px = e.changedTouches[0].clientX;
				py = e.changedTouches[0].clientY;

// (TOLERATE MORE THAN 2-F TOUCH AS "SWIPE"-INTENTION)
			} else if (e.changedTouches.length > 1) {
				DOWN = false; // (ONLY FOR POINTER-EV INCLUSION)
				if (DEBUG_PIPE) {
					console.log("/ / / (TRACING) 2F TOUCH START / / /");
				}
			}

		} else if (e.type === "pointerdown") {
			DOWN = true;
			if (DEBUG_PIPE) {
				console.log("(TRACING) POINTER DOWN");
			}
			px = e.clientX;
			py = e.clientY;

		} // END E-TYPE



// GET STATE FOR FIRST CONTACT
		let firstefp = document.elementFromPoint(px, py);
		//if (firstefp) { // NOT NULL // (NOT "OFF WORLD" IN IDE)
			if(firstefp.id.includes('.')) {			// "." DOT MUST BE USED ##EXCLUSIVELY## IN CEL-ID OR STARTPT
				state = 1;
				if(DEBUG_PIPE) {
					console.log("- - - -", firstefp.id, state);
				}
				//console.log("- - - - next", firstefp.nextSibling.id);

			} else {
				state = 0;
				if(DEBUG_PIPE) {
					console.log("- - - -", firstefp.id, state);
				}
				//console.log("- - - - next", firstefp.nextSibling.id);
			}
		//}

		openLineTag(state); // (OPEN LINE AS COLORED BY EFP)

// ####TEMP#### #TBD# DECIDE ADDING INITIAL PT OR NOT ON TAP LATER
// 		addPoint(px, py, state);
// 		addPoint(px + 0.1, py + 0.1, state);																	// ADD "POINT"-LENGTH POLYLINE


	} // TOUCHSTART



																					 // TOUCHMOVE
// VALIDATE POINT
	let handletouchmove = function(e) {
		e.preventDefault();

		let px, py, prevel;
		let P, C, N; // PREVIOUS / CURRENT (CEL) / NEXT
		let Pid, Cid, Nid;
		let strokenum; // LOG ONLY

// SEPARATE EVENT-TYPES
		if (e.type === "touchmove") {
// TOUCH // LINE ##133##
			if (e.changedTouches.length === 1) {
				if (DEBUG_PIPE) {
					console.log("(TRACING) 1F TOUCH MOVE", e.type);
				}
				px = e.changedTouches[0].clientX;
				py = e.changedTouches[0].clientY;
			} else if (e.changedTouches.length > 1) {
				console.log("/ / / (TRACING) 2F TOUCH MOVE / / /");
			}
// POINTER
		} else if (e.type === "pointermove") {
			if (DEBUG_PIPE) {
				console.log("(TRACING) POINTER MOVE", e.type);
			}
// 			if (DOWN) {
// 				// NOTHIING
// 			}
			px = e.clientX;
			py = e.clientY;
		}

// RUN CRAWLER-CHECK
	if (DOWN) { 																																						// (WOULD BE IMPLICIT FOR #PURE# TOUCH-VERSION)

// LOG ELEMENT-FROM-POINT
		if(DEBUG_PIPE) {
			console.log("/ / / /", document.elementFromPoint(px, py).id, state);
		}

		C = document.elementFromPoint(px, py);
		if (C) { // NOT NULL 																																	// ("OFF WORLD" ONLY IN IDE)
			Cid = Number.parseInt(C.id.split('.')[1]);																					// ID IS [STROKENUM].[CELNUM]

			if (Number.isNaN(Cid)) { 
				//console.log(px, py, "NAN", Cid, "DRAW OFF"); 																		// ("CRAWLERLAYER" OR EMPTY STRING)
				addPoint(px, py);				 																	 												// (STATE) ON TRACK = FALSE
				state = 0;
			} else {
				//console.log(px, py, "LFD NR", Cid, "DRAW ON");
				addPoint(px, py);				 																	 												// ON TRACK = TRUE
				state = 1;

// LOG STROKE-ID/ELEM-NAME
				strokenum = C.id.split('.')[0]; // (VALID NUMBER OR "IN"/"DOT")
				if(DEBUG_PIPE) {
					console.log("(TRACING) STROKENUM", strokenum);
				}
// LOG CEL-ID
				if(DEBUG_PIPE) {
					console.log("(TRACING) CEL-ID", Cid.toString());
				}
// / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / /
// CRAWLER-CHAIN
// DEFINE NEIGHBORS
				P = C.previousElementSibling;
						P ? Pid = P.id.split('.')[1] : Pid = "*";																		 // ("*" IS REDUNDANT // WAS USED TO DENOTE END-OF-STROKE)
				N = C.nextElementSibling;
						N ? Nid = N.id.split('.')[1] : Nid = "*";
				//console.log(`P ${Pid} C ${Cid} N ${Nid}`);
			}
		} else { // NULL
			if(DEBUG_PIPE) {
				console.log(px, py, "OFF WORLD");  																									// OFF SCREEN // ONLY IN IDE
			}
		}

// CRAWL
		if (C != P) { // (ONLY ONCE PER SEGMENT)
			if (P) { // HAS PREVIOUS
				P.setAttribute("visibility", "hidden");
			}
			if (N) { // HAS NEXT
				N.setAttribute("visibility", "visible");
			} else {
																	// NO NEXT // END OF CRAWLER-CHAIN
// / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / /
// GET LAST ELEMENT IN CHAIN BY DIRECT REFERENCE ("GROUND TRUTH")
				let lastElemId = crawler.lastElementChild.id; /* ###ERROR### Uncaught TypeError: crawler.lastElementChild is null */

 														// CURRENT CEL (OR DOT) IS END OF GRAPHEME
 												// (PROCEDURE ALSO CALLED FROM TAPDOT @LINE ##438##
				if (C.id === lastElemId) { // LINE ##235##

// SHOW "SAVETRACE" ICON
// SET FLAG (ALSO USED BY STATISTICS)
					TRACEFINISHED = true;  																													// (GETS RESET BY CLEAR/NEW)
					if (DEBUG_EVENTS) {
						console.log("(CRAWLER END STROKE) TRACEFINISHED", TRACEFINISHED);
					}
// AUDIO PLAY "BING"
// #TBD# VIBRATE "BUZZ"
					playAudioUI("bing_high_finished");											 												// ("BING" KNOWS NOTHING ELSE)

																		 // SAVE-OUT AND PLAY AUDIO
// / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / /
// SHOW "SAVE"-BUTTON AND ENABLE DOWNLOAD
// TBD DEFINE THIS AS "STATE" IN "RECPLAY_VIEWS"
					showelement(btnsavetrace);
					hideelement(btnaudioreset);
					hideelement(btnuclc);
					hideelement(blanktoggle);

// #TBD# AFER SAVING PLAY SPELLING-FORMAT GRAPHEME="BUCHSTABE <LTR-NAME> SAVED"
// (MTBG MUST BE SPELLED LIKE "ESS-TSE-HA")
					//playAudio_spell(SELECTED);

// #TBD# UPDATE (NUMERIC) STATISTIC IN "CLEAR"
// TIMESTAMP, OBJECT, REPETITION, FINISHED Y/N ...

				}
				// C.setAttribute("visibility", "hidden"); // ##TBD## LEAVE MARKER VISIBLE AT END OF GRAPHEME

			} // IF END STROKE
		} // END CRAWL

	} // END DOWN
} // END TOUCHMOVE






																					 // TOUCHEND

	let handletouchend = function(e) {
		e.preventDefault(); 																																// PREVENT OTHER POSSIBLE "CLICK" ACTIONS
		let px, py;

		if (e.type === "touchend") {

			if (e.changedTouches.length === 1) {
				DOWN = false; // (EXPLICIT "DOWN" ONLY FOR POINTER-E INCLUSION)
				if(DEBUG_PIPE) {
					console.log("(TRACING) 1F TOUCH END");
				}
				px = e.changedTouches[0].clientX;
				py = e.changedTouches[0].clientY;

			} else if (e.changedTouches.length > 1) {
				DOWN = false;
				console.log("/ / / (TRACING) 2-F TOUCH END / / /");
			}

		} else if (e.type === "pointerup") {
			DOWN = false;
			if(DEBUG_PIPE) {
				console.log("(TRACING) POINTER UP");
			}
			px = e.clientX;
			py = e.clientY;
		}

// GET STATE FOR LAST CONTACT
		let lastefp = document.elementFromPoint(px, py);
		if (lastefp) { 																																			// NOT NULL (NOT "OFF WORLD" IN IDE)
			if(lastefp.id.includes('.')) {							// "." DOT MUST BE USED ##EXCLUSIVELY## FOR ELEM-ID IN "STROKENUM.CELNUM"

				//console.log("END   | | | |", lastefp.id, state);
				laststate = 1;

			} else {
				//console.log("END   | | | |", lastefp.id, state);
				laststate = 0;
			}
		}


	} // TOUCHEND




									// SWITCH BETWEEN TOUCH-E AND POINTER-E // ##LINE 272##
								  // (MAY BE REMOVED FROM PRODUCTION VERSION IF MOBILE ONLY)
// / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / /

	if ("Touch" in window) {
								// "PASSIVE TRUE" === WILL NEVER CALL "PREVENT_DEFAULT"
		touchUIwrapper.addEventListener('touchstart', handletouchstart, { passive: false } );
		touchUIwrapper.addEventListener('touchmove', handletouchmove, { passive: false } );
		touchUIwrapper.addEventListener('touchend', handletouchend, { passive: false } );
		console.log("\t\t\t\t\t(CRAWLER) IS TOUCH");
// REMOVE POINTER-E (IF ANY)
		touchUIwrapper.removeEventListener('pointerdown', handletouchstart, { passive: false } );
		touchUIwrapper.removeEventListener('pointermove', handletouchmove, { passive: false } );
		touchUIwrapper.removeEventListener('pointerup', handletouchend, { passive: false } );
	} else {
		touchUIwrapper.addEventListener('pointerdown', handletouchstart, { passive: false } );
		touchUIwrapper.addEventListener('pointermove', handletouchmove, { passive: false } );
		touchUIwrapper.addEventListener('pointerup', handletouchend, { passive: false } );
		console.log("\t\t\t\t\t(CRAWLER) IS POINTER");
// REMOVE TOUCH-E (IF ANY)
		touchUIwrapper.removeEventListener('touchstart', handletouchstart, { passive: false } );
		touchUIwrapper.removeEventListener('touchmove', handletouchmove, { passive: false } );
		touchUIwrapper.removeEventListener('touchend', handletouchend, { passive: false } );
	}


} // TOUCH HANDLERS







																			  // DRAWING FUNCTIONS



																					// START NEW LINE

function openLineTag(state) {

	//console.log(`____________OPEN LINE TAG ${state}____________`);

// NEW LINE
	const newline = document.createElementNS('http://www.w3.org/2000/svg', 'polyline'); // NAMESPACE(!)
	DOM.trace.append(newline);

// STYLE ON/OFF TRACK
	if (state) {
		DOM.trace.lastChild.setAttribute('class', 'ontrack');
	} else {
		DOM.trace.lastChild.setAttribute('class', 'offtrack');
	}
} // OPEN_LINE




																// POLYLINE ADD POINTS ON/OFF TRACK

function addPoint(px, py) { //, state

// ON
		if (state === laststate) {
// NEW POINT
			let newpoint = DOM.tracelayer.createSVGPoint(); // IS SVG-ELEM // IS SVGNS
			newpoint.x = px;
			newpoint.y = py;
																				// ##CATCH ERROR##
																		// MAY BE "UNDEFINED" AFTER "CLEAR"
																		// ADD EMPTY POLYLINE IN "CLEAR"?
			DOM.trace.lastChild.points.appendItem(newpoint); // (APPENDING TO SVG_POINT_LIST) // LINE##336##

// OFF
		} else {
// START A NEW LINE AND CHANGE COLOR
			openLineTag(state); 																															// NEW LINE #ONLY# ON CHANGED STATE
			laststate = state;
		}

} // END ADD_POINT






																			 // (DOTS) TAP-HANDLER

// HANDLER "TAP_DOT" ATTACHED IN "SAMPLE_BEZIER_OBJ"
// ##MEMO## (TEST CHROME) SET EVENT TYPE TO "CLICK" "POINTERUP" OR "TOUCHEND"

	let tapDot = function(e) { // LINE ##380## 
		e.preventDefault();

if (DEBUG_PIPE) {
		console.log("(THIS)", this); 																												// (NUMBERING OF "DOTS" IS NOW REDUNDANT)
		console.log("E-TYPE", e.type);
// 		console.log("E-TARGET", e.target.id);
		console.log("E-POINTER", e.pointerType); 																						// ("POINTER_TYPE" WEIRDLY UN-KNOWN BY BROWSERS)

															// APPEND (PERSISTENT) "DOT" IN TRACE LAYER
// / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / /
		console.log("E", e);
		console.log(`______________DOT TOUCHPOINT ${e.clientX} ${e.clientY} ______________`);
}
		let tappeddot = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
																			 				// (IF "TOUCHEND"-EVENT ERROR "CX LENGTH UNDEFINED" // CHROME 116.0)
		tappeddot.setAttribute('cx', `${e.clientX}`);
		tappeddot.setAttribute('cy', `${e.clientY}`);
		tappeddot.setAttribute('r', `${parseInt(traceweight * 0.60)}px`); // (HAS UNIT) SLIGHTLY "BOLDER" THAN PROMPT
		tappeddot.setAttribute('class', 'diatrace');
		tappeddot.setAttribute('visibility', 'visible');
		DOM.trace.append(tappeddot); // (FULLY SEPARATE FROM CRAWLER)

		this.previousElementSibling.setAttribute('visibility', 'hidden'); // OUT-POINT LAST STROKE
		this.setAttribute('visibility', 'hidden'); // SELF

// SHOW NEXT ("IN" OR "DOT") IF ANY
		let N = this.nextElementSibling;
		if (N) {
			N.setAttribute('visibility', 'visible');
		} else {


															// END-OF-GLYPH // "BING" // ENABLE SAVEOUT
// LINE ##438## // SAME AS IN CRAWLER // @LINE ##235##
			this.setAttribute('visibility', 'hidden'); 																				/* !!KEEP "HIDDEN" FOR PROPERTY "VISIBILITY" */
			TRACEFINISHED = true;  																														// (IS RESET BY CLEAR)
			playAudioUI("bing_high_finished");											 													// ("BING" KNOWS NOTHING ELSE)

					if (DEBUG_EVENTS) {
						console.log("(CRAWLER DOT) TRACEFINISHED", TRACEFINISHED);
					}
// TBD DEFINE THIS AS "STATE" IN "RECPLAY_VIEWS"
					showelement(btnsavetrace);
					hideelement(btnaudioreset);
					hideelement(btnuclc);
					hideelement(blanktoggle);

		} // ELSE

	} // TAP_DOT







export { addTouchHandlers, addPoint, openLineTag, tapDot };





