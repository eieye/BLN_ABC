/* BLN ABC 0.9 (beta) A Primer for basic literacy development | Ein "Vorkurs" zur Alphabetisierung in Deutsch als Zweitsprache
 * Copyright (C) 2025 Jens Kreitmeyer <self@jenskreitmeyer.de>
 * This file is part of BLN ABC
 * (for the full length copyright notice see the HTML index file and "COPYING.txt")
 */

if (DEBUG_PIPE) {
	console.log('##MODULE## "ANIMATION_COMETOBJ_STRING" PART OF BLN ABC "STRESSTEST#04" (QUIZ) // 27-MAR-25');
}

				// ##MEMO## SWITCH BETWEEN ANAIMATION "COMET" AND "DOT" @LINE ##605## IN "QUIZ"-BTN
console.log('––––––––––––––––––––– THIS VERSION "STRING-OF-OBJECTS" ##UNFINISHED## –––––––––––––––––––––');
console.log('––––––––––––––––– SET ANIMATION IMPORT @LINE ##53## IN "HANDLERS_BUTTONS" –––––––––––––––––');




import { ANIM_LUT, PAUSES, SPEED } from "./sample_animationLUT.js";





			// ##TBD## IDENTICAL IN "ANIMATION_LUT_GRAPH_DOT"
			// SET TO LOCAL VARS "LET"
// let k = 0;
// let lastk;
// let newk;
// let i = 0;
// let n = 0;

let WAIT = 0; // READ FROM "PAUSES"
let TIMEOUT = 20; 																																								// #TBD# FROM SETTING
let dimmer = 10; // (OR "1 / NUM TRAIL PTS") 																											// (SETTING/CONFIG)
let cometPointString = new Array();
let len; // TOTAL POINTS IN PATH
let counter;

	



																				// CLASS COMET_POINT
	class CometPoint {

		constructor(pt, num) {
			//this.num = num;
			this.x = parseFloat(pt.x).toFixed(2);
			this.y = parseFloat(pt.y).toFixed(2);
			this.age = 1; 																																							// OPACITY // ALWAYS INIT=1
			this.fade = 1 / dimmer; 																																		// EQUIVALENT NUM OF POINTS IN COMET_TRAIL
			this.id = num + "*";
		}

		render() {
			let cpt = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
			cpt.setAttribute('id', this.id);
			cpt.setAttribute('cx', this.x);
			cpt.setAttribute('cy', this.y);
			cpt.setAttribute('class', 'cometpt');
			cpt.setAttribute('opacity', this.age);
			DOM.specialfx.append(cpt);	
		}

		dim() {
			if (this.age > 0) {
				this.age -= this.fade;
			} else {
				this.age = 0;
			}
			//console.log(this);
			document.getElementById(this.id).setAttribute('opacity', this.age);
			//this.setAttribute('opacity', this.age);
		}

	} // CLASS








																					// ANIMATE_COMET
	function animateComet() {

		let num = 0;
		cometPointString = [];

//console.log("----------ANIM_LUT KIN----------", ANIM_LUT[k][i][n]);
//console.log("----------PAUSES----------", PAUSES);
//console.log("----------SPEED----------", SPEED);																								// #TBD# SETTINGS




		for (let k = 0; k < Object.entries(ANIM_LUT).length; k++) { // STROKES
			for (let i = 0; i < Object.entries(ANIM_LUT[k]).length; i++) { // CURVES
				for (let n = 0; n < Object.entries(ANIM_LUT[k][i]).length; n++) { // POINTS

/*
					newk = k;
													// INSERT PAUSE AFTER/BEFORE (?!?) EACH STROKE
					if (lastk !== newk) {
						WAIT = PAUSES[k][0];
						WAIT = parseInt(WAIT);
						// (REMOVED WITH INTEGRATION) //LOG.speed.innerHTML = `${SPEED}`;
						// (REMOVED WITH INTEGRATION) //LOG.wait.innerHTML = `${WAIT}`;
	 				} else {
	 					WAIT = 0;
	 				}
					lastk = newk;
					//TIMEOUT = SPEED + parseFloat(WAIT);
*/

// FOR ALL POINTS IN LUT
					//if (ANIM_LUT[k][i][n]) { // (ENTRY FOR N STILL EXISTS)
						// ADD NEXT POINT
						let cpt = new CometPoint(ANIM_LUT[k][i][n], num); 																	// STROKE/CURVE_SEGMENT/POINT/ID*
						cometPointString.push(cpt);
						num ++;
					//}
				}
			}
		}
/*
					n++; // NEXT POINT

				} else { 
					i++; // NEXT CURVE
					n = 0;
				} // N=0

			} else { 
				k++; // NEXT STROKE
				i = 0;

			} // I=0

		} else { // (NO MORE STROKE) // END OF LUT

			k = 0;
			lastk = undefined; // K // RESET FOR NEXT (GLYPH)SELECTION OR (ANIMATION)REPEAT

			// LOGGING
			// (REMOVED WITH INTEGRATION) //LOG.speed.classList.add("off"); // CLASSLIST_REMOVE IN HANDLER "ANIM/SPELL"
			// (REMOVED WITH INTEGRATION) //LOG.wait.classList.add("off");

		} // K=0

*/

		console.log("COMET_POINT_STRING", cometPointString);
		len = cometPointString.length;
		counter = 0;
		animate();


	} // ANIMATE_COMET











// = = = = = = = = = = = = = = = = = =  LOOP  = = = = = = = = = = = = = = = = = = = = = =
	function animate() {
	console.log("=======LEN COUNTER=======", len, counter);

 		if (counter < len) {
			if (cometPointString[len - 1].age > 0) {
				cometPointString[counter].render();
				cometPointString[counter].dim();
			} else {
				// LAST POINT FADED OUT
				console.log(cometPointString[len - 1], counter, len)
			}

			//console.log("LEN COUNT", len, counter);

			console.log("(RUNNING ${counter})");
			//console.log(`POINT ${counter}`, cometPointString[counter]);

			counter++;
			setTimeout(animate, TIMEOUT);
		}

// = = = = = = = = = = = = = = = = = =  END LOOP  = = = = = = = = = = = = = = = = = = = = = =

} // ANIMATE







																					// EXPORT
export { animateComet };



