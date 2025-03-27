/* BLN ABC 0.9 (beta) A Primer for basic literacy development | Ein "Vorkurs" zur Alphabetisierung in Deutsch als Zweitsprache
 * Copyright (C) 2025 Jens Kreitmeyer <self@jenskreitmeyer.de>
 * This file is part of BLN ABC
 * (for the full length copyright notice see the HTML index file and "COPYING.txt")
 */

if (DEBUG_PIPE) {
	console.log('##MODULE## "SAVEOUT HTML" (STANDALONE VIEW) PART OF BLN ABC "STRESSTEST#04" (QUIZ) // 27-MAR-25');
	console.log('SET VERSION SAVEOUT @LINE ##69## IN "HANDLERS_BUTTONS"');
}
/* MIME-TYPE OF BLOB CHANGED TO "TEXT/HTML" @LINE ##54## */




import { glyphwidth } from './render_template.js';





																			// WRITE TIMESTAMP
const writeTimestamp = function () {
	let datum = new Date(); // RAW GMT+0200
	let options = {
		//weekday: 'short', // short
		year: 'numeric',
		month: 'numeric', // short
		day: 'numeric',
		hour: 'numeric',
		minute: 'numeric',
		second: 'numeric'
	};
	let timestamp = new Intl.DateTimeFormat('de-DE', options).format(datum); //.toUpperCase();
	let re = /\.|,|:/g;
	timestamp = timestamp.replace(re, ' ');
	re = /  /g; 																																			// (REMOVE DBL WS)
	timestamp = timestamp.replace(re, ' ');
	let temp = timestamp.split(' ');
	let daynum = temp[0].length < 2 ? "0" + temp[0] : temp[0]; 												// PAD SINGLE DIGIT (DAY)

																		// SHORT STAMP FOR FLIPBOOK
	return timestamp = `${temp[2]}${temp[1]}${daynum} ${temp[3] + temp[4] + temp[5]}`;
}






var textFile = null;

const makeTextFile = function (text) {
	var data = new Blob([text], {type: "text/html"}); // LINE ##54##
	
	// "IF WE ARE REPLACING A PREVIOUSLY GENERATED FILE WE NEED TO
	// MANUALLY REVOKE THE OBJECT URL TO AVOID MEMORY LEAKS"	
	if (textFile !== null) {
		window.URL.revokeObjectURL(textFile);
	}
		textFile = window.URL.createObjectURL(data);
		return textFile;
	};






																			// EXPORT BLOB
		// / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / /
function packageDownload() {
	if (DEBUG_PIPE) {
		console.log("(SAVEOUT) GLYPH/MTBG WIDTH", glyphwidth);
	}

	textFile = makeTextFile();
// MAKE LINK
	var link = document.createElement("a");
// MAKE FILENAME
// FIFO ON ANDROID NEWLINES FILENAME // SAVES ".TXT"
	link.setAttribute("download", `${SELECTED} ${writeTimestamp()}.html`);

													// GET GRAPHEME-NAME AND INFO (SINGLE OR MTBG)
	let doctitle = (`my letter "${SELECTED}"${FONTINFO.get(SELECTED).info}${writeTimestamp()}`);
	if (DEBUG_PIPE) {
		console.log("(DOCTITLE)", doctitle);
	}
	let assembledText = writeViewTemplate(doctitle);
	link.href = makeTextFile(assembledText);
	document.body.appendChild(link);

												// "WAIT FOR THE LINK TO BE ADDED TO THE DOCUMENT"
      											// REMOVE LINK // RESTORE TEMPLATE-GLYPH 
    	window.requestAnimationFrame(function () {
     	 var event = new MouseEvent("click");
      	link.dispatchEvent(event);
      	document.body.removeChild(link);
			});

	} // PACKAGE_DOWNLOAD






