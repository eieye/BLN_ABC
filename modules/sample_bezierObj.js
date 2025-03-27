/* BLN ABC 0.9 (beta) A Primer for basic literacy development | Ein "Vorkurs" zur Alphabetisierung in Deutsch als Zweitsprache
 * Copyright (C) 2025 Jens Kreitmeyer <self@jenskreitmeyer.de>
 * This file is part of BLN ABC
 * (for the full length copyright notice see the HTML index file and "COPYING.txt")
 */

if (DEBUG_PIPE) {
	console.log('##MODULE## "SAMPLE_BEZIER_OBJ" PART OF BLN ABC "STRESSTEST#04" (QUIZ) // 27-MAR-25');
}

//console.log('WITH ADDITION "INSERT_DOT (DIARESIS)" @LINE ##567##FF');
// console.log('\t\t##MEMO## FIX OF FLOAT IM-PRECISION FOR "T"-STEP INTERPOLATION IS IN @LINE ##300##');

/* ##TBD## FOR DEBUGGING AND VISUALIZATION METHOD "RENDER_SAMPLES" (TO SAMPLES-LAYER) @LINE ##344## */
											/* TOGGLE "DEBUG" @LINE ##102## (FROM GLOBAL IN INDEX) */
/* (!)NAMING OF CONTROL-POINTS CHANGED FROM "A1C1C2A2" TO "ABCD" TO PRESERVE SEQUENCE IN CONSOLE-DISPLAY WHEN ALPHA-SORTED */
/* "DURCHBRUCH".-) // FOUND PROPER WORD FOR BEZIER CONTROL-POINTS #DATA# = "BEZIER(FOUR-)POINTGROUPS" (AKA "QUPEDS") */
/* "FINALLY" A COMPLETE "GOM" ("GRAPHEME OBJECT MODEL") ENCAPSULATING THE UGLY BEZIER-DETAILS */
// REMOVED DOUBLE POINTS (END==START) BETWEEN CONTIGUOUS BEZIER CURVES // @LINE ##314##
// FUNCTION INSERT STROKE STARTPOINT @LINE ##476##
// FUNCTION INSERT STROKE EXITPOINT @LINE ##490##
// FUNCTION INSERT DOT (DIACRITICS) @LINE ##515##
// (JUHU!) FINALLY ROBUST/FOUNDATIONAL SOLUTION FOR DOT-INSERT @LINE ##567##FF



FONTDATA ? console.log("\t\t\t\t\tFONTDATA . . . IN SAMPLE OK") : console.log("\t\t\t\t\tFONTDATA . . . IN SAMPLE FAILED");

//console.log("STROKEWEIGHT", strokeweight); // OK AVAILABLE
import { tapDot } from './handlers_crawler.js';



																		// GLOBALS (OR SETTINGS)
// DIVISON #MUST# BE EVEN (NO REMAINDER)
// TRY 0.05 0.1 0.2 0.25 0.25 0.5
  // GOOD AVERAGE 0.125 (8 INTERVALS)
const STEP = 0.2; // 0.125; // FIVE DIVISONS MINIMAL TEST																					// PATH SAMPLING STEP (AKA RESOLUTION)
		// UNITTEST "NORMLEN" // OK FOR 0, 1 ...
const NORMLEN = 100; 																																							// LENGTH OF NORMAL-VECTOR IN SAMPLING
		// (EQUAL OR SMALLER STROKEWEIGHT)
var graphemeOMO;









// CALLED FROM "RENDER_TEMPLATE" 
// USING #A#RRAY-ARG
// ==============================================================================================
function sampleTemplate(gcpta, keychars) {

// GCPT#A#(RRAY) == STROKEWISE BEZIER(4-POINT)GROUPS
// KEYCHARS == SPACED ARRAY // FORMAT [ "l", "i", "n", "g2" ]
// /!\ VALUES ARE STRINGS
	//console.log("= = = = = = = = = = = = GCPTA(RRAY) = = = = = = = = = = = =\n", gcpta);

// CONVERT ARRAY TO OBJECT
// PRESERVE STROKE BREAKS

	let gcpto = new Object();
	for (let k = 0; k < gcpta.length; k++) { //STROKES
		gcpto[k] = new Object();
		for (let i = 0; i < gcpta[k].length; i++) {  // POINTS IN STROKE
			gcpto[k][i] = { x: parseFloat(gcpta[k][i][0]), y: parseFloat(gcpta[k][i][1]) }; 						// ARRAY-INDEX TO OBJECT-KEY // (!)TYPE FLOAT
		}
	}
// /!\ VALUES ARE FLOATS	
	//console.log("= = = = = = = = = = = = GCPT#O#(BJECT) = = = = = = = = = = = =\n", gcpto); // OK

	graphemeOMO = new GOM(gcpto, STEP, NORMLEN, keychars); // "GRAPHEME-OBJECT-MODEL"
	//console.log("GRAPHEME OMO", graphemeOMO);

} // SAMPLE_GRAPHEME











		// (GLOBAL OR FROM "SETTINGS")
