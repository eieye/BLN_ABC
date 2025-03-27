/* BLN ABC 0.9 (beta) A Primer for basic literacy development | Ein "Vorkurs" zur Alphabetisierung in Deutsch als Zweitsprache
 * Copyright (C) 2025 Jens Kreitmeyer <self@jenskreitmeyer.de>
 * This file is part of BLN ABC
 * (for the full length copyright notice see the HTML index file and "COPYING.txt")
 */

if (DEBUG_PIPE) {
	console.log('##MODULE## "ANIMATION_KARAOKEDOT" PART OF BLN ABC "STRESSTEST#04" (QUIZ) // 27-MAR-25');
}




import { ANIM_LUT, PAUSES, SPEED } from "./sample_animationLUT.js";


let k = 0;
let lastk;
let newk;
let n = 0;
let i = 0;
let WAIT = 0;
window.timeoutID = undefined; // ##WATCH ITEM##



															// ANIMATE DOT ("KARAOKE")

// GET-A-DOT (THE "SPRITE")
const animdot = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
animdot.setAttribute('cx', 0);
animdot.setAttribute('cy', 0);
animdot.setAttribute('r', 50);


	function animateDot() { // LINE ##270##

		if (k < Object.entries(ANIM_LUT).length) { // STROKES
			if (i < Object.entries(ANIM_LUT[k]).length) { // CURVES
				if (n < Object.entries(ANIM_LUT[k][i]).length) { // POINTS
					newk = k;
													// (##TBD## CANCEL ANIMATION IF A NEW ONE IS 
													// STARTED WHILE THE OLD ONE IS STILL RUNNING)
					if (lastk !== newk) {
						//console.log("LASTK", lastk, "NEWK", newk);
						WAIT = PAUSES[k][0];
						//console.log(`______WAIT ${WAIT}______`);
						// ADJUST PAUSES TO SPEED
						//WAIT = parseInt(WAIT / (75 / SPEED)); 																								// ##MAGIC NUMBER## ADJUST TO DEVICE
						//WAIT = parseInt(WAIT / SPEED);
						WAIT = parseInt(WAIT);
						//console.log(`______SPEED ${SPEED}______`);
						//console.log(`______WAIT/SPEED ${WAIT}______`);

// [NOTE] INSERT WAS HERE
//const lentrail = 3;
//comet = new Comet(lentrail, ANIM_LUT[k]);

	 				} else {
	 					WAIT = 0;
	 				}
					lastk = newk;

																		// LOG ANIM_LUT
					//console.log(`ANIM_LUT ${k} ${i} ${n}`, ANIM_LUT[k][i][n]);
					//console.log(`ANIM_LUT ${k} ${i} ${n}`, ANIM_LUT[k][i][n].x);
					//console.log(`ANIM_LUT ${k} ${i} ${n}`, ANIM_LUT[k][i][n].y);



// –––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
																			// MOVE "KARAOKE"-DOT

						specialfx.append(animdot); // OK (REPEAT "APPEND" FEELS FISHY)
						let x = ANIM_LUT[k][i][n].x;
						let y = ANIM_LUT[k][i][n].y;
						animdot.setAttribute('cx', `${x}`);
						animdot.setAttribute('cy', `${y}`);


// –––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
// [NOTE] INSERT WAS HERE // comet.render(i, n);
					n++;

				} else { i++; n = 0; } // N

			} else { k++; i = 0; } // I
			const TIMEOUT = SPEED + parseFloat(WAIT);
													/* (THE ANIMATION THAT WON'T DIE) */
													/* ##NEXT GEN## REBUILD WITH RAF */
			timeoutID = setTimeout(animateDot, TIMEOUT); // ##WATCH ITEM##															// #####LOOP#####

			//console.log(SPEED, typeof SPEED);	
			//console.log(WAIT, typeof WAIT);	
			//console.log(TIMEOUT, typeof TIMEOUT);
			//console.log("(ANIMATION KARAOKEDOT) TIMEOUT ID", timeoutID); // (ONE OF MANY)

		} else { 
			k = 0; 
			lastk = undefined; // K // RESET FOR NEXT SELECTION OR REPEAT
			//console.log(`(END) k${k}, i${i}, n${n}`);
			//console.log("(ANIMATE_DOT) LUT", ANIM_LUT); // ##WATCH ITEM##

// KILL KARAOKE-DOT (LAST POINT STANDING)
			DOM.specialfx.replaceChildren("");


		 } // K // RESET FOR NEXT SELECTION OR REPEAT

	} // ANIMATE_DOT






export { animateDot };