function writeViewTemplate(doctitle) {

// console.log("ANGLE", document.documentElement.style.getPropertyValue('--angle'));
// console.log("LAYERHEIGHT", document.documentElement.style.getPropertyValue('--layerHeight'));
// console.log("TRACEWEIGHT", document.documentElement.style.getPropertyValue('--traceweight'));

		// (SCALED WITH CLIENT DIMENSIONS)
let TRACEWEIGHT = document.documentElement.style.getPropertyValue('--traceweight');

		// (IS VH OR VW DEPENDING ON ORIENTATION)
// LAND/90DEG var --layerheight == 00.00 VW
// PORT/0DEG  var --layerheight == 00.00 VH
let LAYERHEIGHT = parseFloat(document.documentElement.style.getPropertyValue('--layerHeight'));
LAYERHEIGHT = parseFloat(LAYERHEIGHT / 100).toFixed(3); // / 100; // USE VH/VW AS PERCENTAGE ONLY

		// CONDITIONAL FOR PORT=SINGEL/LAND=MTBG
let RMAX; // "RULER MAX WIDTH"
let ANGLE = document.documentElement.style.getPropertyValue('--angle'); // (STRING INCLUDES "deg")
ANGLE === "0deg" ? RMAX = maxsinglewidth : RMAX = maxcompwidth;
				// IF NECESSARY THIS COULD ALSO USE THE CUT-OFF FOR "PORT/LAND" 
				// "IF (IMPORTED VAR) GYLPHWIDTH <= MAXSINGLE = MAXSINGLE ELSE MAXCOMP"
let ORIENTVAL; // (ORIENTATION VALUE)
ANGLE === "0deg" ? ORIENTVAL = DIM.clienth * LAYERHEIGHT : ORIENTVAL = DIM.clientw * LAYERHEIGHT; 
ORIENTVAL = ORIENTVAL.toFixed(2); // (RETURNS STRING)

let POLYLINE = DOM.trace.innerHTML;

																					// SETTINGS 
		// / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / /
// KEEP OPTIONS LIVE IN FLIPBOOK VIEWER
// let CON = "hsla(120 100% 50% / 0.5)"; // GREEN
// let COFF = "hsla(0 100% 50% / 0.1)"; // RED
let CON = "hsla(120 0% 0% / 0.5)"; // (ALMOST) BLACK
let COFF = "hsla(0 0% 0% / 0.1)"; // LIGHT GRAY
let CBG = "hsla(130 0% 98% / 1)"; // OFF WHITE
let vis = "visible"; // (FOR RULERS)
let hid = "hidden"; // (FOR FONT-HEIGHT RULERS) 																									// APPLIES TO ATTRIBUTE "VISIBILITY"

	if (DEBUG_PIPE) {
		console.log("CLIENTW", DIM.clientw, "CLIENTH", DIM.clienth, "LAYERHEIGHT", LAYERHEIGHT, 
		"ORIENTVAL", ORIENTVAL, typeof ORIENTVAL, "RULERMAX", RMAX);
	}



																				// HTML TEMPLATE
		// / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / /
// ##TBD## USED IDENTICAL IN #MODUL# "SAVEOUT"

let viewtemplate =
`<!DOCTYPE html>
<html lang="en" id="app">
<head>
	<meta charset="utf-8" />
	<meta name="viewport" content="width=device-width, initial-scale=1" />
	<title>${doctitle}</title>
<style>
	:root {
		--ON: ${CON};
		--OFF: ${COFF};
		--CBG: ${CBG};
		--VIZ: ${vis};
		--HID: ${hid};
	}
	* {
		box-sizing: border-box;
	}
	body {
		margin: 0px;
		padding: 0px;
		background-color: var(--CBG);
	}
	#touchUIwrapper {
		position: absolute;
		display: flex;
/* FIXED TO CLIENTWIDTH AT RUNTIME */
		width: ${DIM.clientw}px;
/* FLEXIBLE HEIGHT */
		height: 100%;
		justify-content: center;
		align-items: center;
		overflow: hidden;
		touch-action: none;
		border: 1px dashed lime; /* SHOW FIXED FRAME */
	}
	#tracelayer {
		position: absolute;
	}
	.trace {
		fill: none;
		stroke: hsla(0 0% 50% / 1);
		stroke-width: ${TRACEWEIGHT};
		stroke-linecap: round;
		stroke-linejoin: round;
	}
	.trace .ontrack {
		stroke: var(--ON);
	}
	.trace .offtrack {
		stroke: var(--OFF);
		visibility: var(--VIS);
	}
.diatrace {
	fill: var(--ON);
	stroke: none;
}
	#rulerslayer {
		visibility: var(--VIS);
		position: absolute;
		transform: rotate(${ANGLE});
		height: ${ORIENTVAL}px; 						
	}
	.rulerline {
		fill: none;
		stroke: rgba(0 255 0 / .1);
		stroke-width: 8px;
	}
	.edge {
		stroke: rgba(0 255 255 / .25);
		visibility: var(--HID);
	}
	.base {
		stroke: rgba(0 255 0 / .25);
	}
</style>
</head>
<body>
<!-- DOM-STRUCTURE LAYERS FOR SAVEOUT -->
	<div id="touchUIwrapper" name="WRAPPER">
<!-- EXPANDED FULL-WIDTH RULERS -->
	<svg id="rulerslayer" viewBox="0 0 ${RMAX} 1160" xmlns="http://www.w3.org/2000/svg">
		<g id="rulers" class="rulerline" name="RULERS">
			<line class="edge" x1="0" y1="2" x2="${RMAX}" y2="2"></line>
   	 <line x1="0" y1="171" x2="${RMAX}" y2="171"></line>
   	 <line x1="0" y1="331" x2="${RMAX}" y2="331"></line>
   	 <line class="base" x1="0" y1="932" x2="${RMAX}" y2="932"></line>
   	 <line class="edge" x1="0" y1="1156" x2="${RMAX}" y2="1156"></line>
		</g>
	</svg>
<!-- TRACE POLYLINES -->
	<svg id="tracelayer" viewBox="0 0 ${DIM.clientw} ${DIM.clienth}" xmlns="http://www.w3.org/2000/svg">
		<g id="trace" class="trace" name="TRACE">
			${POLYLINE}
		</g>
	</svg>
	</div>
</body>
</html>`;

return viewtemplate;

} // WRITE_VIEW





export { writeTimestamp, packageDownload };

