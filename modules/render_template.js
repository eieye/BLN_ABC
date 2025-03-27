/* BLN ABC 0.9 (beta) A Primer for basic literacy development | Ein "Vorkurs" zur Alphabetisierung in Deutsch als Zweitsprache
 * Copyright (C) 2025 Jens Kreitmeyer <self@jenskreitmeyer.de>
 * This file is part of BLN ABC
 * (for the full length copyright notice see the HTML index file and "COPYING.txt")
 */

if (DEBUG_PIPE) {
	console.log('##MODULE## "RENDER_TEMPLATE" PART OF BLN ABC "STRESSTEST#04" (QUIZ) // 27-MAR-25');
	console.log("\t\t\tPORT/LAND SWITCH FOR NAVIGATION AND RECPLAY IS DISABLED @LINE ##89/120##");
}


//console.log('\t\t"VIEWPORT" #TEMP# CHANGED TO "DOCUMENT" FOR DEVICE-DIMENSIONS // @LINE ##44##');
// #UNITESTS# ORIENTATION/TEMPLATE DATA/PAGE SCALING @LINE ##149##
// PARSING FLOATS TO FIXED(2) FIXED (NO MULTIPLACATION AFTER PARSING)
// CALLING "RENDER CONTROLPOINTS" (LINE ##237##) FOR MTBG (@##92##) AND SINGLE (@##122##)


FONTDATA ? console.log("\t\t\t\t\tFONTDATA . . . IN RENDERTEMPLATE OK") : console.log("\t\t\t\t\tFONTDATA . . . IN RENDERTEMPLATE FAILED");


import { assembleMultiPart } from './assemble_multipart.js';
import { sampleTemplate } from './sample_bezierObj.js';
import { expandSVGctrlpts, renderControlPoints } from './expand_svg.js';

var PORT = true; // ORIENTATION DEFAULT (LAUNCHER DEFAULT/INIT IS SINGLE LTR)
// #TEMP# NEW GLOBAl "glyphwidth" (COMPOSITE OR SINGLE)
// ##TBD" ADD COMPOSITE WIDTHS TO FONT#INFO FOR COMPOSITE FOR ACCESS BY "SAVEOUT"
var glyphwidth; // LINE ##21##


															// NOT IMPLEMENTED IN THIS VERSION
//var FULL;
// ##TBD## "FULLSCREEN" IS PROBABLY REDUNDANT/ POSS. INTERFERING WITH PWA MODE "STANDALONE"
// (IF NEEDED #MUST# BE TRIGGERED BY USER-ACTION ON BTN/PROMPT "ALLOW FULLSCREEN"
// WITH "document.documentElement.requestFullscreen()")





																				// GLOBAL SPECS
// ––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
// VIEWPORT // FOR DEBUGGIG (REGISTRATION TRACELAYER) TMP SET TO CLIENT-DIMENSIONS // LINE ##44##
	var devicevw = document.documentElement.clientWidth; //window.visualViewport.width;
	var devicevh = document.documentElement.clientHeight; //window.visualViewport.height;



// RENDERPARAM
// window.strokeweight; // FROM INDEX // ##TBD## CONFIG
	var fontscale;																																										// PROPORTIONAL FOR SINGLES/PORT COMPOSITES/LAND
	window.traceweight; 	// (ALSO) PASSED TO CSS-VARIABLE // MADE AVAILABLE FOR HANDLERS 						// SCALED WITH FONTSCALE
	var rulerstofullwidth; 																																						// EXPAND LINES TO FULL WIDTH OF "HORIZON"




																				// RENDER GRAPHEME
// ––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
// CALLED FROM EVENTHANDLER "CLICK" ON OPTIONS/SELECT
// ARG "KEY" IS SINGLE OR COMPOSITE

