/* BLN ABC 0.9 (beta) A Primer for basic literacy development | Ein "Vorkurs" zur Alphabetisierung in Deutsch als Zweitsprache
 * Copyright (C) 2025 Jens Kreitmeyer <self@jenskreitmeyer.de>
 * This file is part of BLN ABC
 * (for the full length copyright notice see the HTML index file and "COPYING.txt")
 */

if (DEBUG_PIPE) {
	console.log('##MODULE## "EXPAND_SVG" PART OF BLN ABC "STRESSTEST#04" (QUIZ) // 27-MAR-25');
}

//console.log('#MEMO# "RENDER_CONTROL_POINTS" @LINE ##163##');

// "UN-PACK" CONTROL/ANCHOR 4-POINT-GROUPS (A1C1C2A2) FROM COMPACTED SVG-FORMAT FOR CURVE INTERPOLATION
// "GCPTA(RRAY)" GETS CONVERTED TO "GCPTO(BJECT)" IN "SAMPLE_GRAPHME"

// "COLDBLOODED CODE" // TRY TO FREEZE THIS 
// SEE (https://dubroy.com/blog/cold-blooded-software/) VIA CODEPEN


/* NOTE
 * FOR THE FORESEEABLE FUTURE (BEFORE AN ACTUAL FONT (OTF/WOFF) OR COLRV1 FONT IS PRODUCED)
 * APP EXPECTS CUBIC-BEZIERS OF GLYPH CENTER-LINES IN #SVG#-FORMAT.
 * COMPOSITE GRAPHEMES ("MTBG" MULTI-PART) WILL #NOT# BE PART OF THE (LATIN) FONT BUT ARE
 * COMPOSITED "ON THE FLY" FOR MAXIMUM FLEXIBILITY (ALLOWING SPELLING OF SHORT SYLLABLES AND WORDS).
 */

/* #MEMO# FORMATTING SVG DATA-STRING ("d=") IN JSON
 * FOR PROPER PARSING IN PIPELINE (ELSE 'TEMPLATE' OR 'CRAWLER' OR BOTH WILL FAIL) 
 * STRING MUST BE FORMATTED FOLLOWING THIS PATTERN:
 * "M 70 885.5 C 159 663 248 440.5 337.5 218\nC 426.5 440.5 517 665 605.5 885.5\nM 153 684 C 253 684 422 684 522 684\n"
 * COORDINATES #MUST# BE ABSOLUTE VALUES
 * #MUST# HAVE WORDSPACE BETWEEN EVERY CONTROL-TAG ("M" OR "C") AND THE FOLLOWING NUMERICAL VALUE
 * #MUST# HAVE A TERMINATING NEW LINE "\n"
 * #MAY# HAVE NEW LINES SEPARATING CURVE-SEGMENTS ("M x y C x y x y x y\n" OR "C x y x y x y\n")
 * (THESE ARE OPTIONAL FOR READABILITY ONLY AND CAN REPLACED WITH A SIMPLE SPACE)
 */







			// CALLED FROM "RENDER_TEMPLATE"
