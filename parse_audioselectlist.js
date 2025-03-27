/* BLN ABC 0.9 (beta) A Primer for basic literacy development | Ein "Vorkurs" zur Alphabetisierung in Deutsch als Zweitsprache
 * Copyright (C) 2025 Jens Kreitmeyer <self@jenskreitmeyer.de>
 * This file is part of BLN ABC
 * (for the full length copyright notice see the HTML index file and "COPYING.txt")
 */

if (DEBUG_PIPE) {
	console.log('##MODULE## "PARSE AUDIO SELECTLIST(ITEM)" PART OF BLN ABC "STRESSTEST#04" (QUIZ) // 27-MAR-25');
}

/* PARSE AUDIO-PARTS "NAME" PLUS "SUFFIX"(ES) DEPENDING ON SELECTED GRAPHEME (SINGLE/MTBG/ALT-VERSION) FOR SPELL *OR* SPEAK */
													/* # # # # # # # /!\ IMPORTANT # # # # # # # */
									/* PARSERS FOR AUDIO CURRENTLY DO *NOT* REMOVE ALT-GLYPH VERSION NUMBERS */
/* AUDIO FOR ALL VERSIONED GRAPHEMES (ONES THAT ARE OR CONTAIN ALT-GLYPHS) */
/* CURRENTLY ARE CLONES OF AUDIO FOR BASE-GLYPH WITH AN ADDED VERSION-NUM */
/* IN BOTH "SPELL" AND "SPEAK" AUDIO-DIRECTORIES */
/* (THERE IS NO DIFFRENCE IN PRONUNCAITION FOR ALT-GLYPHS) */
/* EXAMPLE "g2.mp3" "g3.mp3" ARE RENAMED COPIES OF "g.mp3" */
/* ALSO "a2u.mp3" FROM "au.mps3" OR "ing2.mp3" FROM "ing.mp3" ETCPP */
														/* # # # # # # # NEXT GEN # # # # # # # */
/* SIMPLIFY PARSING OF AUDIO-FILENAMES TO REMOVING ALL #NUMERALS# AND CONVERSION TO LOWERCASE (INITIAL LTR) */
/* TEST/REGEX EACH CHAR IN STRING FOR MATCH AGAINST "2" TO "4" OR THEIR CODEPOINTS */
			/* (RE)USE SCRIPT "PARSE LTRVERSION" */
			/* MODIFY TO OUTPUT "NUM-LESS AUDIO-FILENAME ALL LC" (IN ADDITION TO "SPACED LABEL" */
/* (SAFE) ASSUMPTION MAX NUM OF VARIANTS INCLUDING REGULAR WILL NEVER EXCEED 4 */
			/* (REGULAR REMAINS UN-NUMBERED FIRST VARIANT IS NUMBERED "2") */
/* THEN #REMOVE# ALL NUMBERED (CLONED) FILES FROM AUDIO-DIRECTORIES */
/* (NOTICE THIS WILL WORK FOR AUDIO #ONLY# // GRAPHICS MUST KEEP VERSION-NUMS) */

// ##TBD##
// (CLARIFY/FINALIZE RE-CODING OF UMLAUTS IN "PLAYAUDIO" // REMOVE DOUBLES)
// Ää // C3A4
// Öö // C3B6
// Üü // C3BC


																					// ##NEXT GEN##
/* INCORPORATE THIS SHORT TEST FOR NUMBERS IN PARSING TO "PLAIN" FILENAME (REMOVING ANY NUMBER-CHARS) */
/* 	console.log(`LABEL "${label}" 2ND CHAR "${label[1]}" IS A NUMBER ${ isNaN(Number.parseInt(label[1])) === false }`); */



												// CALLED FROM HANDLER ON OPTION-ITEM IN SELECTLIST