// STEP 					DIVISOR "t" OF FRACTION 1/t IN INTERVAL 0..1																		// FOR PRECISON DROP-OUTS AVOID REMAINDER
// NORMLEN				LENGTH OF NORMAL (IN CURVE POINT)																								// ("STROKE-WIDTH" OF OUTLINES)

// ==============================================================================================
class GOM {
  constructor(gcpto, STEP, NORMLEN, keychars) {

		this.gcpto = gcpto; // PASS GRPHMCTRLPNT#OBJECT# // STROKEWISE CTRL-POINT-LIST (FULL MTBG OR SINGLE)
    this.STEP = STEP; 																								
    this.NORMLEN = NORMLEN; 												
		this.NAME = keychars.join(''); // CURRENT GRAPHEME // (!)INSPECTION ONLY
		this.DEBUG_PIPE = DEBUG_PIPE; // LINE ##102## 																								// LEAVE LOCAL FOR CLEAR CORRESPONDENCE

// TRANSCRIPTION TO BEZIER-POINTGROUPS "A1C1C2A2"/ABCD
// (KEEP SEQUENCE AFTER ALPHA-SORTING)
// (RE)CONSTRUCT 4-POINT-GROUPS STROKE-WISE
		this.bezierptgroups = new Object();

		for (let k = 0; k < Object.entries(this.gcpto).length; k++) {
			let count = 0; // (NUM PTGROUP IN STROKE)
			this.bezierptgroups[k] = new Object();
			for (let i = 0; i < Object.entries(this.gcpto[k]).length; i += 4) {
				if ( i === 0) {
					this.bezierptgroups[k][i] =	
					{
						a: this.gcpto[k][i],
						b: this.gcpto[k][i + 1],
						c: this.gcpto[k][i + 2],
						d: this.gcpto[k][i + 3]
					}
				}
				if (i % 4 === 0) { // REPEAT FOR GROUPS OF FOUR
					this.bezierptgroups[k][count] = 
					{
						a: this.gcpto[k][i],
						b: this.gcpto[k][i + 1],
						c: this.gcpto[k][i + 2],
						d: this.gcpto[k][i + 3]
					}
				}
				count++;
			} // FOR POINTS
		} //FOR STROKE

		//console.log("BEZ(IER) CTRLPT GROUPS\n", this.bezierptgroups);

														// METHODS #MUST# BE CALLED IN SUCCESSION
// / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / /
// SAMPLE POINTS AND GRADIENTS AT STEPS // ##EXTEND WIT EQUALIZER##
		this.samplePath();																																						// A FULL GRAPHEME (SINGLE OR MTBG)
// DEBUGGING/VISUALIZATION
		this.renderPointSamples();
// NORMALS
		this.computeNormals(); 																																				// COMPUTE NORMALS FROM TANGENTS
// OUTLINES
		this.computeOutlines();																																				// 4-CORNER POLYGONS JOINING TWO ADJACENT NORMALS

	} // CONSTRUCTOR





// –––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
															// GET CURVE STEP-POINTS (SAMPLES)
														// AND THEIR DERIVATIVE (TANGENT VECTOR)
	samplePath() {

// INTERPOLATION VARS
		let bx, by, dx, dy;
		let C1 = {}, C2 = {}, C3 = {}, C4 = {};

// FOR ALL (BEZIER CURVE)SEGMENTS OF GRAPHEME
		this.grapheme_samples = new Object();
		this.grapheme_gradients = new Object();

// ADD STROKE-WISE TO GRAPHEME
		for (let k = 0; k < Object.entries(this.bezierptgroups).length; k++) {

												//console.log(`STROKE ${k}`);
			this.grapheme_samples[k] = new Object();
			this.grapheme_gradients[k] = new Object();

// ADD CURVE-WISE TO STROKE
			for (let i = 0; i < Object.entries(this.bezierptgroups[k]).length; i++) {
												//console.log(`BEZIER ${i}`, this.bezierptgroups[k][i]);

				this.grapheme_samples[k][i] = new Object(); // EACH CURVE/SEGMENT
				this.grapheme_gradients[k][i] = new Object();


// POINTS-ON-PATH FROM INTERPOLATION IN INTERVAL 0..1
// –––––––––––––––––––––––––––––––––––––––––– SAMPLING –––––––––––––––––––––––––––––––––––––––––
				let count = 0; // NUM SAMPLES (STEPS OF "T")
				let samples = new Object();
				let gradients = new Object();

																	// EXTEND WITH EQUALIZER
																	// INSTEAD OF CONSTANT "T" 
																	// PASS VARIABALE STEPS (FROM ARRAY)
																	// SPACED FOR GENERATING 
																	//"EQUIDISTANT" POINTS
// / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / /
				let t, t2, t3;
				for (t = 0; t <= 1; t += this.STEP) {
// / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / /
					let bptg = this.bezierptgroups[k][i]; // A SINGLE BEZIER(POINT GROUP) // LINE ##213##

// UNITTEST (VARIABLES)
//console.log(bptg); // (OBJECT FLOATS)
//console.log(bptg.a.x, bptg.a.y); // (FLOATS)
/*
console.log(`STROKE${k} CURVE${i} STEP${t}
A ${bptg.a.x} ${bptg.a.y}
B ${bptg.b.x} ${bptg.b.y}
C ${bptg.c.x} ${bptg.c.y}
D ${bptg.d.x} ${bptg.d.y}`);
*/

// –––––––––––––––––––––––––––––––––––––––– INTERPOLATION ––––––––––––––––––––––––––––––––––––––
					t2 = t*t;
					t3 = t2*t;

    			C1.x = bptg.d.x - 3.0 * bptg.c.x + 3.0 * bptg.b.x - bptg.a.x;
   				C2.x = 3.0 * bptg.c.x - 6.0 * bptg.b.x + 3.0 * bptg.a.x;
   				C3.x = 3.0 * bptg.b.x - 3.0 * bptg.a.x;
   				C4.x = bptg.a.x;

    			C1.y = bptg.d.y - 3.0 * bptg.c.y + 3.0 * bptg.b.y - bptg.a.y;
   				C2.y = 3.0 * bptg.c.y - 6.0 * bptg.b.y + 3.0 * bptg.a.y;
   				C3.y = 3.0 * bptg.b.y - 3.0 * bptg.a.y;
   				C4.y = bptg.a.y;

// UNITTEST COMPONENTS/KNOTEN (FLOATS)
/*
console.log('C1X', C1.x, ' C1Y', C1.y, '\n',
'C2X', C2.x, ' C2Y', C2.y, '\n',
'C3X', C3.x, ' C3Y', C3.y, '\n',
'C4X', C4.x, ' C4Y', C4.y);
*/

// SAMPLE POINT
					bx = C1.x * t3 + C2.x * t2 + C3.x * t + C4.x;
					//console.log('PTX', bx); // FLOAT OK
					by = C1.y * t3 + C2.y * t2 + C3.y * t + C4.y;
					//console.log('PTY', by); // FLOAT OK
// GRADIENT IN POINT (TANGENT)
					dx = 3.0 * C1.x * t2 + 2.0 * C2.x * t + C3.x;
					dy = 3.0 * C1.y * t2 + 2.0 * C2.y * t + C3.y;
// ––––––––––––––––––––––––––––––––––––– END INTERPOLATION –––––––––––––––––––––––––––––––––––––

//ALL POINTS (COLLECTED) FOR EACH INTERVAL
    			samples[count] = { x: bx, y: by }; // COLLECTED PTS
    			gradients[count] = { x: dx, y: dy };
					count++;
// 																FLOAT PECISION OK // GETS T===1
// 							console.log("======= T =======", t);
// 							if (t === 1) {
// 								console.log("=======LAST SAMPLE=======", t, samples[count]);
// 							}
    		} // END FOR // T-STEPS
// ––––––––––––––––––––––––––––––––––––––– END SAMPLING ––––––––––––––––––––––––––––––––––––––––

 // // ADD TO OBJECT
			this.grapheme_samples[k][i] = samples;
			this.grapheme_gradients[k][i] = gradients;

		} // FOR (BEZIERS)
	} // FOR (STROKES)

	//console.log("GRAPHEME_SAMPLES", this.grapheme_samples);
	//console.log("GRAPHEME_GRADIENTS", this.grapheme_gradients);

	} // SAMPLE_PATH