// ================================================================================================
function expandSVGctrlpts(svg) {

// FLATTEN DDATA IN "FONTDATA" FOR PROCESSING
	let DDATA_flat; // ALSO IN (LOCAL SCOPE) @"ASSEMBLE" LINE ##58##
	let DDATA_rows; // ALSO IN (LOCAL SCOPE) @"ASSEMBLE" LINE ##59##
	let gcpta = []; // ARRAY "GLYPHPOINTS#ARRAY#"
	let gcpto = {}; // OBJECT "GLYPHPOINTS#OBJECT#"

	//console.log('–––––––––––––––––––––– SOURCE SVG ––––––––––––––––––––––\n', svg);

// STEP#1
// (BREAK FLAGS M/C TO NEW LINES AND SPLIT POINT VALUES)
// WRITE COLUMNS
		DDATA_flat = svg.replaceAll("M", "\nM"); // (M-LINES END UP WITH RESIDUAL WORDSPACE AT END)
		DDATA_flat = DDATA_flat.replaceAll("C", "\nC");
		DDATA_flat = DDATA_flat.replaceAll("\n\n", "\n");
// SPLIT LINES
		DDATA_rows = DDATA_flat.split('\n');
// (REMOVE EMPTY LINES)
		DDATA_rows.pop();
		DDATA_rows.shift();

	let rawdata = [];
	DDATA_rows.forEach(element => {
		element = element.trimEnd();
		rawdata.push(element.split(" "));
	});
	//console.log('–––––––––––––––––––––– "RAW" DATA ––––––––––––––––––––––\n', rawdata);



// STEP#2
// JOIN PAIRS OF POINT COORDINATES FOR EACH M/C LINE
	let movingptdata = [];
	let temparray;

	rawdata.forEach(element => {
		if (element[0] === "M") { // NEW STROKE // (LINE HAS 1 POINT)
			temparray = [];
			temparray.push([element[0]]);
			temparray.push([element[1], element[2]]);
			movingptdata.push(temparray);
		} else if (element[0] === "C") { // CONTINUING (LINE HAS 3 POINTS)
			temparray = [];
			temparray.push([element[0]]);
			temparray.push([element[1], element[2]]);
			temparray.push([element[3], element[4]]);
			temparray.push([element[5], element[6]]);
			movingptdata.push(temparray);
		}
	});
	//console.log('–––––––––––––––––––––– MOVINGPTDATA ––––––––––––––––––––––\n', movingptdata);
	// (MUTATED BY STEP#3)


// STEP#3
// FOR "C"/CONTINUOUS LINES "RE-DOUBLE" SVG COMPRESSED/IMPLICIT PT 
// ("LAST A2 = NEXT A1")
	rawdata.forEach(element => {
		if (element[0] === "M") {
			let lastptmindex = rawdata.indexOf(element);
								//console.log("======INDEX M======", lastptmindex); // OK
			let lastptm = element.slice(-2);
								//console.log("LAST POINT M", lastptm);
// SPLICE LAST PT OF M-LINE INTO FIRST ELEM OF NEXT LINE
			movingptdata[lastptmindex + 1].splice(1, 0, lastptm);
		} else if (element[0] === "C") {
			let lastptcindex = rawdata.indexOf(element);
								//console.log("======INDEX C======", lastptcindex); // OK
			let lastptc = element.slice(-2);
								//console.log("LAST POINT C", lastptc);
// SPLICE LAST PT OF C-LINE INTO FIRST ELEM OF NEXT LINE
// CATCH ERROR IF INDEX LARGER LENGTH
			if (lastptcindex + 1 < movingptdata.length) {
				movingptdata[lastptcindex + 1].splice(1, 0, lastptc);
			}
		} // END ELSE
	});
	//console.log('–––––––––––––––––––––– MOVINGPTDATA ––––––––––––––––––––––\n', movingptdata);



// STEP#4
// DO NOT COPY THE M-LINES (WHICH NOW ARE DUPLICATES)
// BUT FOR EACH M-FLAG ADD A NEW SUB-ARRAY (STROKE) TO "GLYPH_CONTROLPOINTS_ARRAY"
// AND COPY C-LINES STROKEWISE (I.E. ALL THAT ARE CONTINUOUS) TO THAT SUB-ARRAY
let currindex = 0;

	movingptdata.forEach(element => {
 		//console.log("----ELEMENT------", element); 																				// LINE
 		//console.log("----ELEMENT[0]------", element[0]); 																	// FIRST EL OF LINE ("["M"]")
 		//console.log("----ELEMENT[0][0]------", element[0][0]); 														// FIRST INDEX OF EL ("M")
		if (element[0][0] === "M") {
			let newstroke = [];
			gcpta.push(newstroke);
			currindex = gcpta.length - 1;		
		} else if (element[0][0] === "C") {
			for (let i = 1; i < element.length; i++) { // SKIP FIRST EL
				gcpta[currindex].push(element[i]);
			}
		} // END IF
	});
	//console.log("= = = = = = = = = = = = GCPTA(RRAY) = = = = = = = = = = = =\n", gcpta);

	return gcpta; // TO "RENDER_TEMPLATE"

} // FUNCTION REVERSE_SVG




														// GRAPHEME/GLYPH #VISUAL INSPECTION ONLY#
											// RENDER BEZIER-POINTS (A1C1C2A2) TO LAYER "CONTROLPTS"
// ================================================================================================
// CALLED FROM "RENDER_TEMPLATE" @LINE ##219##
// USE #A#RRAY-ARG

	function renderControlPoints(gcpta) { // LINE ##163##
//console.log("----GCPT#A#------", gcpta); 
//console.log("(EXPAND SVG) DEBUG_PIPE", DEBUG_PIPE);
		if (DEBUG_PIPE) {
			for (let k = 0; k < gcpta.length; k++) { // STROKES
				for (let i = 0; i < gcpta[k].length; i += 4) {	// POINTS
					if (i % 4 === 0) { // ALSO ZERO
						DOM.controlpts.append(addDot(gcpta[k][i], "anchor"));
						DOM.controlpts.append(addDot(gcpta[k][i+1], "control"));
						DOM.controlpts.append(addDot(gcpta[k][i+2], "control"));
						DOM.controlpts.append(addDot(gcpta[k][i+3], "anchor"));
					}
				} // FOR
			} // FOR
		} // DEBUG_PIPE
		
	} // RENDER_CTP


// FORMAT TO HTML
// ================================================================================================
	function addDot(point, type) {
		const dotpt = document.createElementNS('http://www.w3.org/2000/svg', 'circle'); // NAMESPACE(!)
		dotpt.setAttribute('cx', `${point[0]}`);
		dotpt.setAttribute('cy', `${point[1]}`);
		dotpt.setAttribute('class', `${type}`);
		//console.log("NEW DOTPT", dotpt)
		return dotpt;
	} // ADD_DOT





	export { expandSVGctrlpts, renderControlPoints };


