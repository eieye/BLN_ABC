/* BLN ABC 0.9 (beta) A Primer for basic literacy development | Ein "Vorkurs" zur Alphabetisierung in Deutsch als Zweitsprache
 * Copyright (C) 2025 Jens Kreitmeyer <self@jenskreitmeyer.de>
 * This file is part of BLN ABC
 * (for the full length copyright notice see the HTML index file and "COPYING.txt")
 */

if (DEBUG_PIPE) {
	console.log('##MODULE## "ANIMATION_COMETOBJ_TRAIL" PART OF BLN ABC "STRESSTEST#04" (QUIZ) // 27-MAR-25');
}



import { ANIM_LUT, PAUSES, SPEED } from "./sample_animationLUT.js";

// console.log("----------ANIM_LUT----------", ANIM_LUT);
// console.log("----------PAUSES----------", PAUSES);
// console.log("----------SPEED----------", SPEED);







			// ##TBD## IDENTICAL IN "ANIMATION_LUT_GRAPH_DOT"
			// SET TO LOCAL VARS "LET"
let k = 0;
let lastk;
let newk;
let i = 0;
let n = 0;

let WAIT = 0; // READ FROM "PAUSES"
let trail; // (OBJECT INSTANCE)
let traillength = 5; 																																								// (SETTING/CONFIG)



																			// COMET_POINT
// = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =
																	 	// NEW "COMET-OBJ"

	class CometTrail {

		constructor(traillength) { // k, i, n, 
			this.traillength = traillength;
			this.trailarray = new Array();
			this.ostep = 1 / this.traillength;																												// OPACITY #DECREMENT#

			//console.log("–––––––––ANIM_LUT–––––––––", ANIM_LUT);
			let lastk = Object.entries(ANIM_LUT).length - 1;
			let lasti = Object.entries(ANIM_LUT[lastk]).length - 1;
			let lastn = Object.entries(ANIM_LUT[lastk][lasti]).length - 1;
			this.istheend = [lastk, lasti, lastn]; 											 															// (!)INDEX LAST STROKE/LAST CURVE/LAST SAMPLE
			//console.log("–––––––––THIS IS THE END–––––––––", this.istheend);
		}




		setTrailarray(k, i, n) {
			for (let num = 0; num < this.traillength; num++) {
				if (ANIM_LUT[k][i][n - num]) { 
					let point = {
						x: ANIM_LUT[k][i][n - num].x,
						y: ANIM_LUT[k][i][n - num].y,
						o: 1 - this.ostep * num																																	// PROP OPACITY
					};
					this.trailarray.push(point);
					//console.log("POINT", parseFloat(point.x).toFixed(2), parseFloat(point.y).toFixed(2), parseFloat(point.o).toFixed(2), k, i, n);
					//console.log("TRAILARRAY", this.trailarray);
				} else {
					// NOTHING // NO PT YET
					this.trailarray.push("");
				}
			} // FOR

			this.renderTrail();
			
			if (k === this.istheend[0] && i === this.istheend[1] && n === this.istheend[2]) {
				//console.log("===KIN===", k, i, n);
				//console.log("===[KIN]===", this.istheend);
				// THIS REALLY IS THE END
				//this.renderTailend();
				setTimeout(this.renderTailend(), 5000); // SPEED // <<WARUM IST DIES OHNE WIRKUNG?>>

			}

		} // SET




		renderTrail() {
			DOM.specialfx.replaceChildren("");
			//console.log("KIN", k, i, n);
			//console.log("TRAILARRAY", this.trailarray);

			for (let num = 0; num < this.trailarray.length; num++) {
				if (this.trailarray[num] !== "") {
					let point = this.trailarray[num];
					//console.log("POINT", point);
					let pointel = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
					pointel.setAttribute('cx', `${parseFloat(point.x).toFixed(2)}`);
					pointel.setAttribute('cy', `${parseFloat(point.y).toFixed(2)}`);
					pointel.setAttribute('class', 'cometpt');
					pointel.setAttribute('opacity', point.o);
					DOM.specialfx.append(pointel);
				}
			} // FOR

		} // RENDER_TRAIL




		renderTailend() {
			//let tailEnd = [];
			//DOM.specialfx.removeChild(DOM.specialfx.firstChild);
			//console.log("KIN", k, i, n);
			//console.log("TRAILARRAY", this.trailarray); // LAST ARRAY STANDING

			while (this.trailarray.length > 0) {
				DOM.specialfx.replaceChildren("");
				let tailEnd = [];

				for (let num = 0; num < this.trailarray.length; num++) {
				
// 					console.log(`ARRAY LEN ${this.trailarray.length} * OPSTEP ${this.ostep} = ${this.trailarray.length * this.ostep}`);
// 					console.log(`NUM ${num} * OSTEP ${this.ostep} = ${num * this.ostep}`);

					this.trailarray[num].o = 1 - (num * this.ostep);
					tailEnd.push(this.trailarray[num]);

				}
					//console.log(tailEnd);
// (OPACITY "1" CONVERGES INTO ENDPOINT)
				for (let num = 0; num < tailEnd.length; num++) {
					let x = parseFloat(tailEnd[num].x).toFixed(2);
					let y = parseFloat(tailEnd[num].y).toFixed(2)

					let pointel = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
					pointel.setAttribute('cx', x);
					pointel.setAttribute('cy', y);
					pointel.setAttribute('class', 'cometpt');
					pointel.setAttribute('opacity', tailEnd[0].o); // OPACITY "MOVES" WITH DOT
					DOM.specialfx.append(pointel);
				} // FOR
					this.trailarray.pop();

			} // WHILE

/*
POINT 306.50 380.00 1.00 
POINT 337.24 382.54 0.80 
POINT 368.04 390.15 0.60 
POINT 398.13 402.77 0.40 
POINT 426.73 420.38 0.20 
*/

		} // RENDER_TAIL



	} // CLASS COMET_TRAIL








																					// ANIMATE_COMET
// = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =


	function animateComet() {


		if (k < Object.entries(ANIM_LUT).length) { // STROKES

																		// ADD COMET_TRAIL
																		// #ONE# OBJECT PER STROKE
																		// INSERT AT START OF NEW STROKE (K)
			//trail = new CometTrail(k, i, n, traillength); 																				// #MUST# BE SHORTER SAMPLES CURVE


			if (i < Object.entries(ANIM_LUT[k]).length) { // CURVES
				if (n < Object.entries(ANIM_LUT[k][i]).length) { // POINTS

// –––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
					newk = k;
													// (##TBD## CANCEL ANIMATION IF BTN "DOT/COMET" IS PRESSED
													// WHILE ANIMATION IS STILL RUNNING)
					if (lastk !== newk) {
						//console.log("LASTK", lastk, "NEWK", newk);
						WAIT = PAUSES[k][0];
						//console.log(`______WAIT ${WAIT}______`);
						// ADJUST PAUSES TO SPEED
						//WAIT = parseInt(WAIT / (75 / SPEED)); 				// ##MAGIC NUMBER## ADJUST TO DEVICE
						//WAIT = parseInt(WAIT / SPEED);
						WAIT = parseInt(WAIT);
								//console.log(`______SPEED ${SPEED}______`);
								//console.log(`______WAIT/SPEED ${WAIT}______`);

	 				} else {
	 					WAIT = 0;
	 				}

					lastk = newk;
																	// LOG ANIMATION ANIM_LUT
					//console.log(`ANIM_LUT ${k} ${i} ${n}`, ANIM_LUT[k][i][n]);
					//console.log(`ANIM_LUT ${k} ${i} ${n}`, ANIM_LUT[k][i][n].x);
					//console.log(`ANIM_LUT ${k} ${i} ${n}`, ANIM_LUT[k][i][n].y);

												// NEW LEADING POINT (WITH FOLLOWERS) FOR EVERY "N"
					//let end = [LUT[k].length, i.length, n.length];

					trail = new CometTrail(traillength); // k, i, n, 
												// UPDATE COMET_TRAIL FOR NEW N (WITH CURRENT K I)
					trail.setTrailarray(k, i, n);
// –––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
					n++; // NEXT POINT

				} else { 
					//maxn = n;
					i++; // NEXT CURVE
					n = 0;

				} // N=0

			} else { 
				//maxi = i;
				k++; // NEXT STROKE
				i = 0;

			} // I=0
			const TIMEOUT = SPEED + parseFloat(WAIT);
			setTimeout(animateComet, TIMEOUT);							// #####LOOP#####

			//console.log(SPEED, typeof SPEED);	
			//console.log(WAIT, typeof WAIT);	
			//console.log(TIMEOUT, typeof TIMEOUT);

		} else {

			//maxk = k;
			//console.log(`(END) k${maxk}, i${maxi}, n${maxn}`);

			k = 0;
			lastk = undefined; // K // RESET FOR NEXT (GLYPH)SELECTION OR (ANIMATION)REPEAT

// CLEAR (LAST POINT STANDING) // (!)CAN ONLY BE DELETED FROM INSIDE ANIMATION LOOP
			DOM.specialfx.replaceChildren("");

		 } // K=0 // RESET FOR NEXT SELECTION OR REPEAT

	} // ANIMATE_COMET






																						// EXPORT
// = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =
export { animateComet };



