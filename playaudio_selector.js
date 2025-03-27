/* BLN ABC 0.9 (beta) A Primer for basic literacy development | Ein "Vorkurs" zur Alphabetisierung in Deutsch als Zweitsprache
 * Copyright (C) 2025 Jens Kreitmeyer <self@jenskreitmeyer.de>
 * This file is part of BLN ABC
 * (for the full length copyright notice see the HTML index file and "COPYING.txt")
 */

if (DEBUG_PIPE) {
	console.log('##MODULE## "PLAYAUDIO" PART OF BLN ABC "STRESSTEST#04" (QUIZ) // 27-MAR-25');
}
/* /!\ SPLITTING SPEAK/SPELL FOR (SELECT)LISTITEMS AND FOR SELECTED IN "QUIZ" */
/* AUDIO FROM #RECPLAY# FOR TEMPLATE-AUDIO IS ALWAYS #PHONETIC# ONLY */


// ##MEMO## FILENAME
// ##TBD## UMLAUTS /!\
			// USE (AS IS) "SELECTED" == KEY"LABEL" (UNSPACED CHARS)
			// ##TBD## (BUT REPLACE ALL UMLAUTS WITH UTILITY) CURRENTLY BOTH WOTK IN AUDIO-URLS
// Ää // C3A4
// Öö // C3B6
// Üü // C3BC

import { parseAudioSelectlist } from './parse_audioselectlist.js';





// (ON BTN RECPLAY CLOSED)
function playAudioSelector(SELECTED) { // srcone, srctwo // STRINGS "BUCHSTABE" "LTRNAME" (SPELLING)

// (RETURN INCLUDES DIRECTORY)
	let srcs = parseAudioSelectlist(SELECTED);
if (DEBUG_AUDIO) {
	console.log("(PLAYAUDIO SELECTOR) SOURCES", srcs);
}
	let srcone = srcs[0];
	let srctwo = srcs[1];
	let audioElementOne;
	let audioElementTwo;

if (DEBUG_AUDIO) {
	console.log(`PLAY AUDIO ONE ${srcone} TWO ${srctwo}`);
}

/* ––––––––––––  ––––––––––––  ––––––––––––  ––––––––––––  ––––––––––––  ––––––––––––  –––––––––––– */
	if (srcone) { // HAS BOTH IF IT HAS FIRST	== SPELL
		audioElementOne = new Audio(srcone);

		audioElementOne.addEventListener("loadedmetadata", (event) => {
  		//console.log("The duration and dimensions of the media and tracks are now known.");
			if (DEBUG_AUDIO) {
				console.log(`\t\t\t(AUDIOELEMENT ONE) DURATION ${audioElementOne.duration}`);
			}
		});

// ENDED // "CALLBACK" PAYLOAD
		audioElementOne.addEventListener("ended", (event) => {
			if (DEBUG_AUDIO) {
				console.log(`\t\t\t(AUDIOELEMENT ONE) ENDED ${audioElementOne.src} ENDED ${audioElementOne.ended}`);
			}
			audioElementTwo = new Audio(srctwo);
			audioElementTwo.play();
		});

		audioElementOne.addEventListener("error", (event) => {
			if (DEBUG_AUDIO) {
				console.error(`Error ${audioElementOne.error.code}; details: ${audioElementOne.error.message}`);
			}
		});

		audioElementOne.play();

/* ––––––––––––  ––––––––––––  ––––––––––––  ––––––––––––  ––––––––––––  ––––––––––––  –––––––––––– */
	} else { // ONLY SOURCE TWO == SPEAK																														// ONE = "UNDEFINED"
		audioElementTwo = new Audio(srctwo);

		audioElementTwo.addEventListener("loadedmetadata", (event) => {
  		//console.log("The duration and dimensions of the media and tracks are now known.");
			if (DEBUG_AUDIO) {
				console.log(`\t\t\t(AUDIOELEMENT TWO) DURATION ${audioElementTwo.duration}`);
			}
		});

		audioElementTwo.addEventListener("error", (event) => {
  		console.error(`Error ${audioElementTwo.error.code}; details: ${audioElementTwo.error.message}`);
		});

		audioElementTwo.play();

	}

} // PLAY_AUDIO




export { playAudioSelector };


