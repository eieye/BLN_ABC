/* BLN ABC 0.9 (beta) A Primer for basic literacy development | Ein "Vorkurs" zur Alphabetisierung in Deutsch als Zweitsprache
 * Copyright (C) 2025 Jens Kreitmeyer <self@jenskreitmeyer.de>
 * This file is part of BLN ABC
 * (for the full length copyright notice see the HTML index file and "COPYING.txt")
 */

if (DEBUG_PIPE) {
	console.log('##MODULE## "BUILD_MINIPREVIEW" PART OF BLN ABC "STRESSTEST#04" (QUIZ) // 27-MAR-25');
}


/* ##TBD## FRQUENT SWITCHING BETWEEN SPACED/UNSPACED STRINGS SUCKS AND ALWAYS HAS // THIS BS SHOULD BE RE-WRITTEN STARTING AT MAPPING "FONTINFO" */
/* #MEMO# CURRENT IMPLEMENTATION INSERTS FORMATTED SVG FOR "BTNUCLC" INTO INDEX-HTML @LINE ##446## */
/* (WILL RENDER GRAPHEME FROM TYPFACE/WOFF AS SOON AS THERE IS ONE) */
/* ##TBD## UC/LC SEEM (AGAIN) TO BE RENDERED AT SLIGHTLY DIFFERENT SIZE // CHECK "FLEX-SHRINK" VALUE ON "CHARBOX" AGAIN */



FONTDATA ? console.log("\t\t\t\t\tFONTDATA . . . IN MINIPREVIEW OK") : console.log("\t\t\t\t\tFONTDATA . . . IN MINIPREVIEW FAILED");

import { assembleMultiPart } from './assemble_multipart.js';





																						// UTILITY
																		// GET DOCUMENT STYLESHEETS

	function getStyleSheet(unique_title) { 																													// (!)AVOID USING FIXED INDEX
 	 for (const sheet of document.styleSheets) {
  		console.log("(SHEET TITLE)", sheet.title);
    	if (sheet.title === unique_title) {
     	 return sheet;
    	}
  	}
	}

	let rulesminipreview = getStyleSheet("stylesminipreview");
	let ruleList = rulesminipreview.cssRules;

if (DEBUG_UCLC) {
// (LOG INTERMEDIATE STEPS)
// console.log("SHEET", rulesminipreview);
// console.log("RULES (RULES LIST)", ruleList); 
			//console.log(`("PREVIEWCONTAINER") #BEFORE# RE-FORMAT RULELIST[4]`, ruleList[4]);					// CLASS "PREVIEWCONTAINER"

// for (let i = 0; i < ruleList.length; i++) {
// 	let entry = ruleList[i];
//   console.log(`RULELIST[${i}]`, entry);
// }
}










// ##TEMP## FUNCTION "FORMAT_MINIPREVIEW"

						// INCOMING "LABEL" IS UNSPACED
						// INCOMING "COMPLEMENT" (IF ANY) IS *SPACED* STRING
						// IF NO UPPERCASE "COMPLEMENT" = "" (EMPTY STRING)
								// ##MEMO## THIS BS USAGE SPACED/UNSPACED IS INSANE AND MUST BE COMPLETELY RE-WRITTEN 
								// STARTING FROM MAPPING "FONTINFO" AND ID-ING "SELECTLISTITEMS"

