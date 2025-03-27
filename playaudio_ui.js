/* BLN ABC 0.9 (beta) A Primer for basic literacy development | Ein "Vorkurs" zur Alphabetisierung in Deutsch als Zweitsprache
 * Copyright (C) 2025 Jens Kreitmeyer <self@jenskreitmeyer.de>
 * This file is part of BLN ABC
 * (for the full length copyright notice see the HTML index file and "COPYING.txt")
 */

if (DEBUG_PIPE) {
	console.log('##MODULE## "PLAYAUDIO_UI" PART OF BLN ABC "STRESSTEST#04" (QUIZ) // 27-MAR-25');
}

//var PBR = 1.0; // (SETTING) PLAYPACKRATE SPEECH ONLY
//console.log(`(PLAYAUDIO UI) IN SCOPE "AUDIOLOCK" ${AUDIOLOCK}`);







// (ON TRACING COMPLETION)
function playAudioUI(src) {
	src = `./audio/ui/${src}.mp3`;
	//console.log("AUDIO_UI SRC", src);

	if (!AUDIOLOCK) {
		console.log(" ( ( ( ( ( ( ( ( (  BING  ) ) ) ) ) ) ) ) ) ");
		//console.log("SELECTED, TRACEFINISHED, AUDIOLOCK", SELECTED, TRACEFINISHED, AUDIOLOCK);

		const audioElement = new Audio(src);
// 	audioElement.addEventListener("loadeddata", () => {
//   	let duration = audioElement.duration;
// 	});
// 	audioElement.addEventListener("click", (e) => {
// 		console.log(e);
// 		console.log(`ALT KEY: ${e.altKey}`);
// 	});

	//console.log("audioElement", audioElement);
	audioElement.play();

	}

	AUDIOLOCK = true; // ONLY PLAY ONCE(!) // (CAN STILL BE DRAWING ON OUT-POINT)

} // PLAY_AUDIO_UI






export { playAudioUI };


