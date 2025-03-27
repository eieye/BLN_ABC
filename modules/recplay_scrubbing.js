/* BLN ABC 0.9 (beta) A Primer for basic literacy development | Ein "Vorkurs" zur Alphabetisierung in Deutsch als Zweitsprache
 * Copyright (C) 2025 Jens Kreitmeyer <self@jenskreitmeyer.de>
 * This file is part of BLN ABC
 * (for the full length copyright notice see the HTML index file and "COPYING.txt")
 */

if (DEBUG_PIPE) {
	console.log('##MODULE## "RECPLAY_SCRUBBING" PART OF "STRESSTEST#04" (QUIZ) // 27-MAR-25');
}
// SEARCH ##WATCH ITEM## FOR CHANGES IN PROGRESS




import { recorderplayer, controlview, listenview, speakview, recordingview, playbackview, resetview, showelement, hideelement } from './recplay_views.js';

// INIT SCRUBBING
	let templatepointerdown = false;
	let playbackpointerdown = false;



																	// SCRUBBING FUNCTION
	function setTouchPoint(e, target) {
		let min = target.parentElement.clientHeight; // CENTER CIRCLE
		let max = target.parentElement.clientWidth; // (PARENT ID=trackcontainer)
		//console.log(`MIN ${min} MAX ${max}`);
		let px;
		//let py;
// TOUCH(ES)
		if (e.type === "touchmove") {
			if (e.changedTouches.length === 1) {
				//console.log("1-F TOUCH MOVE");
				px = e.changedTouches[0].clientX;
				//py = e.changedTouches[0].clientY;
			} else if (e.changedTouches.length > 1) { // (SWIPER)
				console.log("/ / / 2-F TOUCH MOVE / / /");
			}
// POINTER
		} else if (e.type === "pointermove") {
			px = e.clientX;
			//py = e.clientY;
		}

		if (px > min && px < max) {
			target.style.width = `${px}px`;
		}

														// #######AUDIOPLAYER#######
														// MAP TIME/POSITION TO TOUCHPOINT
	} // SETTOUCHPT






// – – – – – – – – – – – – – – – – – – – – – – – – – – – – – – – – – – – – – – – – – – – – – 
																		// ##TOUCHSTART## TEMPLATE
	const handletemplatedown = function(e) {
	 	e.preventDefault();

// DISABLE WHEN RECORDING
		if (!LIVERECORDING) {

			templatepointerdown = true;
			setTouchPoint(e, audiotemplatetrack);

// WHEN DOWNSTATE SHOW "SCRUBBING"
			hideelement(btnaudiostart); // BTN SPEAKER // OK (260325)
			hideelement(btnaudiostop); // GENERIC STOP "SQUARE" (NOMINAL)
			showelement(templatescrubarrows);
															// #######AUDIOPLAYER#######
														// MAP TIME/POSITION TO TOUCHPOINT
																	// #### FLAGS ####
// SETTING "AUDIOTEMPLATEPLAYED"=TRUE WITH POINTERDOWN/TOUCHSTART ON TEMPLATETRACK 
// EVEN DIRECTLY AFTER "RECPLAY OPEN" (==TEMPLATE HAS NOT BEEN PLAYED
// IS UNWANTED (BUT HAPPENING ONLY IN DUMMY)
// ##TBD## IN PRODUCTION REPLACE WITH AUDIOPLAYER-STATE "PLAYENDED" (RESP. "PLAYSTOPPED")

/*
// ––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––	
			AUDIOTEMPLATEPLAYED = true; // ##WATCH ITEM##

			if (AUDIOTEMPLATEPLAYED && !RECORDINGLOCKED) {
																		  	
															// TIME THIS TO TEMPLATE AUDIOPLAY=ENDED
				console.log('\t- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -');	
				console.log('\tSPEAKVIEW(OPEN) "AUTOMATIC FOR THE PEOPLE!"');			
				speakview(OPEN); 																																			// "AUTOMATIC FOR THE PEOPLE!"

			}
// ––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––		
*/

			if (DEBUG_RECPLAY) {
				console.log("(TEMPLATESCRUBBER DOWN)");
				console.log(`PLAYED\tRECLOCK\tLIVE\tBLOB`);
				console.log(`${AUDIOTEMPLATEPLAYED}\t${RECORDINGLOCKED}\t${LIVERECORDING}\t${AUDIOBLOBPENDING}`);
			}
			//console.log("/!\\ TEMP DEMO ONLY /!\\ REMOVE IN PRODUCTION");

		} // (NOT LIVE RECORDING)

	} // TEMPLATEDOWN



