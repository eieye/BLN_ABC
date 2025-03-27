/* BLN ABC 0.9 (beta) A Primer for basic literacy development | Ein "Vorkurs" zur Alphabetisierung in Deutsch als Zweitsprache
 * Copyright (C) 2025 Jens Kreitmeyer <self@jenskreitmeyer.de>
 * This file is part of BLN ABC
 * (for the full length copyright notice see the HTML index file and "COPYING.txt")
 */

if (DEBUG_PIPE) {
	console.log('##MODULE## "ANIMATION_VORSCHRIFT" PART OF BLN ABC "STRESSTEST#04" (QUIZ) // 27-MAR-25');
}
// INCLUDES "RENDER AIRLINES" TO DEBUG PAUSES FOR #ALL# ANIMATION MODES
// ##MEMO## SWITCH BETWEEN ANIMATION "COMET" AND "DOT" @LINE ##730## IN "QUIZ"-BTN


// PIPELINE
// STORE ANIMATION_LUT #STROKEWISE# (SEPARATED BY "M")
// INSERT VALUES "PAUSE" RETURNED BY SUB-ROUTINE
// ##MEMO## FIRST PAUSE (ORIGIN-TO-START) SEEMS TO GET SKIPPED



import { ANIM_LUT, PAUSES, SPEED } from "./sample_animationLUT.js";


let k = 0;
let lastk;
let newk;
let n = 0;
let i = 0;
let WAIT = 0;

																		// PLAY ANIMATION_FRAMES
																		// ANIMATE_GLYPH (STROKES)
// = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =

	function animateGlyph() {

		if (k < Object.entries(ANIM_LUT).length) { // STROKES
			//console.log(`k${k}`);

			if (i < Object.entries(ANIM_LUT[k]).length) { // CURVES
				//console.log(`i${i}`);

				if (n < Object.entries(ANIM_LUT[k][i]).length) { // POINTS
					//console.log(`k${k}, i${i}, n${n}`);
					newk = k;
																// LINE ##216## ADD CHECK FOR ABORTIVE ANIMATION CALL
																// IE FOR FIRST STROKE DONT ADD ONE IF IT'S ALREADY THERE ...
					if (lastk !== newk) {
						//console.log("LASTK", lastk, "NEWK", newk);
						WAIT = PAUSES[k][0];
						//console.log(`______WAIT ${WAIT}______`);

						// ADJUST PAUSES TO SPEED
// ##MAGIC NUMBER## ADJUST TO DEVICE
						//WAIT = parseInt(WAIT / (75 / SPEED));
						//WAIT = parseInt(WAIT / SPEED);
						WAIT = parseInt(WAIT);
						
						//console.log(`______SPEED ${SPEED}______`);
						//console.log(`______WAIT/SPEED ${WAIT}______`);

												// ##TEMP## // POLYLINE REPLACED WITH "KARAOKE"-DOT
// –––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
						// START FIRST STROKE // POLYLINE
						const animpath = document.createElementNS('http://www.w3.org/2000/svg', 'polyline');
						// (CLASS IS ALSO IN GROUP // USE TO OVERWRITE/CHANGE COLOR)
						animpath.setAttribute('class', 'vorschrift');
						animpath.setAttribute('id', `${SELECTED}${k}`); 																			// (DEBUGGING READABILITY ONLY)
						vorschrift.append(animpath); // .children[0] // DOM.
// –––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––

// [NOTE] INSERT WAS HERE
//const lentrail = 3;
//comet = new Comet(lentrail, ANIM_LUT[k]);

	 				} else {
	 					WAIT = 0;
	 				}
					lastk = newk;

					//console.log(`ANIM_LUT ${k} ${i} ${n}`, ANIM_LUT[k][i][n]);
					//console.log(`ANIM_LUT ${k} ${i} ${n}`, ANIM_LUT[k][i][n].x);
					//console.log(`ANIM_LUT ${k} ${i} ${n}`, ANIM_LUT[k][i][n].y);
// –––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
																	// ADD POINTS TO POLYLINE
					if (DOM.vorschrift.lastElementChild) {
						const animpt = vorschriftlayer.createSVGPoint();
						animpt.x = ANIM_LUT[k][i][n].x;
						animpt.y = ANIM_LUT[k][i][n].y;
						DOM.vorschrift.lastChild.points.appendItem(animpt); // .children[0] // SVG_POINT_LIST
					} //else {
									// # # # # # # # # # # # # # # ## # # # # # # # # # # # # # #
									// ##TBD## CHECK IF POLYLINE-ELEM EXISTS IN CASE ANIMATION  
									// GOT CANCELD BY CALLING "ANIM/SPELL" AGAIN BEFORE IT ENDED 
									// ADD A "RESET"
													// (TBD) MOVE CREATE FIRST CHILD=POLYLINE TO END OF "COMPUTE_ANIM_LUT"
													// @LINE ##265## ADD CHECK FOR FIRST POLYLINE-ELEM
					//}
// –––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––

// [NOTE] INSERT WAS HERE // comet.render(i, n);
					n++;

				} else { i++; n = 0; } // N

			} else { k++; i = 0; } // I
			const TIMEOUT = SPEED + parseFloat(WAIT);
			setTimeout(animateGlyph, TIMEOUT);																													// #####LOOP#####

			//console.log(SPEED, typeof SPEED);	
			//console.log(WAIT, typeof WAIT);	
			//console.log(TIMEOUT, typeof TIMEOUT);

		} else { 
			k = 0; 
			lastk = undefined; // K // RESET FOR NEXT SELECTION OR REPEAT
			//console.log(`(ANIMATION VORSCHRIFT) END k${k}, i${i}, n${n}`);

// ##TEMP## KARAOKE-DOT
			DOM.specialfx.replaceChildren(""); // (KILL LAST POINT STANDING)

		 } // K // RESET FOR NEXT SELECTION OR REPEAT

	} // ANIMATE_GLYPH

															// ================================
															// ##TBD##
															// ADD "KILL-SWITCH" FOR ANIMATION
															// ================================




																	// ##TEMP## DEBUGGING PAUSES
// = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =

// RENDER "AIRLINES" TO GROUP "ANIMATION" IN LAYER "ANIMATIONLAYER"
	function renderAirlines() { // LINE ##465##

		//console.log("#PAUSES# LENGTH--FROM (END)--TO (START)\n", PAUSES);
												// (VISUAL INSPECTION) // RENDER "AIRLINES"
		let colors = ["red", "green", "blue", "black", "rebeccapurple"];
		let n = 0;
		vorschrift.replaceChildren(""); // (ALL "RENDER"-FUNCTION #RESET#)
		PAUSES.forEach((item) => {
			let x1 = item[1].split(', ')[0];
			let y1 = item[1].split(', ')[1];
			let x2 = item[2].split(', ')[0];
			let y2 = item[2].split(', ')[1];
			const airline = document.createElementNS('http://www.w3.org/2000/svg', 'line'); 							// NAMESPACE(!)
			airline.setAttribute('x1', `${x1}`);
			airline.setAttribute('y1', `${y1}`);
			airline.setAttribute('x2', `${x2}`);
			airline.setAttribute('y2', `${y2}`);
			airline.setAttribute('stroke-width', `${2*(n+2)}px`);
			airline.setAttribute('stroke-dasharray', `${n+1} ${5*(n+2)}`);
			airline.setAttribute('stroke', `${colors[n]}`);
			if (n < colors.length) {
				n++; }
			else {
				n = 0;
			}
			DOM.vorschrift.append(airline);
		});
	} // RENDER_AIRLINES





																						// EXPORT
// = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =
export { animateGlyph, renderAirlines };



