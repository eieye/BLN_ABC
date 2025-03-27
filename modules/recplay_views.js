/* BLN ABC 0.9 (beta) A Primer for basic literacy development | Ein "Vorkurs" zur Alphabetisierung in Deutsch als Zweitsprache
 * Copyright (C) 2025 Jens Kreitmeyer <self@jenskreitmeyer.de>
 * This file is part of BLN ABC
 * (for the full length copyright notice see the HTML index file and "COPYING.txt")
 */

if (DEBUG_PIPE) {
	console.log('##MODULE## "RECPLAY_VIEWS" PART OF BLN ABC "STRESSTEST#04" (QUIZ) // 27-MAR-25');
}

//console.log("SEARCH // ##WATCH ITEM## FOR ISSUES/CHANGES (BTN NAMES)");
//console.log('"##MEMO## ALL ELEMENTS FOR "RECPLAY VIEWS" WIRED IN "HANDLER BUTTONS"');
//console.log('"##MEMO## AUDIOTEMPLATE/RECSCRUBBER/INPUTLEVEL-TRACKS WIRED IN "HANDLERS_BUTTONS" FROM @LINE ##1092##');
/* ##WATCH ITEM## 100325 // ADDED NEW ELEMENT "INPUTLEVELCONTAINER" TO STATE-OBJECTS
FIXING "DISAPPEARANCE" OF INPUT-LEVEL AFTER RE-OPING RECPLAY */

// REMOVED ANY STATE-DATA
// STRICTLY SETTING "VISIBILITY" ON ELEMENTS ONLY
			// (EXCEPT) ALERT-FUNCTIONS
			// @SPEAKSTATE(CLOSE) HOUSEKEEPING API
			// @RECORDSTATE(CLOSE) HOUSEKEEPING API

// ##MEMO# (250215 <3 CSS)
// USE KEYWORD "HIDDEN" ONLY WITH ATTRIBUTE "VISIBILITY" ("VISIBLE/HIDDEN" STILL RESERVES BOX-SPACE)
// USE "DISPLAYNONE" WITH ATTRIBUTE "STYLE.DISPLAY" ("DISPLAY" REMOVES ELEMENT FROM FLOW)
// "DISPLAYNONE" AS CLASS SETS "DISPLAY: NONE" AS STYLE


// DEFINES VIEWS FOR
			// CONTROLVIEW								@LINE ##152##
			// LISTENVIEW 								@LINE ##196##
			// RECORDINGVIEW							@LINE ##328##
			// PLAYBACK(RECORDING)VIEW		@LINE ##379##
			// QUIZ												@LINE ##498##





import { armaudiotemplatetrack, disarmaudiotemplatetrack, armplaybacktrack, disarmplaybacktrack } from './recplay_scrubbing.js';
// CHECK SCOPE
console.log('(RECPLAY VIEWS) QUIZ_ON IN SCOPE', QUIZ_ON !== undefined, QUIZ_ON);



/* / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / */

																			// HELPER-FUNCTION HIDE
function hideelement(arg) {
		if (arg.id.includes('segment')) {
			// CLOSE SEGMENT																																						// MUST HAVE NO OTHER STYLES ON SEGMENTS /!\
			arg.style.display = "none"; // (ADD STYLE TO NAMED_NODE_MAP)
			if (DEBUG_RECPLAY_VIEWS) {
				console.log("\t\tCLOSE SEGMENT", arg.attributes);
			}
		} else {
			// HIDE BUTTON // USING CLASSLIST
			arg.classList.add('displaynone');
		}
	}


																			// HELPER-FUNCTION SHOW
function showelement(arg) {
		if (arg.id.includes('segment')) {
			// OPEN SEGMENT // USING NAMED_NODE_MAP																											// MUST HAVE NO OTHER STYLES ON SEGMENTS /!\
			arg.style.display = ""; // (CLEAR STYLE IN NAMED_NODE_MAP)
									/* ##DEFERRED## (REQUIRING RESPECTIVE INIT) */
									/* WOULD NEED ADDITIONAL TEST THAT NODE_MAP */
									/* ALREADY CONTAINS THE ATTRIBUTE "STYLE" */
						/* arg.attributes.removeNamedItem('style'); */ 																				// (FROM NAMED_NODE_MAP)
			if (DEBUG_RECPLAY_VIEWS) {
				console.log("\t\tOPEN SEGMENT", arg.attributes);
			}
		} else {
			// SHOW BUTTON // USE CLASSLIST
			arg.classList.remove('displaynone');
		}
	}










/* / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / */
														// FUNCTION "RECPLAYVIEW" (MODULE CONTAINER)
														// "RECORDERPLAYER"-ELEMENT CONTAINS ALL OTHERS FOR RECPLAY
// (MAY BE REDUNDANT CURRENTLY BUT PRESERVE FOR POSSIBLE DRAWER IMPLEMENTATION)

	function recorderplayer(state) {
																						// "RECORDERPLAYER(OPEN)"
		if (state) { // OPEN
				if (DEBUG_RECPLAY_VIEWS) {
					console.log("RECPLAYVIEW(OPEN)");
				}
			/* "MODULRECPLAY" IS EXCLUDED FROM FUNCTION "SHOW/HIDEELEMENT W/O STRING "SEGMENT" */
				modulerecorderplayer.style.display = "";

				controlview(CLOSE); // (CLOSE==SHOW BTN SPEAKER)
						// ==> INCLUDES
						//showelement(segmentcontrol);
									// showelement(btnopenRECPLAY);
									// hideelement(btncloseRECPLAY);
									// hideelement(btnaudioreset); // ##WATCH ITEM##
									// showelement(btnuclc);
									// hideelement(blanktoggle);
									// hideelement(btnsavetrace); // IF "TRACEFINISHED"(?)

				listenview(CLOSE);
						// ==> INCLUDES
						//hideelement(segmentlisten);																													// HIDE SEGMENT LISTEN

				speakview(CLOSE);
						// ==> INCLUDES
						// hideelement(segmentspeak);																													// HIDE SEGMENT SPEAK
						// controlview(OPEN); // (SHOW BTN CROSS)// (BKUP)
									// ==> INCLUDES
									// hideelement(btnopenRECPLAY);
									// showelement(btncloseRECPLAY);
									// hideelement(btnaudioreset); // ##WATCH ITEM##
									// hideelement(btnuclc);
									// showelement(blanktoggle);
									// END INCLUDES
						// hideelement(btnplayrecording);


																						// "RECPLAYVIEW(CLOSE)"							
		} else {
				if (DEBUG_RECPLAY_VIEWS) {
					console.log("RECPLAYVIEW(CLOSE)");
				}
			/* "MODULRECPLAY" IS EXCLUDED FROM FUNCTION "SHOW/HIDEELEMENT W/O STRING "SEGMENT" */
				modulerecorderplayer.style.display = "none";																							// HIDE FOR "HOME" AND "PORTFOLIO"
				// NO SEGMENTS CAN BE VISIBLE WITH MODULE HIDDEN

				//controlview(OPEN); // NO-NO /!\ RECURSION
		}
	} // RECPLAY







/* / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / */
														// FUNCTION "CONTROLVIEW" // LINE ##152##
	function controlview(state) {
																						// "CONTROLVIEW(OPEN)"
		if (state) { // OPEN (SHOW CROSS)
				if (DEBUG_RECPLAY_VIEWS) {
					console.log("CONTROLVIEW(OPEN)");
				}
						hideelement(btnopenRECPLAY);
						showelement(btncloseRECPLAY);																													// BTNCLOSE HIDES LISTEN
						hideelement(btnaudioreset);
						hideelement(btnaudiolock);
									// ##WATCH ITEM## // CLEAR CLASSLIST
									btnuclc.classList = [];
						hideelement(btnuclc);
						showelement(blanktoggle);																															// TOGGLE FOR UCLC/RESET

																						// "CONTROLVIEW(CLOSE)"
		} else { // CLOSE (SHOW SPEAKER)
				if (DEBUG_RECPLAY_VIEWS) {
					console.log("CONTROLVIEW(CLOSE) STATE", state);
				}
				showelement(segmentcontrol);																															// SHOW SEGMENT CONTROL
						showelement(btnopenRECPLAY);																													// BTNOPEN SHOWS LISTEN
						hideelement(btncloseRECPLAY);
						hideelement(btnaudioreset);

// ##EXCEPTION QUIZ## // #TBD# SHOW ONLY ON UNLOCK (SOLVED)
						if (!QUIZ_ON) {
							//console.log("(CONTROLVIEW(CLOSE)) QUIZ_ON", QUIZ_ON); // ##WATCH ITEM## // THIS IS LOGGING 4x
							showelement(btnuclc);
							hideelement(blanktoggle);
						}

						hideelement(btnsavetrace); // (ALERT "UNSAVED" FROM BTN SCRIPT)
		}
	}







/* / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / */
														// FUNCTION "LISTENVIEW" // LINE ##196##
	function listenview(state) {
																						// "LISTENVIEW(OPEN)"
		if (state) { // OPEN
				if (DEBUG_RECPLAY_VIEWS) {
					console.log("LISTENVIEW(OPEN)");
				}
						showelement(segmentlisten);																														// SHOW SEGMENT LISTEN
						showelement(audiotemplatetrack);

 						showelement(btnaudiostart);
 						hideelement(btnaudiostop);

				speakview(CLOSE) // hideelement(segmentspeak);
						// ==> INCLUDES
						// hideelement(segmentspeak);																													// HIDE SEGMENT SPEAK
						// controlview(OPEN); // (SHOW BTN CROSS)// (BKUP)
									// ==> INCLUDES
									// hideelement(btnopenRECPLAY);
									// showelement(btncloseRECPLAY);
									// hideelement(btnaudioreset);
									// hideelement(btnuclc);
									// showelement(blanktoggle);
						// hideelement(btnplayrecording);
// ##WATCH ITEM##
						// ==> INCLUDED
						//controlview(OPEN); // (SHOW BTN CROSS)
								// ==> INCLUDES
								// hideelement(btnopenRECPLAY);
								// showelement(btncloseRECPLAY);
								// hideelement(btnaudioreset);
								// hideelement(btnuclc);
								// showelement(blanktoggle);

// SCRUBBING UDIOTEMPLATE
 						hideelement(templatescrubarrows);

																						// "LISTENVIEW(CLOSE)"
		} else {
				if (DEBUG_RECPLAY_VIEWS) {
					console.log("LISTENVIEW(CLOSE)");
				}
 						hideelement(segmentlisten);																														// HIDE SEGMENT LISTEN
		}
	}









/* / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / */
																		// FUNCTION "SPEAKVIEW"
	function speakview(state) { 																																		// === ENABLE/INIT RECORDING
																		// "SPEAKVIEW(OPEN)"
		if (state) {
					if (DEBUG_RECPLAY_VIEWS) {
						console.log("SPEAKVIEW(OPEN)");
					}
				showelement(segmentspeak);																																// SHOW SEGMENT SPEAK
				controlview(OPEN); // (SHOW BTN CROSS)
						// ==> INCLUDES
						// hideelement(btnopenRECPLAY);
						// showelement(btncloseRECPLAY);
						// hideelement(btnaudioreset); // ##WATCH ITEM##
						// hideelement(btnuclc);
						// showelement(blanktoggle);

																	// SEGMENT CONTAINER OPEN
																		// REQUEST PERMISSION
																		// ##SCRIPT## CALL API
																		// ##SCRIPT## INPUT SIGNAL-TO-LEVEL

// INIT RECORDER // LINE ##264## // ##WATCH ITEM## 20250310
						showelement(inputlevelcontainer);
						showelement(inputlevelbar);													// REQUESTED PERMISSION (INPUT IS CONNECTED)
						showelement(btnstartrecording); // (MIC)
						hideelement(btnstoprecording);  // (DOT)
						// DBL // hideelement(btnplayrecording);  // "REEL" (TAPEROLL)
// SCRUBBING
						hideelement(recordingscrubarrows);
				playbackview(CLOSE);
						// ==> INCLUDES
						// DISARMPLAYBACKTRACK // ##WATCH ITEM## 
						// hideelement(recscrubberbar);
						// hideelement(btnplayrecording); // ("REEL")
						// hideelement(btnstopplayrecorded);


																						// (NOT A STATE BY USER-ACTION)
																						// "SPEAKVIEW(CLOSE)"
		} else {
				if (DEBUG_RECPLAY_VIEWS) {
					console.log("SPEAKVIEW(CLOSE)");
				}

				hideelement(segmentspeak);																																// HIDE SEGMENT SPEAK ****/
				// ==> CONTAINS
// ##WATCH ITEM ##
				//playbackview(CLOSE); // REPEAT THIS(?)
						// ==> INCLUDES
						// DISARMPLAYBACKTRACK // ##WATCH ITEM## 
						// hideelement(recscrubberbar);
						// hideelement(btnplayrecording); // ("REEL")
						// hideelement(btnstopplayrecorded);

				controlview(OPEN); // (SHOW BTN CROSS)// (BKUP)
						// INCLUDES
						// hideelement(btnopenRECPLAY);
						// showelement(btncloseRECPLAY);
						// hideelement(btnaudioreset); // ##WATCH ITEM##
						// hideelement(btnuclc);
						// showelement(blanktoggle);
						// END INCLUDES
						hideelement(btnplayrecording);
		}
	}





																						