function parseAudioSelectlist(SELECTED) {

	let audioname = SELECTED.toLowerCase(); 																												// AUDIO FILENAMES ELIMINATE INIT UPPERCASE
	let srcone, srctwo;
	let casename = ""; 																																							// (POSTFIX "GROSS"/"KLEIN")
	let initltr = SELECTED[0].toLowerCase(); 																												// (DETERMINE ORIGINAL LTRCASE)
	initltr === SELECTED[0] ? casename = "klein" : casename = "gross";

if (DEBUG_AUDIO) {
	console.log("(PARSEAUDIO SELECTLIST)", SELECTED, casename);
}

	if (audioname.length === 1) {

		// SINGLE (REGULAR) GLYPH // *SPELL* IT
		if (DEBUG_AUDIO) {
			console.log("|– – – – – – – – – – – (SELECTLISTITEM) REGULAR SINGLE", audioname, "– – – – – – – – – – –|");
		}
			srcone = `./audio/spell/${casename}buchstabe_spell.mp3`;
			srctwo = `./audio/spell/${audioname}_spell.mp3`;

	} else if (audioname.length == 2) {
		if (audioname[1] === "2" || audioname[1] === "3" || audioname[1] === "4") {

			// 2ND CHAR IS NUMBER // SINGLE GLYPH ALT-VERSION // *SPELL* IT
							// ##NEXT GEN## EXCLUDE ALL NUMERALS ##TBD## RECYCLE PARSER OR USE "NAN"
			if (DEBUG_AUDIO) {
				console.log("|– – – – – – (SELECTLISTITEM) ALT-GLYPH SINGLE", audioname, "(2ND CHAR", audioname[1], ") – – – – – –|");
			}
			srcone = `./audio/spell/${casename}buchstabe_spell.mp3`;
			srctwo = `./audio/spell/${audioname}_spell.mp3`;

		} else {

			// // 2ND CHAR IS LTR // 2-CHAR MTBG WITH REGULAR INITIAL// *SPEAK* IT
			if (DEBUG_AUDIO) {
				console.log("|– – – – – – – – – – – – (SELECTLISTITEM) MTBG", audioname, "– – – – – – – – – – – –|");
			}
												// VERSION-NUM GETS LOST IN MINIPREVIEW ET AL
			//srcone = undefined; // LINE ##402##
			//srctwo = "./audio/speak/" + audioname + ".mp3";
			srcone = "./audio/speak/" + audioname + ".mp3";
			srctwo = "./audio/speak/" + casename + ".mp3";																							// (POSTFIX CASENAME FOR SOUNDED GRAPHEMES)
		}

	} else if (audioname.length > 2) {

		if (audioname[1] === "2" || audioname[1] === "3" || audioname[1] === "4") {
			// IS ANY LENGTH MTBG WITH ALT-GLYP INITIAL// *SPEAK* IT
			if (DEBUG_AUDIO) {
				console.log("|– – – – – – – – – – – – (SELECTLISTITEM) MTBG", audioname, "– – – – – – – – – – – –|");
			}
												// USE TO KEEP VERSION-NUM IN MINIPREVIEW/SWITCH
			//srcone = undefined;
			//srctwo = "./audio/speak/" + audioname + ".mp3";
			srcone = "./audio/speak/" + audioname + ".mp3";
			srctwo = "./audio/speak/" + casename + ".mp3";																							// (POSTFIX CASENAME FOR SOUNDED GRAPHEMES)

		} else {
			// IS ANY LENGTH MTBG WITH REGULAR INITIAL// *SPEAK* IT
			if (DEBUG_AUDIO) {
				console.log("|– – – – – – – – – – – – (SELECTLISTITEM) MTBG", audioname, "– – – – – – – – – – – –|");
			}
												// USE TO KEEP VERSION-NUM IN MINIPREVIEW/SWITCH
			//srcone = undefined;
			//srctwo = "./audio/speak/" + audioname + ".mp3";
			srcone = "./audio/speak/" + audioname + ".mp3";
			srctwo = "./audio/speak/" + casename + ".mp3";																							// (POSTFIX CASENAME FOR SOUNDED GRAPHEMES)
		}
	} // (ELSE IF)

if (DEBUG_AUDIO) {
	console.log("(PARSEAUDIO SELECTLIST) ONE", srcone, "TWO", srctwo);
}

	return [srcone, srctwo];

} // END PARSE





export { parseAudioSelectlist };