function formatMinipreview(label, complement) {

// ORDER INCOMING CASE AS "UPPER/LOWER" // (DEEP COPY)
	let pvwinitial = label[0];
	let pvwinitialtoUC = label[0].toUpperCase();
	let pvwupper;
	let pvwlower;


// INCOMING IS LABEL=LOWERCASE // FLIP ORDER
	if (pvwinitialtoUC !== pvwinitial) {
		pvwupper = complement; // MAY BE EMPTY // LOWERCASE ONLY
		pvwlower = FONTINFO.get(label).spacedlabel;

// INCOMING IS LABEL=UPPERCASE // ORDER AS IS
	} else {
		pvwupper = FONTINFO.get(label).spacedlabel;
		pvwlower = complement;
	}



// CLEARLY DEFINE TYPE OF GRAPHEME
// TEST ON INCOMING "LABEL" BECAUSE
// "COMPLEMENT" MAY BE UNDEFINED 
// (FOR INCOMING LOWERCASE)
	let gtype; // (DEBUGGING ONLY)
	let ltype;
	if (label.length === 1) {
		gtype = "regular";																																						// REG CHAR // A a B b ... ß
		ltype = "1";
		renderPreviewOne(pvwupper, pvwlower);
	}
	if (label.length === 2) { 
		if (isNaN(Number.parseInt(label[1])) === false) {																							// (NUM 2, 3, 4)
			gtype = "alternate";												   																							// ALT CHAR // a2 g2 g3 g4 I2 M2 N2 y2 ... ß2
			ltype = "1";
			renderPreviewOne(pvwupper, pvwlower);
		} else {																																											// (NO NUM IN STRING)
			gtype = "regdigraph";																																				// REG DIGRAM // au äu ch ei ie ng // "DIGRAPH"
			ltype = "2";
			renderPreviewTwo(pvwupper, pvwlower);
		}
	}
	if (label.length === 3) { 
		if (isNaN(Number.parseInt(label[1])) === false || isNaN(Number.parseInt(label[2])) === false) {
			gtype = "altdigraph";																																				// ALT DIGRAM // a2u ä2u g2e ng2
			renderPreviewTwo(pvwupper, pvwlower);
		} else {																																											// (NO NUM IN STRING)
			gtype = "trigraph";																																					// REG TRIGRAM // sch ing ung
			ltype = "2";
			renderPreviewTwo(pvwupper, pvwlower);
		}
	}
	if (label.length > 3) { 
		gtype = "composite";																																					// ANY (LONGER) COMPOSITE // ing2 ling achso
		ltype = "2";
		renderPreviewTwo(pvwupper, pvwlower);
	}

// CHECK GRAPHEME TYPE/LAYOUT
	if (DEBUG_UCLC) {
// 	console.log(`LABEL "${label}" COMPLEMENT "${complement}" IS TYPE "${gtype.toUpperCase()}"`);
// 	console.log(`LABEL "${label}" COMPLEMENT "${complement}" LAYOUT IS ${ltype === "1" ? "1 LINE" : "2 LINES"}`);
	}

}









// ##TEMP## (IS PASSING THRU ARGS AND ADDING "SINGLE/COMPOSITE" LAYOUT)
// #TBD# MERGE WITH "INSERT PREVIEW"

	function renderPreviewOne(pvwupper, pvwlower) {


// SET CONTAINER SINGLE LINE LAYOUT
if (DEBUG_UCLC) {
console.log(`
  ___________        ___________        ___________
 |     :     |      |     :     |      |           |
 |  X  :  x  |  OR  |  X2 :  x2 |  OR  |     ß     |
 |     :     |      |     :     |      |           |
  –––––––––––        –––––––––––        –––––––––––
`);
}

		rulesminipreview.deleteRule(4);
/* NEW 210325 */
		let ruleSingle = 
`.previewcontainer {
	display: flex;
	flex-direction: var(--singlerow);
	justify-content: center;
	border: var(--dbbtnborder) dashed lime;
	height: 20vw;
	position: relative;
	top: -20.75vw;
	padding: var(--singlepadding) 1vw var(--singlepadding) 1vw;
	opacity: 0.6;
}`;

		rulesminipreview.insertRule(ruleSingle, 4);
// LOG STYLE-OBJ
	if (DEBUG_UCLC) {
		console.log(`("PREVIEWCONTAINER") RULELIST[4]`, ruleList[4]);
		console.log("   FOR (BUILD MINIPVW) UCLC", pvwupper, pvwlower);
	}

		insertPreview(pvwupper, pvwlower, "single");

	} // PREVIEW ONE(LINE)










// ##TEMP## (IS PASSING THRU ARGS AND ADDING "SINGLE/COMPOSITE" LAYOUT)
// #TBD# MERGE WITH "INSERT PREVIEW"

	function renderPreviewTwo(pvwupper, pvwlower) {


// SET CONTAINER BI/TRI/COMPOSITE LAYOUT
if (DEBUG_UCLC) {
console.log(`
  ___________        ___________        ___________        ___________
 |    Abc    |      |    A2b    |      |           |      |           |
 |···········|  OR  |···········|  OR  |    abc    |  OR  |    a2b    |
 |    abc    |      |    a2b    |      |           |      |           |
  –––––––––––        –––––––––––        –––––––––––        –––––––––––
`);
}

		rulesminipreview.deleteRule(4);
		let ruleMTBG = 
`.previewcontainer {
	display: flex; 
	flex-direction: var(--mtbgcolumn); 
	justify-content: center; 
	border: var(--dbbtnborder) dashed lime;
	height: 20vw; 
	position: relative; 
	top: -20.75vw;
	padding: var(--mtbgpadding) 1vw var(--mtbgpadding) 1vw; 
	opacity: 0.6;
}`;

		rulesminipreview.insertRule(ruleMTBG, 4);

if (DEBUG_UCLC) {
		console.log(`("PREVIEWCONTAINER") RULELIST[4]`, ruleList[4]);
		console.log("   FOR (BUILD MINIPVW) UCLC", pvwupper, pvwlower);
}
		insertPreview(pvwupper, pvwlower, "composite");

	} // PREVIEW TWO(LINE)