function renderTemplate(key) {
	//console.log("RENDER KEY", key); // IS SINGLE CHAR ("LABEL") FOR SINGLES // SPACED CHARS FOR MTBG ("SPACED LABEL")
	let radius; // DEBUGGING BEZIER POINTS
	let DDATA;
	let gcpta;  // GLYPH(BEZIER)#CONTROLPOINTS#ARRAY
	//let glyphwidth; // NEW VAR // 03DEC24
// (SPLIT (MTBG) TO ARRAY OF CONSTITUENTS)
	let keychars = key.split(" "); 																												// WAS "KEYPARTS" == EACH GLYPH IN GRAPHEME SPACED


						// REGARDLESS OF WIDTH ALL GRAPHEMES #MORE THAN ONE CHAR# ARE COMPOSITES(!)
// FORK BY NUM OF CHARS IN KEY
// ALTERNATIVELY BY LARGEST (WIDEST) SINGLE MEMBER "GLYPHWIDTH LARGER MAX(SINGLE)WIDTH"


	if (keychars.length > 1) {
// MULTI-PART GRAPHEME
// – – – – – – – – – – – – – – – – – – – – – – – – – – – – – – – – – – – – – – – – – – – – – – –
		let temp = assembleMultiPart(keychars);
		DDATA = temp.DDATA;
						// SVG-"COLUMNS" WITH LINEBREAKS AFTER FLAGS "M"/"C" // CHECK PARSING
						//console.log("(ASSEMBLE RETURN) DDATA\n", DDATA);
		glyphwidth = temp.glyphwidth; 																											// GET COMPOSITE GLYPHWIDTH FROM RETURN-OBJECT

// SET ORIENTATION ##LAND#
		PORT = 0;
		document.documentElement.style.setProperty('--angle', '90deg');
// SCALE LAND PERPENDICULAR TO HORIZON == PERCENT OF ##DEVICEWIDTH##
		let fitH = devicevh / maxcompwidth; 																								// 800 / 2096 = 0.381679
		let propw = fontHeight * fitH; 																											// 1160 * 0.381679 = 442.7480
		fontscale = Number.parseFloat(propw / devicevw * 100).toFixed(2);										// 442.7480 / 480 * 100 (AS PERCENT)
		document.documentElement.style.setProperty('--layerHeight', `${fontscale}vw`); 			// "tsch"=2096 92.2[39]%

// MENU
						// ####### ####### ####### TBD ADJUST PORT/LAND SWITCH ###### ####### #######
		//menuUI.classList.replace("port", "land"); // LINE ##89##

// RULERS
		rulerstofullwidth = maxcompwidth;
// STROKE
		window.traceweight = Number.parseFloat(strokeweight * devicevh / maxcompwidth).toFixed(2);
		//console.log("TRACEWEIGHT", traceweight, typeof traceweight);
		radius = Number.parseFloat(fontscale / 25).toFixed(2);

// GET CONTROLPTS
		gcpta = expandSVGctrlpts(DDATA, keychars); // "SVG" AS FROM ASSEMBLE // LINE ##92##


	} else {
// SINGLE-CHAR GRAPHEME
// – – – – – – – – – – – – – – – – – – – – – – – – – – – – – – – – – – – – – – – – – – – – – – –
		DDATA = FONTDATA[key].data;
		 				// SVG-FORMATTED // CHECK PARSING
						//console.log("(FROM JSON) DDATA\n", DDATA);
		glyphwidth = FONTDATA[key].width;

// SET ORIENTATION ##PORT##
		PORT = 1;
		document.documentElement.style.setProperty('--angle', '0deg');
// SCALE PORT PERPENDICULAR TO HORIZON == PERCENT OF ##DEVICEHEIGHT##
		let fitW = devicevw / maxsinglewidth; 																							// 480 / 1000 = 0.48
		let proph = fontHeight * fitW; 																											// 1160 * 0.48 = 556.8
		fontscale = Number.parseFloat(proph / devicevh * 100).toFixed(2);										// 556.8 / 800 * 100 (AS PERCENT)
		document.documentElement.style.setProperty('--layerHeight', `${fontscale}vh`); 			// "W"=1000 (69.6)

// MENU
						// ####### ####### ####### TBD ADJUST PORT/LAND SWITCH ###### ####### #######
		//menuUI.classList.replace("land", "port"); // LINE ##120##

// RULERS
		rulerstofullwidth = maxsinglewidth;
// STROKE
		window.traceweight = Number.parseFloat(strokeweight * devicevw / maxsinglewidth).toFixed(2);
		//console.log("TRACEWEIGHT", traceweight, typeof traceweight);
		radius = Number.parseFloat(fontscale / 25).toFixed(2);

// GET CONTROLPTS
		gcpta = expandSVGctrlpts(DDATA, keychars); // "SVG" AS FROM FONTDATA // LINE ##122##

	} // END ELSE
if (DEBUG_PIPE) {
	console.log("(RENDER) FONTSCALE", fontscale);
}


																			// UNITESTS // LINE ##149##
/*
console.log('======================== UNITTESTS "RENDERTEMPLATE" ========================');
// ORIENTATION
	PORT ? console.log("====PORT====") : console.log("====LAND====");
	PORT ? console.log(`MAXSINGLEWIDTH ${maxsinglewidth}`) : "";
// TEMPLATE DATA
	console.log(`KEY ${key}
	GLYPHWIDTH ${glyphwidth}
	DDATA\n${DDATA}`);
// PAGE SCALING
	console.log(`FONTHEIGHT ${fontHeight}
	CAPHEIGHT ${capHeight}
	XHEIGHT ${xHeight}
	BASELINE ${baseline}
	VVP WIDTH ${devicevw}
	VVP HEIGTH ${devicevh}
	FONTSCALE ${fontscale}
	FULLWIDTH ${rulerstofullwidth}
	TRACEWEIGHT ${traceweight}`);
*/







										  					// BUILD ALL LAYERS TO ORIENTATION
// ––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
// ##MEMO## VALUE(S) (GLYPHWIDTH) IN "VIEWBOX" IN FONTDATA" 
// ARE STILL INDISPENSABLE FOR COMPOSITING MTBG

											// BUILD "BESPOKE" TYPEBOX FROM COMPUTED DIMENSIONS
// – – – – – – – – – – – – – – – – – – – – – – – – – – – – – – – – – – – – – – – – – – – – – – –
// VIEWBOX
	document.documentElement.style.setProperty('--strokeweight', `${strokeweight}`); // LINE ##172##
	document.documentElement.style.setProperty('--traceweight', `${traceweight}`);

	let viewbox = `0 0 ${glyphwidth} ${fontHeight}`;
	let fullwidthviewbox = `0 0 ${rulerstofullwidth} ${fontHeight}`;

// FULL-WIDTH RULERS
// MAGIC NUMBERS "2" (VERTICAL ORIGIN+2) AND "1156" (FONTHEIGHT-4) 
// COMPENSATE FOR PIXEL-"CLIPPING" AT HORIZONTAL VIEWBOX BORDERS
	rulerslayer.setAttribute('viewBox', fullwidthviewbox);
	rulers.innerHTML =
`    <line class="edge" x1="0" y1="2" x2="${rulerstofullwidth}" y2="2"></line>
    <line x1="0" y1=${capHeight} x2="${rulerstofullwidth}" y2=${capHeight}></line>
    <line x1="0" y1=${xHeight} x2="${rulerstofullwidth}" y2=${xHeight}></line>
    <line class="base" x1="0" y1=${baseline} x2="${rulerstofullwidth}" y2=${baseline}></line>
    <line class="edge" x1="0" y1="1156" x2="${rulerstofullwidth}" y2="1156"></line>`;

// TEMPLATE
	templatelayer.setAttribute('viewBox', viewbox);
// TYPEBOX
	typebox.innerHTML =
`<rect width=${glyphwidth} height=${fontHeight} />
<line x1="0" y1=${capHeight} x2=${glyphwidth} y2=${capHeight} />
<line x1="0" y1=${xHeight} x2=${glyphwidth} y2=${xHeight} />
<line x1="0" y1=${baseline} x2=${glyphwidth} y2=${baseline} />`;  	

// PATH
	template_pathdata.setAttribute("d", DDATA); 																					// TEMPLATE="DATA" AS IS IN JSON

// SAMPLES (OUTLINES)
	sampleslayer.setAttribute('viewBox', viewbox);
// TRACE
	tracelayer.setAttribute('viewBox', `0 0 ${devicevw} ${devicevh}`); 										// TRACE MUST BE DEVICE 1:1
// CRAWLER (EL-FROM-POINT)
	crawlerlayer.setAttribute('viewBox', viewbox);
// ANIMATION
	vorschriftlayer.setAttribute('viewBox', viewbox);
// CONTROLPOINTS BEZ-CURVE
	controlptslayer.setAttribute('viewBox', viewbox);
// OUTLINES (VISUAL INSPECTION OF CRAWL_ELEMS)
	outlineslayer.setAttribute('viewBox', viewbox);
// SFXLAYER
	DOM.specialfxlayer.setAttribute('viewBox', viewbox);


									// REVERSE PROCESS SVG TO BEZIER#CONTROLPOINTS#ARRAY ("GCPTA")
										  		// ##TEMP## RENDER BEZIER CONTROLPTS TO UI
// ––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
	controlpts.replaceChildren(""); // DELETE PREVIOUS PTS(!) // (SEPARATED FROM CLEAR TRACE)
// (DEBUG FOR RENDERING CTRL-PTS IS SET AT FUNCTION IN "REVERSE_SVG")
//console.log("(EXPAND SVG) DEBUG_PIPE", DEBUG_PIPE); // VAR IS IN SCOPE
	if (DEBUG_PIPE) {
		renderControlPoints(gcpta, keychars); // LINE ##237## // GCPTA FROM MTBG ##92## OR SINGLE ##122##
	}


										  		// PASS PIPELINE TO "SAMPLE_GRAPHEME" FUNCTION ...
// ––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
	sampleTemplate(gcpta, keychars);


} // END RENDER_TEMPLATE




export { renderTemplate, glyphwidth };

