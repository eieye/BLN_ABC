/* BLN ABC 0.9 (beta) A Primer for basic literacy development | Ein "Vorkurs" zur Alphabetisierung in Deutsch als Zweitsprache
 * Copyright (C) 2025 Jens Kreitmeyer <self@jenskreitmeyer.de>
 * This file is part of BLN ABC
 * (for the full length copyright notice see the HTML index file and "COPYING.txt")
 */

if (DEBUG_PIPE) {
	console.log('##MODULE## "PLAYAUDIO_PHONETIC" PART OF BLN ABC "STRESSTEST#04" (QUIZ) // 27-MAR-25');
}




// (ON BTN RECPLAY CLOSED)
function playAudioPhonetic(SELECTED) {


// SOURCE PATH
// IN HIRA LETTERNAME = LETTER PHONETIC
	let dir = "./audio/speak/" // ##TBD## (SEPARATING "SPEAK"/"SPELL" FOLDER/FILENAMES MAYBE REDUNDANT BUT BETTER READABILITY)

// (IN HIRA)
// "SPELL" = CONCATENATE "MOJI" WITH LETTERNAME 
// "SPEAK" = LETTERNAME
	//let AUDIOONE = new Audio(dir + "moji1femhira_spell.mp3"); // JAP. "BUCHSTABE"(="CHARACTER")/"MOJI"
	
// (IN LATIN)
// "SPELL" = CONCATENATE "(GROSS/KLEIN)BUCHSTABE" WITH LETTERNAME 
// "SPEAK" = PHONETIC
																				// ##### ALL FILES FOR "SPEAK" ARE W/O ADDED TYPE ("_SPELL") FOR STRAIGHT-FROM-TTS #####
	let AUDIOTWO = new Audio(`${dir}${SELECTED.toLowerCase()}.mp3`);

	if (DEBUG_AUDIO) {
		console.log("(PLAYAUDIO SPEAK)", AUDIOTWO);
	}

	AUDIOTWO.addEventListener("ended", (event) => {
		console.log("AUDIOTWO/TEMPLATE END ", AUDIOTWO.ended);
		console.log("AUDIOTWO/TEMPLATE DUR ", AUDIOTWO.duration);
		//console.log("AUDIOTWO TIME", AUDIOTWO.currentTime);
		console.log(`\t(AUDIOTWO/TEMPLATE) ENDED ${AUDIOTWO.src}`);
// PAYLOAD
		AUDIOTEMPLATEPLAYED = true;
		console.log("AUDIOTWO/TEMPLATE PLAYED ", AUDIOTEMPLATEPLAYED);
	});

/*
// LISTENERS ONE
		AUDIOONE.addEventListener("loadedmetadata", (event) => {
  		//console.log("The duration and dimensions of the media and tracks are now known.");
			//console.log("AUDIOONE END ", AUDIOONE.ended);
			console.log("AUDIOONE DUR ", AUDIOONE.duration);
			console.log("AUDIOONE TIME", AUDIOONE.currentTime);
		});

		AUDIOONE.addEventListener("error", (event) => {
  		console.error(`Error ${AUDIOONE.error.code}; details: ${AUDIOONE.error.message}`);
		});

// "CALLBACK"
		AUDIOONE.addEventListener("ended", (event) => {
			console.log(`\t\t\t(AUDIOONE) ENDED ${AUDIOONE.src} ENDED ${AUDIOONE.ended} ––––––––––––––––`);
			AUDIOTWO.play();
		});

		AUDIOONE.play();
*/
		AUDIOTWO.play();







} // PLAY_AUDIO




export { playAudioPhonetic };



