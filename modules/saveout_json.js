/* BLN ABC 0.9 (beta) A Primer for basic literacy development | Ein "Vorkurs" zur Alphabetisierung in Deutsch als Zweitsprache
 * Copyright (C) 2025 Jens Kreitmeyer <self@jenskreitmeyer.de>
 * This file is part of BLN ABC
 * (for the full length copyright notice see the HTML index file and "COPYING.txt")
 */

if (DEBUG_PIPE) {
	console.log('##MODULE## "SAVEOUT HTML" (PATH DATA ONLY) PART OF BLN ABC "STRESSTEST#04" (QUIZ) // 27-MAR-25');
	console.log('SET VERSION SAVEOUT @LINE ##69## IN "HANDLERS_BUTTONS"');
}
/* ##MEMO## FRAMES MUST BE ACCUMULATED TO A COMMON FILE // #TBD# FILESTRUCTURE */

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

																		// SHORT STAMP FOR FLIPBOOK // "20241206 135901"
	return timestamp = `${temp[2]}${temp[1]}${daynum} ${temp[3] + temp[4] + temp[5]}`;
}

let timeanddate = writeTimestamp();






																			// (NO EXTERNAL FILE)
		// / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / /
/*
var textFile = null;

const makeTextFile = function (text) {
	var data = new Blob([text], {type: "text/plain"});																	// /!\ THIS MIME-TYPE IS USED BY FIREFOX IGNORING ".HTML"
	// "IF WE ARE REPLACING A PREVIOUSLY GENERATED FILE WE NEED TO
	// MANUALLY REVOKE THE OBJECT URL TO AVOID MEMORY LEAKS"	
	if (textFile !== null) {
		window.URL.revokeObjectURL(textFile);
	}
		textFile = window.URL.createObjectURL(data);
		return textFile;
	};
*/



																		// (NO DOWNLOAD/EXPORT BLOB)
		// / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / /
/*
function packageDownload() {

console.log("(SAVEOUT)GLYPH/MTBG WIDTH", glyphwidth);
// NEW VAR IN "RENDER_TEMPLATE" @LINE ##21## // 03DEC24

	textFile = makeTextFile();
// MAKE LINK
	var link = document.createElement("a");
// MAKE FILENAME
										// FIFO ON ANDROID NEWLINES FILENAME // SAVES ".TXT"
																	// JS FILE_STRUCTURE
																	// ANDROID FILESYSTEM
// = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =
// ON FIRST SAVE OF LTR/GRAPHEME CREATE A "BASE"-FILE FOR ALL FURTHER ADDITIONS
// SAVE INDIVIDUAL FRAMES IN OBJ OR ARRAY-FORMAT (INDEXABLE)
// CAN DATA BE ADDED TO JSON(?) OR TEXT(?)
	link.setAttribute("download", `${SELECTED} ${timeanddate}.html`);


													// GET GRAPHEME-NAME AND INFO (SINGLE OR MTBG)
	let doctitle = (`my letter "${SELECTED}"${FONTINFO.get(SELECTED).info}${timeanddate}`);
				console.log("(DOCTITLE)", doctitle);
	let assembledText = writeFrameData(doctitle);
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
*/






// ##TEMP## DEMO ONLY
// GLOBAL VAR "FRAMEDATA"
// = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =
window.FRAMEDATA = [];



function writeFrameData() {

	let POLYLINE = DOM.trace.innerHTML;
	if (DEBUG_PIPE) {
		console.log(POLYLINE);
	}

																		// ADD TO DATAFILE 
									// #TBD# WRITE TO PERSISTENT STORAGE (TXT JSON)
		// / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / /

// FILENAME/HEADER SHOULD INCLUDE LTR/MTBG NAME (KEY)
// IF FILE HEADER IDENTIFIES GLYPH ("SELECTED") REMOVE FRAME FIRST INDEX
	let frame = [ [`${SELECTED}`], [`${timeanddate}`], [`${POLYLINE}`] ];

// CURRENT COLLECTION MAY HAVE "OLD" AND PREVIOUSLY "UNSEEN" LTR(S)
				// FOR TOP LEVEL STORAGE DATA TYPE "MAP" WOULD AVOID ADDING MULTIPLES
// FOR EXPORT SAVE SAME-TO-SAME (BY NAME LTR/MTBG) ONLY
	FRAMEDATA.push(frame);
	if (DEBUG_PIPE) {
		console.log("FRAMEDATA", FRAMEDATA);
	}


} // WRITE_FRAMEDATA





export { writeTimestamp, writeFrameData };