																// SAMPLE GRAPHEME FOR ANIMATION
// –––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
// SHORT VERSION OF "SAMPLE_PATH" 
// FOR POINTS-ON-PATH AT VARIABLE (HIGHER) RESOLUTION "ANIMSTEP"
					// IF "T"-DIVISION HAS A REMAINDER(!) MUST ADD LAST PT OF CURVE VERBATIM
	sampleAnimation(ASTEP) {

		//console.log('"SAMPLE ANIMATION" (METHOD) ASTEP', ASTEP, typeof ASTEP); // (!)WATCH TYPING
// FOR GRAPHEME
			let px, py;
			let C1 = {}, C2 = {}, C3 = {}, C4 = {};
			let animationLUT = new Object();
 // STROKES
			for (let k = 0; k < Object.entries(this.bezierptgroups).length; k++) {
				animationLUT[k] = new Object();
 // EACH CURVE IN STROKE
				for (let i = 0; i < Object.entries(this.bezierptgroups[k]).length; i++) {
					animationLUT[k][i] = new Object();

// RESET COUNTER FOR EACH BEZIER
					let count = 0; // NUM SAMPLES
					let samples = new Object();
					let t, t2, t3;

// (IN THEORY LIMIT THE MAX NUM OF POINTS TO 1000)
// DUE TO FLOAT IMPRECISON FOR ASTEP = 0.001 
// T-MAX VALUE IS 1.0+7e-16

					for (t = 0; t <= 1.001; t += ASTEP) {
						//console.log('("SAMPLE ANIMATION") T', t, "\tKI", k,i, "\tN", count); // LINE ##300##
						let bptg = this.bezierptgroups[k][i];
						t2 = t*t;
						t3 = t2*t;
    				C1.x = bptg.d.x - 3.0 * bptg.c.x + 3.0 * bptg.b.x - bptg.a.x;
   					C2.x = 3.0 * bptg.c.x - 6.0 * bptg.b.x + 3.0 * bptg.a.x;
   					C3.x = 3.0 * bptg.b.x - 3.0 * bptg.a.x;
   					C4.x = bptg.a.x;
    				C1.y = bptg.d.y - 3.0 * bptg.c.y + 3.0 * bptg.b.y - bptg.a.y;
   					C2.y = 3.0 * bptg.c.y - 6.0 * bptg.b.y + 3.0 * bptg.a.y;
   					C3.y = 3.0 * bptg.b.y - 3.0 * bptg.a.y;
   					C4.y = bptg.a.y;
						px = C1.x * t3 + C2.x * t2 + C3.x * t + C4.x;
						py = C1.y * t3 + C2.y * t2 + C3.y * t + C4.y;
// SKIP DBL POINTS (D=A) IF CURVE IS CONTIGUOUS // LINE ##314##
						if (i > 0) { 																																					// IS NOT FIRST CURVE IN STROKE
							if (t === 0) {
								continue; 																																				// SKIP FIRST PT
							}
						}
// (ELSE)
    				samples[count] = { x: px, y: py }; // CUMULATIVE PT NUM
						count++;
    			} // END FOR T-STEPS

// ADD CURVE "I" TO STROKE "K"
				animationLUT[k][i] = samples;
			} // FOR (BEZIERS)
		} // FOR (STROKES)
		if (DEBUG_PIPE) {
			console.log("ANIMATION_LUT", animationLUT);
		}
		return animationLUT;

	} // SAMPLE_ANIMATION






