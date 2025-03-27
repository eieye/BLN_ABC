/* BASED ON 
 * "A sample MDN app that uses getUserMedia and MediaRecorder API for recording 
 * audio snippets, and The Web Audio API for visualizations.
 * You can [play with the live demo](https://mdn.github.io/web-dictaphone/)."
 */

/* BLN ABC 0.9 (beta) A Primer for basic literacy development | Ein "Vorkurs" zur Alphabetisierung in Deutsch als Zweitsprache
 * Copyright (C) 2025 Jens Kreitmeyer <self@jenskreitmeyer.de>
 * This file is part of BLN ABC
 * (for the full length copyright notice see the HTML index file and "COPYING.txt")
 */

if (DEBUG_PIPE) {
	console.log('##NEWRECPLAY## PART OF BLN ABC "STRESSTEST#04" (QUIZ) // 27-MAR-25');
}





/*
const btnstartrecording = document.getElementById('btnstartrecording'); // (CHECK)
const btnstoprecording = document.getElementById('btnstoprecording'); // (CHECK)
btnstoprecording.disabled = true; // DISABLE WHILE NOT RECORDING
*/ 

/*
// (NOT FOR DEMO)
// DOWNLOAD AUDIO
const btndownload = document.getElementById('btndownload');
btndownload.addEventListener('pointerup', download);
const btnresetrec = document.getElementById('btnresetrec');
btnresetrec.addEventListener('pointerup', (e) => {
	alert("#TBD# KILL BLOB");
});
*/

/*
// INPUT LEVEL
const inputlevelcontainer = document.getElementById('inputlevelcontainer'); // (CHECK)
const inputlevelbar = document.getElementById('inputlevelbar'); // (CHECK)
*/



// ––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
// CROSS-BROWSER AUDIO
//let AudioContext = window.AudioContext || window.webkitAudioContext;
//let audioCtx = new AudioContext();

// OLDER SYNTAX
//let audioCtx; // ALSO @LINE ##46##
  if(window.webkitAudioContext) {
    audioCtx = new window.webkitAudioContext(); // OK FOR SAFARI 13.1.2
  } else {
    audioCtx = new window.AudioContext();
  }

// CURRENT (LAST) RECORDING
let audioRecObj;

// TEMP // GLOBAL FOR DOWNLOAD
var blob;







																		// WRAP EVERYTHING IN "MAIN"

// (THE BIG IF) // API SUPPORTED
if (navigator.mediaDevices.getUserMedia) {																											  // TRUE IF SUPPORTED
																																																	// TRIGGERS PROMPT FOR PERMISSION
	console.log('getUserMedia supported.');
	const constraints = { audio: true };																													  // RECORD AUDIO ONLY
	let chunks = [];

 																						// PROMISE
																// "SUCCESS" = PERMISSION GRANTED
	let onSuccess = function(stream) {

		let mediaRecorder = new MediaRecorder(stream);																							  // GET STREAM
		visualizeAmp(stream);																																				  // DISPLAY RECORDING-AMPLITUDE BAR

		btnstartrecording.onpointerup = function() {
		//btnstartrecording.addEventHandler('pointerup', (e) => function() {
      												// ##WATCH ITEM##
															// (IF NOT STOPPED WHEN CLOSING "RECPLAY")
															// ##NEXT GEN## // MOVE THIS TO "BTNCLOSERECPLAY"
      if (mediaRecorder.state === "recording") {
      	console.log("(IF NOT STOPPED) state=" + mediaRecorder.state);
      	mediaRecorder.stop();
      	console.log("(IF NOT STOPPED) state=" + mediaRecorder.state);
      }
			mediaRecorder.start();																																			// ###START###
      console.log("recorder start state=" + mediaRecorder.state);

      btnstartrecording.style.background = "rgba(0, 0, 0, 0.1)";																	// ###BTN STYLE###
      btnstoprecording.disabled = false;
      btnstartrecording.disabled = true;
    }
    //); // END START (ADD EVENTHANDLER)

		btnstoprecording.onpointerup = function() {
		//btnstoprecording.addEventHandler('pointerup', (e) => function() {
      mediaRecorder.stop();																																			  // ###STOP###
      			console.log("recorder stop state=" + mediaRecorder.state);
      btnstartrecording.style.background = "";																										// ###BTN STYLE###
      btnstartrecording.style.color = "";
      btnstoprecording.disabled = true;
      btnstartrecording.disabled = false;
    }
    //); // END STOP (ADD EVENTHANDLER)



																					// GET RAW DATA

    mediaRecorder.onstop = function(e) {																													// ###ONSTOP###
					console.log("data available after MediaRecorder.stop() has been called.");

																		// REVIEW FILE-FORMAT OPTIONS
      blob = new Blob(chunks, { 'type' : 'audio/ogg; codecs=opus' });			    										// ##2## PUSH DATA IN "CHUNKS" TO "BLOB"
      //blob = new Blob(chunks, { 'type' : 'audio/mp3' }); // TBD // NOT SAVED AS MP3

      chunks = [];
      const audioURL = window.URL.createObjectURL(blob);																					// CREATE URL TO ACCESS BLOB-DATA
			audioRecObj = new Audio(audioURL);



																		// GET BLOB-DATA FOR SCRUBBER

			blob.arrayBuffer()																																					// RETURNS BLOB AS BINARY DATA
				.then( buffer => audioCtx.decodeAudioData(buffer) ) // TBD MAYBE DBL
				.then( prepareUI )
				.catch( console.error );

			function prepareUI( audioBuf ) {
				let source;

//recscrubbercontainer.addEventListener( "pointermove", (e) => { // (ALTERN SYNTAX)
				recscrubbercontainer.onpointermove = e => {
					if (isdown) {
						if (source) { 
							source.stop(0);
						}
						source = audioCtx.createBufferSource(); // (CHECK)
						source.buffer = audioBuf; // (CHECK)
						source.connect(audioCtx.destination); // (CHECK)
						
  				  const offset = clickPosition * audioBuf.duration; // (CHECK)
// (LONGER DURATION WILL CAUSE "ECHO"-LIKE EFFECT)
						const duration = 0.2; // WAS 0.1 // (#TBD# 0.2 MAYBE A LITTLE LESS "SCRATCHY")

// (AVOID OUT-OF-RANGE ERROR)	// (NEW 28-FEB-25)
						//source.start(0, offset, duration);
						if (offset >= 0) {
							source.start(0, offset, duration);
						} else {
							console.log("(OFFSET SMALLER ZERO)", offset);
							source.start(0, 0, 0); // OK FOR NOW // ##WATCH ITEM## 															// (DOES PRODUCE SOME "CRACKLE AND POP")
						}

					} // (DOWN)
				}; // (LISTENER)

			} // PREPARE_UI

			//console.log("recorder onstop state=" + mediaRecorder.state); //#BS# REMOVE

    } // ONSTOP



																				// DATA AVAILABLE

    mediaRecorder.ondataavailable = function(e) {
      chunks.push(e.data);																																				// ##1## PUSH (RAW) DATA TO "CHUNKS"
      			//console.log("CHUNKS    " + chunks.length); // "1" BLOB-OBJECT
      			// console.log("CHUNKS[0] " + chunks[0]);    // "blob"
    }

  }	// PROMISE RESOLVES


// REQUEST DENIED (OR OTHER ERROR)
  let onError = function(err) {
		console.log('The following error occured: ' + err);
  }	// END ON_ERROR



												// PROMPT PERMISSION // RETURNS PROMISE "STREAM"
  navigator.mediaDevices.getUserMedia(constraints).then(onSuccess, onError);



// (THE BIG IF) // API NOT SUPPORTED
} else {
   console.log('getUserMedia not supported on your browser!');
}








																			// INPUT-LEVEL AMPLITUDE

