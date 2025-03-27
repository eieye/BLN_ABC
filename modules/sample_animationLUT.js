/* BLN ABC 0.9 (beta) A Primer for basic literacy development | Ein "Vorkurs" zur Alphabetisierung in Deutsch als Zweitsprache
 * Copyright (C) 2025 Jens Kreitmeyer <self@jenskreitmeyer.de>
 * This file is part of BLN ABC
 * (for the full length copyright notice see the HTML index file and "COPYING.txt")
 */

if (DEBUG_PIPE) {
	console.log('##MODULE## "SAMPLE_ANIMATION_LUT" PART OF BLN ABC "STRESSTEST#04" (QUIZ) // 27-MAR-25');
}

/* ##MEMO## (CHECK) REMOVING DOUBLE POINTS AT ANCHORS OF CONTIGUOUS BEZIER-CURVE SEGMENTS */


import { graphemeOMO } from "./sample_bezierObj.js"; 																							// GRAPHEME_OBJECT_MODEL_OBJECT (CLASS "GOM")



// (RESOLUTION PER CURVE)
 // 0.1 == 10 PTS // 0.0125 == 80 PTS
 // ABSOLUT MAX(!) 0.001==1000 POINTS

		// USE ANIMATION LOOK-UP-TABLES FOR (CRAWLER)RESOLUTION-INDEPENDENT SAMPLING
var ANIM_LUT;
		// AS DISTANCE BETWEEN LAST END/NEXT START POINT
var PAUSES;
		// (INDEPENDENT FROM CRAWL-RESOLUTION) SAMPLING STEP/RESOLUTION FOR ANIMATION
		// ##FIXED## WITH "CONFIG" AT AVERAGE RESOLUTION FOR CONVINCINGLY "SMOOTH" CURVATURE
const ASTEP = 0.1; // 0.1																																					// ##SETTINGS## PARTLY DEVICE-DEPENDENT

		// VARIABLE ##TIMEOUT## MILLISECS
//const SPEED = 50; // SLOW=50
const SPEED = 25; // FAST






															// COMPUTE POINTS-LUT FOR ANIMATION FRAMES
// = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =

	function prepareAnimation() { // LINE ##67##
		//LOG.speed.innerHTML = FPS;
		//console.log("ASTEP", ASTEP);

							// SAMPLE ANIMATION POINTS AT RESOLUTION "ASTEP" // METHOD CLASS "BEZIER"
		ANIM_LUT = graphemeOMO.sampleAnimation(ASTEP);
// REMOVE DBL-PTS FROM CONTIGUOUS BEZIER-SEGMENTS
// IF LAST POINT OF BEZIER IS EQUAL FIRST POINT OF NEXT REMOVE THE LATTER

								
// GET DISTANCES BETWEEN STROKES
		let nextstart;
		let currend;
		PAUSES = [];

// SET INITIAL DELAY (ORIGIN TO STARTPT OF GLYPH)
 // IS ORIGIN OF VIEWBOX GRAPHEME (NOT CLIENT)
		let origin = { x: 0, y: 0};
		let firstpt = ANIM_LUT[0][0][0]; // ("K=0")
		PAUSES.push( [ getDistanceToTime(origin, firstpt), `${origin.x}, ${origin.y}`, `${firstpt.x}, ${firstpt.y}` ]);

 // STROKES DELAY
		for (let k = 0; k < Object.entries(ANIM_LUT).length; k++) {
			let i = Object.entries(ANIM_LUT[k]).length - 1; // CURVE IN STROKE
			let n = Object.entries(ANIM_LUT[k][i]).length - 1; // LAST INDEX IN CURVE
			currend = ANIM_LUT[k][i][n];
			//OK //console.log(`STROKE ${k} #END# X${parseFloat(currend.x).toFixed(2)} Y${parseFloat(currend.y).toFixed(2)}`);
			if (ANIM_LUT[k+1]) {
				nextstart = ANIM_LUT[k+1][0][0];
				//OK //console.log(`STROKE ${k+1} #START# X${nextstart.x} Y${nextstart.y}`);
				PAUSES.push([getDistanceToTime(currend, nextstart), `${currend.x}, ${currend.y}`, `${nextstart.x}, ${nextstart.y}`]);
			} // ELSE NO NEXT STROKE
		} // FOR

		//console.log(`–––––––––GOM ${SELECTED}––––––––\n`, graphemeOMO);
		//console.log(`–––––––––ANIM_LUT ${SELECTED}––––––––\n`, ANIM_LUT);
		//console.log(`–––––––––PAUSES ${SELECTED}–––––––––\n`, PAUSES);
		//console.log("–––––––––END COMPUTE_ANIM_LUT–––––––––");
		//console.log("–––––––––ANIM_LUT–––––––––", ANIM_LUT);

	} // END COMPUTE_ANIMATION_LUT









																// CALCULATE PAUSE BETWEEN STROKES
// = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =

// PAUSES ARE CALCULATED AS DISTANCE (IN PX) 
// FROM ENDPOINT TO NEXT STARTPOINT BETWEEN SUCCESSIVE STROKES

	const getDistanceToTime = function(end, start, ASTEP) {
		let pause = Math.sqrt(Math.pow(end.x - start.x, 2) + Math.pow(end.y - start.y, 2));
		pause = parseFloat(pause).toFixed(2);
		//console.log("PAUSE", pause);

// ##TBD## NOT YET USED // (CONVERT DISTANCE TO ANIMATION TIME)
		let pausesteps = pause / (1 / ASTEP);
		pausesteps = parseFloat(pausesteps).toFixed(2);
		//console.log("PAUSESTEPS", pausesteps);

		return pause;
	}





export { prepareAnimation, ANIM_LUT, PAUSES, SPEED };