												// RENDERING SAMPLE-PTS TO "SAMPLES"-LAYER
// –––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
// (LAYER GETS CLEARED WITH "NEW GLYPH" AND "CLEAR")
	renderPointSamples() { // LINE ##344##

		if (this.DEBUG_PIPE) {// *SETTING* LINE ##304##
			const addDot = function(point) {
				const dotpt = document.createElementNS('http://www.w3.org/2000/svg', 'circle'); 					// NAMESPACE(!)
				dotpt.setAttribute('cx', `${point.x}`);
				dotpt.setAttribute('cy', `${point.y}`);
				dotpt.setAttribute('class', 'sampledot');
				//console.log("NEW DOTPT", dotpt)
				return dotpt;
			} // DOT

			let point; // TEMP (READABILITY)
			for (let k = 0; k < Object.entries(this.grapheme_samples).length; k++) {
				for (let i = 0; i < Object.entries(this.grapheme_samples[k]).length; i++) {
					for (let n = 0; n < Object.entries(this.grapheme_samples[k][i]).length; n++) {
						point = this.grapheme_samples[k][i][n];
						DOM.samples.append(addDot(point));
						//console.log("===PT===", point); //PT
					} // FOR POINTS
				} // FOR CURVES
			} // FOR STROKES
		} // IF DEBUG_PIPE

	} // RENDER_POINT_SAMPLES







// –––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
																			// COMPUTE NORMALS