function visualizeAmp(stream) {

  if(!audioCtx) {
    audioCtx = new AudioContext();
  }

  const source = audioCtx.createMediaStreamSource(stream);
  const analyser = audioCtx.createAnalyser();
//analyser.minDecibels = -90;
//analyser.maxDecibels = -10;
  analyser.smoothingTimeConstant = 0.1; // DEFAULT=0.8 																						// LOWER = MORE RESPONSIVE TO CHANGE OVER TIME
  analyser.fftSize = 512; // DEFAULT=2048       																									// "WINDOW-SIZE OF FFT IN NUMBER OF SAMPLES"
																																																	// FEWER SAMPLES=MORE DETAIL IN TIME DOMAIN
  const bufferLength = analyser.frequencyBinCount; 																								// BIN_COUNT DEFINED AS HALF OF FFT_SIZE
  const dataArray = new Uint8Array(bufferLength);

  source.connect(analyser);
  //analyser.connect(audioCtx.destination); // NO (SRC)
  draw(); // FIRST ("ONE SHOT") CALL

  function draw() {	
  	let WIDTH = inputlevelcontainer.offsetWidth;

/* FREQUENCY_DATA = AMPLITUDE/DECIBELS */
		analyser.getByteFrequencyData(dataArray); // WRITE INTO UINT8ARRAY
		var vol = getAverageVolume(dataArray);
		inputlevelbar.style.width = WIDTH/100 * vol + "px"; /* RENDER AMPLITUDE BAR */

    requestAnimationFrame(draw); // (RUN AT 60 FPS)																								// CALLBACK ###DRAW###
  } // END DRAW

} // END VISUALIZE







																	// AVERAGE VOLUME FOR AMP DISPLAY

function getAverageVolume(data) {																						 										  // COMPUTE AVERAGE VOLUME
	var values = 0;
	var average;
	var length = data.length;
	// get all the frequency amplitudes
	for (var i = 0; i < length; i++) {
		values += data[i];
	}
	average = values / length;
	return average;
}









																					// DOWNLOAD BLOB

/* 09-JAN-2022 */
/* FROM SIMPLE.INFO */


// (NOT IN DEMO)
/*
function download() {
	//console.log("DOWNLOAD");
  //var blob = new Blob(recordedBlobs, {type: 'audio/mp3'});
  var url = window.URL.createObjectURL(blob);
  console.log(url);

  var a = document.createElement('a');
  a.style.display = 'none';
  a.href = url;
  a.download = 'audio.ogg'; // audio.mp3 // (IGNORED)
  document.body.appendChild(a);
  a.click();
  setTimeout(function() {
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  }, 100);
}
*/