// – – – – – – – – – – – – – – – – – – – – – – – – – – – – – – – – – – – – – – – – – – – – – 
																		// ##TOUCHMOVE## TEMPLATE
	const handletemplatemove = function(e) {
	 	e.preventDefault();
		if (templatepointerdown) {
			setTouchPoint(e, audiotemplatetrack);
		}
	} // TEMPLATEMOVE






// – – – – – – – – – – – – – – – – – – – – – – – – – – – – – – – – – – – – – – – – – – – – – 
																			// TOUCHEND (AUDIO)TEMPLATE
// (EVENT ON WINDOW)
	const handletemplateup =  function(e) {
	 	e.preventDefault();
		templatepointerdown = false;

														// #######AUDIOPLAYER#######
														// ONTOUCHEND RESUME PLAY 
														// FROM TIME AT LAST TOUCHPOINT (NOMINAL)

// WHEN UPSTATE HIDE "SCRUBBING"
			showelement(btnaudiostart); // BTN SPEAKER // OK (260325)
			hideelement(btnaudiostop); // GENERIC STOP "SQUARE" (NOMINAL)
			hideelement(templatescrubarrows);


} // TEMPLATEUP







// – – – – – – – – – – – – – – – – – – – – – – – – – – – – – – – – – – – – – – – – – – – – – 
																		// TOUCHSTART PLAYBACK

	const handleplaybackdown = function(e) {
	 	e.preventDefault();
		playbackpointerdown = true;

// SET TO TOUCH ON TOUCHSTART #####TBD######
		setTouchPoint(e, recscrubberbar);

// WHEN DOWNSTATE SHOW SCRUBBING RECORDINGTRACK

		hideelement(btnplayrecording); // BTN REELSTART
		showelement(recordingscrubarrows); // ##ARROWS## ICON

														// #######AUDIOPLAYER#######
														// MAP TIME/POSITION TO TOUCHPOINT
	} //PLAYBACKDOWN



// – – – – – – – – – – – – – – – – – – – – – – – – – – – – – – – – – – – – – – – – – – – – – 
																		 // TOUCHMOVE PLAYBACK
	const handleplaybackmove = function(e) {
	 	e.preventDefault();
		if (playbackpointerdown) {
			setTouchPoint(e, recscrubberbar);
		}
	} // PLAYBACKMOVE



// – – – – – – – – – – – – – – – – – – – – – – – – – – – – – – – – – – – – – – – – – – – – –
																			// TOUCHEND PLAYBACK
// (EVENT ON WINDOW)
	const handleplaybackup =  function(e) {
	 	e.preventDefault();
		playbackpointerdown = false;

														// #######AUDIOPLAYER#######
														// RESUME PLAY FROM TIME AT LAST TOUCHPOINT

// ON PLAYENDED SHOW "START"
 		showelement(btnplayrecording); // "REEL" (TAPEROLL)
		// #TEMP# DISABLED // hideelement(btnstopplayrecorded); // (NOMINAL)
 		hideelement(recordingscrubarrows); // ##ARROWS## ICON

	} // PLAYBACKUP








												// EVENTTYPE VARIES /!\ DO NOT USE VARIABLE
//console.log("(RECPLAY_SCRUBBING) EVENTTYPE", eventtype);

// = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =
														 					// ARM (AUDIO)TEMPLATE TRACK
function armaudiotemplatetrack() {
	if ("Touch" in window) {
// ADD TOUCH
		audiotemplatecontainer.addEventListener('touchstart', handletemplatedown, { passive: false } );
		audiotemplatecontainer.addEventListener('touchmove', handletemplatemove, { passive: false } );
		window.addEventListener('touchend', handletemplateup, { passive: false } );
	} else {
// ADD POINTER
		audiotemplatecontainer.addEventListener('pointerdown', handletemplatedown, { passive: false } );
		audiotemplatecontainer.addEventListener('pointermove', handletemplatemove, { passive: false } );
		window.addEventListener('pointerup', handletemplateup, { passive: false } );
	}
	if (DEBUG_RECPLAY || DEBUG_EVENTS) {
		console.log("\t\t\t\tARMED AUDIOTEMPLATE TRACK");
	}
}
																						// DISARM
function disarmaudiotemplatetrack() {
	if ("Touch" in window) {
		audiotemplatecontainer.removeEventListener('touchstart', handletemplatedown, { passive: false } );
		audiotemplatecontainer.removeEventListener('touchmove', handletemplatemove, { passive: false } );
		window.removeEventListener('touchend', handletemplateup, { passive: false } );
	} else {
		audiotemplatecontainer.removeEventListener('pointerdown', handletemplatedown, { passive: false } );
		audiotemplatecontainer.removeEventListener('pointermove', handletemplatemove, { passive: false } );
		window.removeEventListener('pointerup', handletemplateup, { passive: false } );
	}
	if (DEBUG_RECPLAY || DEBUG_EVENTS) {
		console.log("\t\t\t\tDIS-ARMED AUDIOTEMPLATE TRACK");
	}
}




// = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =
																	// !!DO NOT USE VAR "EVENTTYPE"
																// LISTENERS HAVE DIFFERENT EVENTTYPES
														 				// ARMPLAYBACKTRACK
function armplaybacktrack() {
	if ("Touch" in window) {
// ADD TOUCH
		recscrubbercontainer.addEventListener('touchstart', handleplaybackdown, { passive: false } ); // /!\ START
		recscrubbercontainer.addEventListener('touchmove', handleplaybackmove, { passive: false } ); // /!\ MOVE
		window.addEventListener('touchend', handleplaybackup, { passive: false } ); // /!\ END
	} else {
// ADD POINTER
		recscrubbercontainer.addEventListener('pointerdown', handleplaybackdown, { passive: false } ); // /!\ DOWN
		recscrubbercontainer.addEventListener('pointermove', handleplaybackmove, { passive: false } ); // /!\ MOVE
		window.addEventListener('pointerup', handleplaybackup, { passive: false } ); // /!\ UP
	}
	if (DEBUG_RECPLAY || DEBUG_EVENTS) {
		console.log("\t\t\t\tARMED PLAYBACK TRACK");
	}
}
																						// DISARM
function disarmplaybacktrack() {
	if ("Touch" in window) {
		recscrubbercontainer.removeEventListener('touchstart', handleplaybackdown, { passive: false } );
		recscrubbercontainer.removeEventListener('touchmove', handleplaybackmove, { passive: false } );
		window.removeEventListener('touchend', handleplaybackup, { passive: false } );
	} else {
		recscrubbercontainer.removeEventListener('pointerdown', handleplaybackdown, { passive: false } );
		recscrubbercontainer.removeEventListener('pointermove', handleplaybackmove, { passive: false } );
		window.removeEventListener('pointerup', handleplaybackup, { passive: false } );
	}
	if (DEBUG_RECPLAY || DEBUG_EVENTS) {
		console.log("\t\t\t\tDIS-ARMED PLAYBACK TRACK");
	}
}






export { armaudiotemplatetrack, disarmaudiotemplatetrack, armplaybacktrack, disarmplaybacktrack }; 