// (##TBD## SWITCH ARG-ORDER)
	function insertPreview(pvwupper, pvwlower,layout) {

// MTBG MUST BE CONVERTED TO ARRAY TO BE PASSED TO "ASSEMBLE MULTIPART"
// #TBD# ALSO MOVE THIS SPLITTING TO "ASSEMBLE"
			// TO ONLY PASS UNSPACED STRINGS BETWEEN FUNCTIONS *EVERYWHERE*

let pvwlowersplit = pvwlower.split(" ");
let pvwuppersplit = pvwupper.split(" "); // (IF EMPTY SPLITTING TO " ")
let snglspace;

// GET FROM "FONTDATA"
		let ucdata, ucpath, ucwidth;
		let lcdata, lcpath, lcwidth;
		let ucbox, lcbox;

	if (layout === "composite") {
// FOR MTBG ASSEMBLE_MULTIPART
// UPPERCASE
		if (pvwupper !== "") {
			ucdata = assembleMultiPart(pvwuppersplit);
			ucpath = ucdata.DDATA;
			ucwidth = ucdata.glyphwidth;
			ucbox = "7vw";
		} else {
			ucpath = "";
			ucwidth = 1;
			ucbox = "0vw";
		}
// LOWERCASE
		lcdata = assembleMultiPart(pvwlowersplit);
		lcpath = lcdata.DDATA;
		lcwidth = lcdata.glyphwidth;
		lcbox = "7vw"; // (VAR IS REDUNDANT // LOWERCASE ALWAYS "7vw")

													// INSERT FOR TWO-LINE PVW // COMPOSITE UCLC NNLC
		previewcontainer.innerHTML =
`
		<svg id="${pvwupper}" class="charbox" viewBox="0 0 ${ucwidth} 1160" style="height: ${ucbox};">
			<path class="icon-stroke chars" d="${ucpath}"></path>
		</svg>

		<svg class="minispacer">
		</svg>

		<svg id="${pvwlower}" class="charbox" viewBox="0 0 ${lcwidth} 1160" style="height: ${lcbox};">
			<path class="icon-stroke chars" d="${lcpath}"></path>
		</svg>
`;

	}



	if (layout === "single") {
// FOR SINGLE LOOK-UP DIRECTLY  // (ARRAY WILL HAVE SINGLE INDEX)
// LOOK-UP WANTS ARG === SIMPLE STRING "S"
// UPPERCASE
		if (pvwupper !== "") {
			ucdata = FONTDATA[pvwupper.toString()]; // (SINGLE "SPACED" IS STILL UNSPACED)
			ucpath = ucdata.data;
			ucwidth = ucdata.width;
			snglspace = "4";
		} else {
			ucpath = ""; 
			ucwidth = 1;
			snglspace = "0";
		}
// LOWERCASE
		lcdata = FONTDATA[pvwlower.toString()];
		lcpath = lcdata.data;
		lcwidth = lcdata.width;
		

													// INSERT FOR ONE-LINE PVW // SINGLE UCLC NNLC
		previewcontainer.innerHTML =
`
		<svg id="${pvwupper}" class="charbox" viewBox="0 0 ${ucwidth} 1160">
			<path class="icon-stroke chars" d="${ucpath}"></path>
		</svg>

		<svg class="minispacer" style="width: ${snglspace}px;">
		</svg>

		<svg id="${pvwlower}" class="charbox" viewBox="0 0 ${lcwidth} 1160">
			<path class="icon-stroke chars" d="${lcpath}"></path>
		</svg>
`;

	}


	} // END INSERT_PREVIEW








export { formatMinipreview, insertPreview };