// RECORDING ONGOING ("LIVE")
// ##SCRIPT## INPUT SIGNAL-TO-LEVEL
// ##SCRIPT## RECORDING TO AUDIO-BUFFER

/* / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / */
													// FUNCTION "RECORDINGVIEW" (== TOGGLE REC ON/OFF)
													// LINE ##328##
	function recordingview(state) {

																						// "RECORDINGVIEW(OPEN)"
		if (state) {
				if (DEBUG_RECPLAY_VIEWS) { console.log("RECORDINGVIEW(OPEN)"); }
// ---------------------------------------------------------------------------------------------
// DISABLE PLAYBACK		
				playbackview(CLOSE);
						// ==> INCLUDES
						// hideelement(recscrubberbar);
						// hideelement(btnplayrecording);
						// hideelement(btnstopplayrecorded);
// ---------------------------------------------------------------------------------------------
// ENABLE RECORDING (== TOGGLE REC ON/OFF)
// (FLAG LIVERECORDING=TRUE WITH "BTNSTARTRECORDING")
				showelement(segmentspeak);																																// INIT @LINE ##1098## HANDLERS_BUTTONS" */
						showelement(inputlevelcontainer);
						showelement(inputlevelbar);																														// INPUT CONNECTED AND RECORDED
						showelement(btnstoprecording); // (REC IS ON)
						hideelement(btnstartrecording);
// ---------------------------------------------------------------------------------------------

																						// "RECORDINGVIEW(CLOSE)"
		} else {
				if (DEBUG_RECPLAY_VIEWS) { console.log("RECORDINGVIEW(CLOSE)"); }

				playbackview(CLOSE);
						// ==> INCLUDES
						// hideelement(recscrubberbar);
						// hideelement(btnplayrecording);
						// hideelement(btnstopplayrecorded);

																						// (READY FOR RECORDING)
// (FLAG LIVERECORDING=FALSE WITH "BTNSTOPRECORDING")
						showelement(inputlevelcontainer);	
						showelement(inputlevelbar);																														// INPUT CONNECTED
						hideelement(btnstoprecording);
						showelement(btnstartrecording); // (REC IS OFF)
		}

	} // RECORDING








/* / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / */
												// FUNCTION "PLAYBACK(RECORDING)VIEW" // LINE ##379##
	function playbackview(state) {
				if (DEBUG_RECPLAY_VIEWS) {
					console.log("PLAYBACKVIEW(OPEN)");
				}
				armplaybacktrack();
				//console.log("AUDIOTEMPLATE ARMED", AUDIOARMED);
																						// CALLED FROM HANDLERS_BUTTONS
																						// "PLAYBACKVIEW(OPEN)"
		if (state) {
				showelement(segmentspeak); // SEGMENT CONTAINER																						// SHOW SEGMENT SPEAK ****/

// DISABLE RECORDING-TOGGLE
						hideelement(inputlevelbar);																														// AUDIO INPUT CONNECTED
						hideelement(inputlevelcontainer);
						hideelement(btnstoprecording);
						hideelement(btnstartrecording);
// ENABLE PLAYBACK (INIT)
						showelement(recscrubberbar);
						showelement(recscrubbercontainer);																										// ALSO SHOW/HIDE NEW PARENT-EL
						showelement(btnplayrecording);
						//hideelement(btnstopplayrecorded); // TEMP DIS-ABLED // NO STOP-BTN
//  QUIZ OVERRIDE
					if (QUIZ_ON) { // ##WATCH ITEM##
						hideelement(btnaudiolock);
						showelement(btnaudiostart);
					}

																						// "PLAYBACKVIEW(CLOSE)"
		} else {
				if (DEBUG_RECPLAY_VIEWS) {
					console.log("PLAYBACKVIEW(CLOSE)");
				}
				disarmplaybacktrack();
						hideelement(recscrubberbar);
						hideelement(recscrubbercontainer);																										// ALSO SHOW/HIDE NEW PARENT-EL
						hideelement(btnplayrecording); // ("REEL")
						//hideelement(btnstopplayrecorded); // TEMP DIS-ABLED // NO STOP-BTN
		} // (PLAYBACK CLOSE)

	} // (PLAYBACKVIEW)







/* / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / */
																// "RESET(RECORDING)VIEW" (SPEAK)
	function resetview(state) {

																						// CALLED FROM HANDLERS_BUTTONS // LINE ##1128##
																						// ON STOP_RECORDING "RESETVIEW(OPEN)"
		if (state) {
				if (DEBUG_RECPLAY_VIEWS) {
					console.log("RESETVIEW(OPEN)");
				}
			hideelement(btnsavetrace); // ##WATCH ITEM## (250216)
			hideelement(blanktoggle);
			showelement(btnaudioreset); // ##WATCH ITEM##
			hideelement(btnplayrecording);

																				// "RESETVIEW(CLOSE)"
		} else {

			if (DEBUG_RECPLAY_VIEWS) { console.log("RESETVIEW(CLOSE)"); }

			hideelement(btnaudioreset);
			showelement(blanktoggle);
			hideelement(btnplayrecording); // (REEL)
			hideelement(btnsavetrace);
			speakview(OPEN);
						// ==> INCLUDES
						// showelement(segmentspeak);																													// SHOW SEGMENT SPEAK ****/
						// controlview(OPEN); 																																// (SHOW BTN CROSS)
								// ==> INCLUDES
								// hideelement(btnopenRECPLAY);
								// showelement(btncloseRECPLAY);
								// hideelement(btnaudioreset); // ##WATCH ITEM##
								// hideelement(btnuclc);
								// showelement(blanktoggle);

// (IF QUIZ) OVERRIDE
			if (QUIZ_ON) {
				showelement(btnaudiostart);
			}
																	// SEGMENT CONTAINER OPEN
																		// REQUEST PERMISSION
																		// ##SCRIPT## CALL API
																		// ##SCRIPT## INPUT SIGNAL-TO-LEVEL

// INIT RECORDER
								// showelement(inputlevelbar);																										// REQUESTED PERMISSION (INPUT IS CONNECTED)
								// showelement(btnstartrecording); 																								// (MIC)
								// hideelement(btnstoprecording);  																								// (DOT)
								// hideelement(btnplayrecording);  																								// (TAPE-REEL ICON)
// SCRUBBING
								// hideelement(recordingscrubarrows);
						// playbackview(CLOSE);
								// ==> INCLUDES
								// hideelement(recscrubberbar);
								// hideelement(btnplayrecording);
								// hideelement(btnstopplayrecorded);
		}




	} // RESET(RECORDING)








/* / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / */
									// FUNCTION "QUIZVIEW" // LINE ##498##
									//  ##TBD## COLLECT AL "QUIZ"-RELATED STATEMENTS
									// FROM "HANDLERS_BUTTONS" *HERE*
									// (ISOLATE VIEW "QUIZ" FROM "HOME"/"WATCH"/"WRITE" AND ALL OTHERS)
/* / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / */

	function quizview(state) {

		if (state) { // (OPEN)
			if (DEBUG_RECPLAY_VIEWS) console.log("QUIZVIEW(OPEN)"); 
			QUIZ_ON = true;

		} else { // (CLOSE)
			if (DEBUG_RECPLAY_VIEWS) { console.log("QUIZVIEW(CLOSE)"); }
			QUIZ_ON = false;
						// USE CONDITIONAL IN "CONTROL=CLOSE" (IF QUIZ_ON HIDEELEMENT)

			

		} // (ELSE)

	} // QUIZ





/* / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / */
																		// FUNCTION "QUIZVIEW"

	function recplayforquiz(state) {
	
		if (state) { // (OPEN)
				console.log("VIEW RECPLAY FOR QUIZ (OPEN)");

				listenview(OPEN);
						// ==> INCLUDES
								//showelement(btnaudiostart);

				btnaudiostart.classList = []; // ##WATCH ITEM## // (CLEAR ANY STYLES)
				hideelement(btnaudiostart);
						console.log("BTN AUDIOSTART", btnaudiostart.classList); // OK (260325)

				btnaudiolock.classList = []; // ##WATCH ITEM##
				showelement(btnaudiolock);
						console.log("BTN AUDIOLOCK", btnaudiolock.classList); // OK (260325)


				speakview(OPEN);
						// ==> INCLUDES
						//showelement(segmentspeak);
						// OVERRIDE
						showelement(btnaudiolock);


		} else { // (CLOSE)
				console.log("VIEW RECPLAY FOR QUIZ (CLOSE)");

				hideelement(btnaudiolock);
						console.log("BTN AUDIOSTART", btnaudiostart.classList);
						console.log("BTN AUDIOLOCK", btnaudiolock.classList);
		} // (ELSE)


	} // RECPLAY_FOR_QUIZ







export { recorderplayer, controlview, listenview, speakview, recordingview, playbackview, resetview, quizview, recplayforquiz, showelement, hideelement };