	computeNormals() {

		this.grapheme_normals = new Object(); 																												// "THIS" #IS# THE G(RAPHEME)OM
		let l = this.NORMLEN / 2; 																																		// (EFFECTIVE STROKE-WIDTH OF CRAWL-ELS)
		let A, B;								 																																			// (BOTH ENDPOINTS)													

		for (let k = 0; k < Object.entries(this.grapheme_samples).length; k++) { // STROKES
			this.grapheme_normals[k] = new Object();

			for (let i = 0; i < Object.entries(this.grapheme_samples[k]).length; i++) { // CURVES
				this.grapheme_normals[k][i] = new Object();
		
				for (let n = 0; n < Object.entries(this.grapheme_samples[k][i]).length; n++) { // CURVES
					let gx = this.grapheme_gradients[k][i][n].x;
					let gy = this.grapheme_gradients[k][i][n].y;
			
//console.log("GRADX", gx, "\n", "GRADY", gy);

					const q = Math.sqrt(gx * gx + gy * gy);
					const qv = { x: -gx / q, y: gy / q };																										// NORMAL = TANGENT ROTATED BY 90 DEG
					B = { x: this.grapheme_samples[k][i][n].x - qv.y * l, y: this.grapheme_samples[k][i][n].y - qv.x * l };
					A = { x: this.grapheme_samples[k][i][n].x + qv.y * l, y: this.grapheme_samples[k][i][n].y + qv.x * l };
					this.grapheme_normals[k][i][n] = { A, B };

//console.log("SMPLX", this.grapheme_samples[k][i][n].x, "\n", "SMPLDY", this.grapheme_samples[k][i][n].y);

				} // FOR POINTS
			} // FOR CURVES
		} // FOR STROKES
		//console.log("GRAPHEME_NORMALS", this.grapheme_normals);



												// ##DEBUGGING/VISUALIZATION## RENDER NORMALS
		if (this.DEBUG_PIPE) { // *SETTING* LINE ##371##
	
			for (let k = 0; k < Object.entries(this.grapheme_normals).length; k++) {
				for (let i = 0; i < Object.entries(this.grapheme_normals[k]).length; i++) {
					for (let n = 0; n < Object.entries(this.grapheme_normals[k][i]).length; n++) {
						const normline = document.createElementNS('http://www.w3.org/2000/svg', 'line');
						let nrm = this.grapheme_normals[k][i][n];
// ##TEMP## RENDERING TO LAYER "SAMPLES"
						DOM.samples.append(normline);
						normline.setAttribute( 'x1', `${nrm.A.x}` ); // LINES 382-385 ###THROWS ERRORS FOR ZERO-DISTANCES### // FIXED IN FONTDATA
						normline.setAttribute( 'y1', `${nrm.A.y}` );
						normline.setAttribute( 'x2', `${nrm.B.x}` );
						normline.setAttribute( 'y2', `${nrm.B.y}` );
						normline.setAttribute('class', 'normline');
					} // FOR POINTS
				} // FOR CURVES
			} // FOR STROKE

		} // DEBUG_PIPE

	} // COMPUTE_NORMALS









// CREATE TRACK OUTLINES 
// ALSO CRAWL-ELEMS // WITH ADDED #ID# FOR STROKE/CURVE
// –––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
	computeOutlines() {

		let pathlen; // SVG-PATH LENGTH
	// "QU(ADRU)PED" FOUR-FOOTED OUTLINE-BEAST CONNECTING TWO ADJACENT NORMALS (4 CORNERS)
		let quped = new Object();
		let stepoutlines = new Object(); 																															// LOCAL SCOPE

		for (let k = 0; k < Object.entries(this.grapheme_normals).length; k++) {
			stepoutlines[k] = new Object();
			for (let i = 0; i < Object.entries(this.grapheme_normals[k]).length; i++) {
				stepoutlines[k][i] = new Object();
				for (let n = 0; n <= Object.entries(this.grapheme_normals[k][i]).length - 2; n++) { 			// (!)SMALLER  OR EQUAL
// GRAB TWO ADJACENT NORMAL'S ENDPOINTS // 4-CORNERS
					quped = {
						A: {x: this.grapheme_normals[k][i][n].A.x, y: this.grapheme_normals[k][i][n].A.y },
						B: {x: this.grapheme_normals[k][i][n].B.x, y: this.grapheme_normals[k][i][n].B.y },
						C: {x: this.grapheme_normals[k][i][n + 1].B.x, y: this.grapheme_normals[k][i][n + 1].B.y },
						D: {x: this.grapheme_normals[k][i][n + 1].A.x, y: this.grapheme_normals[k][i][n + 1].A.y }
					};
					stepoutlines[k][i][n] = quped;
				}
			}
		} // FOR





												  	// (HELPER-FUNCTIONS FOR "COMPUTE_OUTLINES")
// –––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
// FUNCTION EXPRESSION "INSERT START" // CALL @LINE ##476##
		const insertStartpoint = function(startpt, k) {
			//console.log("______________STARTPOINT XY", startpt.x, startpt.y, "______________");
			const startptel = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
			startptel.setAttribute('cx', `${startpt.x}`);
			startptel.setAttribute('cy', `${startpt.y}`);
			startptel.setAttribute('r', `${strokeweight / 2}`);
			startptel.setAttribute('id', `IN.${k}`); // ID BY NUM
			startptel.setAttribute('class', 'startpoint');
			startptel.setAttribute('visibility', 'hidden'); 																						// BTN-HANDLER SETS STARTPOINT AND FIRST CEL TO "VISIBLE"
			DOM.crawler.append(startptel);
		} // STARTPT


// FUNCTION EXPRESSION "INSERT EXIT" // CALL @LINE ##490##
		const insertExitPoint = function(exitpt, k) {
			//console.log("______________EXITPOINT XY", exitpt.x, exitpt.y, "______________");
			const exitptel = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
			exitptel.setAttribute('cx', `${exitpt.x}`);
			exitptel.setAttribute('cy', `${exitpt.y}`);
			exitptel.setAttribute('r', `${strokeweight / 2}`);
			exitptel.setAttribute('id', `OUT.${k}`); // ID BY NUM
			exitptel.setAttribute('class', 'exitpoint');
			exitptel.setAttribute('visibility', 'visible'); 																						// BTN-HANDLER SETS STARTPOINT AND FIRST CEL TO "VISIBLE"
			DOM.crawler.append(exitptel);
		} // EXITPT


										 // TO FIND "DOTS" IN STROKES CHECK LENGTH OF BEZIERCURVE
// (INSERT "DOT(S)" FOR TITTLE/TREMA)
	const checkPathLength = function(cntrlpts) {
		const svgelem = document.createElementNS('http://www.w3.org/2000/svg', 'path'); 							// INTERMEDIATE HELPER-EL FOR MEASURING
		const d = `M ${cntrlpts.a.x} ${cntrlpts.a.y} C ${cntrlpts.b.x} ${cntrlpts.b.y} ${cntrlpts.c.x} ${cntrlpts.c.y} ${cntrlpts.d.x} ${cntrlpts.d.y}`;
		svgelem.setAttribute('d', d); 
		return parseFloat(svgelem.getTotalLength()).toFixed(2);
	} // PATH-LENGTH


																// FUNCTION EXPRESSION "INSERT DOT"
	const insertDot = function(cntrlpts, num) { // LINE ##515##
		// console.log(`${cntrlpts.a.x} ${cntrlpts.a.y} ${cntrlpts.d.x} ${cntrlpts.d.y}`);
// SPECIAL "DOT-VERSION" OF CRAWLER-CEL
		let center = {																																								// COMPUTE MIDPOINT OF PATH LENGTH
			x: cntrlpts.a.x + (cntrlpts.d.x - cntrlpts.a.x) / 2,
			y: cntrlpts.d.y + (cntrlpts.a.y - cntrlpts.d.y) / 2
		}
		//console.log(`______________DOT CENTER ${center.x} ${center.y} ______________`);

		let diacritter = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
		diacritter.setAttribute('cx', `${center.x}`);
		diacritter.setAttribute('cy', `${center.y}`);
// ADD INTEGER-PERCENTAGE OF STROKEWEIGHT TO MAKE DOT "BOLDER"
		diacritter.setAttribute('r', `${parseInt(strokeweight * 0.57)}px`); 													// (HAS UNIT)
		diacritter.setAttribute('id', `DOT.${num}`); 																									// (NUM REDUNDANT)
		diacritter.setAttribute('class', 'diacritter');
		diacritter.setAttribute('visibility', 'visible');
// ADD LISTENER "TAP-"EVENT
		diacritter.addEventListener('pointerup', tapDot); // POINTER/TOUCH OK
		 										// (CHROME 160.0 ERROR MSG "(TOUCHPOINTS) UNDEFINED")
		 			// #NEXT GEN## REQUIRES TOUCHES-FORK AS IN "HANDLERS_TRACING" @LINE ##133##
		//diacritter.addEventListener('touchend', tapDot);
		DOM.crawler.append(diacritter);
	} // DOT



													// RENDER "CRAWLELEMS" (CELS) TO GROUP "CRAWLER"
																			// ADD #ID# STROKE/CURVE
// #TBD# CLARIFY (MAKE FUNCTION?) AS "RENDER CELS"
// –––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
		DOM.crawler.replaceChildren(""); // CLEAR LAYER
		let currk, prevk, currpt; // (START UNDEF)

// FOR STROKE "K"
		for (let k = 0; k < Object.entries(stepoutlines).length; k++) {
		//console.log("K", k);

																	// INSERT STROKE STARTPOINT
											// (DEFAULT AT START OF *EVERY* STROKE UNLESS "UMLAUT"-DOT)

// / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / /
// (FOR "DOTS" SKIP DRAWING SMALL CELS IN "CRAWLER" BUT STILL DRAWN THEM IN "OUTLINES")
// ONLY IF FIRST (OR IF ONLY) ITEM IN STROKE THE CURVE CAN BE A "DOT"

			if (checkPathLength(this.bezierptgroups[k][0]) < 15) { 																			// FIRST BEZIER IN STROKE
			// IF SHORTER MIN-LENGTH										 																								// (11.76 IS "DOT" PATH-LENGTH IN "FONTDATA")
				//console.log(` BPTG CURVE ${k} 0 `, this.bezierptgroups[k][0]);
				//console.log(`PATH LENGTH = ${pathlen}`);

				insertDot(this.bezierptgroups[k][0], k); 																									// "K" IS STROKE NUM AND EQUAL CURRENT "IN"-POINT NUM
				// EXIT THIS ITERATION OF LOOP (GO TO NEXT K)
													// ––––––––– #TBD# JUMP TO LINE ##567## ––––––––––
				continue;

			} else {
				// ELSE OVER LIMIT
				insertStartpoint(this.grapheme_samples[k][0][0], k);																			// EACH STROKE/FIRST CURVE/FIRST POINT
			}

// ITERATE OVER REMAING CURVES IN STROKE
// FOR CURVE "I" IN STROKE
			for (let i = 0; i < Object.entries(stepoutlines[k]).length; i++) { 			
			//console.log("K", k, "I", i);
				let ilen = Object.entries(stepoutlines[k]).length; 																				// NUM OF CURVES IN STROKE "K"

// FOR INTERVALS (STEPS) "N" IN CURVE
				for (let n = 0; n <= Object.entries(stepoutlines[k][i]).length - 1; n++) { 								// NUM INTERVALS IS NUM POINT-SAMPLES - 1
				//console.log("K", k, "I", i, "N", n);
					let nlen = Object.entries(stepoutlines[k][i]).length; 																	// NUM OF INTERVALS IN CURVE "I"

// BUILD/DRAW THE OUTLINE/"CEL"
					let perim = stepoutlines[k][i][n]; // PERIMETER DESCRIBED BY 4 (QUAD-)POINTS
					//console.log("PERIMETER", perim);
					// PARSE FOR #LOWEST# PRECISION NEEDED (AND BETTER READABILITY)
					let Ax = parseFloat(perim.A.x).toFixed(2);
					let Bx = parseFloat(perim.B.x).toFixed(2);
					let Cx = parseFloat(perim.C.x).toFixed(2);
					let Dx = parseFloat(perim.D.x).toFixed(2);
					let Ay = parseFloat(perim.A.y).toFixed(2);
					let By = parseFloat(perim.B.y).toFixed(2);
					let Cy = parseFloat(perim.C.y).toFixed(2);
					let Dy = parseFloat(perim.D.y).toFixed(2);
					const cel = document.createElementNS('http://www.w3.org/2000/svg', 'path'); 						// C(RAWLER) EL(EMENT) "CEL"
					const d = `M${Ax},${Ay}L${Bx},${By} ${Cx},${Cy} ${Dx},${Dy}Z`;
					cel.setAttribute('d', d);

// NUMBER CELS SUCCESSIVELY PER STROKE ("LAUFENDE NUMMER")
// (POINTS NEED ONLY BE NUMBERED PER STROKE FOR CRAWLING)
					currk = k;
					if (currk === prevk) {
						//currpt = prevpt + 1;
						currpt++;
					} else {
						currpt = 0;
					}
					prevk = currk;

// SKIPPING CURVE-ID #BUT# NUMBERING POINTS WITH "LFD NR"
					cel.setAttribute('id', `${k}.${currpt}`);
					cel.setAttribute('visibility', 'hidden'); 																							// BTN-HANDLER SETS STARTPOINT AND FIRST CEL TO "VISIBLE"
					DOM.crawler.append(cel);
					//crawlertrack.setAttribute('class', 'cel'); // CLASS IS IN GROUP

// AFTER LAST PT IN STROKE INSERT EXITPOINT  // FROM (!)POINT-SAMPLES TO GET XY-POS
					if (n === nlen-1 && i === ilen - 1) {
						insertExitPoint(this.grapheme_samples[k][i][n + 1], k); // LINE ##612##  							// NUM INTERVALS IS NUM POINT-SAMPLES - 1
					}

				} // CELS (INTERVALS)

			} // CURVES

		} // STROKES





// –––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
										// ##DEBUG## RENDER AND DISPLAY "OUTLINES" IN GROUP "OUTLINES"
		if (this.DEBUG_PIPE) {
			DOM.outlines.replaceChildren(""); // CLEAR LAYER

			for (let k = 0; k < Object.entries(stepoutlines).length; k++) { // STROKE
				for (let i = 0; i < Object.entries(stepoutlines[k]).length; i++) { // CURVE
					for (let n = 0; n <= Object.entries(stepoutlines[k][i]).length - 1; n++) { 							// NUM OUTLINES IS NUM POINTS - 1
						let perim = stepoutlines[k][i][n]; // PERIMETER
						const outlinepath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
						const d = `M${perim.A.x},${perim.A.y}L${perim.B.x},${perim.B.y} ${perim.C.x},${perim.C.y} ${perim.D.x},${perim.D.y}Z`;
						DOM.outlines.append(outlinepath);
						outlinepath.setAttribute('d', d);
						//outlinepath.setAttribute('class', 'outline'); // CLASS IS IN GROUP (STYLESHEET)
					} // ELEMENT
				} // CURVE
			} // STROKE

		} // DEBUG_PIPE


	} // COMPUTE OUTLINES


} // CLASS BEZIER





export { sampleTemplate, graphemeOMO };

