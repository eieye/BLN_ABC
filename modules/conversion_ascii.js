/* BLN ABC 0.9 (beta) A Primer for basic literacy development | Ein "Vorkurs" zur Alphabetisierung in Deutsch als Zweitsprache
 * Copyright (C) 2025 Jens Kreitmeyer <self@jenskreitmeyer.de>
 * This file is part of BLN ABC
 * (for the full length copyright notice see the HTML index file and "COPYING.txt")
 */

if (DEBUG_PIPE) {
	console.log('##MODULE## "CONVERSION_ASCII" PART OF BLN ABC "STRESSTEST#04" (QUIZ) // 27-MAR-25');
}

// NAMING IN "FONTDATA" IS NOW EXCLUSIVELY BASED ON ACTUAL "CHAR-LITERAL" (WYSIWYG)
// AS COMPATIBLE WITH CODEPOINT UTF-8/ASCII
// ALTERNATES ARE IDENTIFIED BY AN ADDED SINGLE NUMBER // "2" DENOTING THE #FIRST# VARIANT-FORM
/* #NEXT GEN# (#TBD#) EXPAND "GRAPHEME_INFO"-OBJECT TO HOLD TOGGLE-PAIR DOM SWITCH CASE IN "BTNUCLC" @LINE ##1003## */



window.FONTINFO = new Map();


class GraphemeInfo {
	constructor(label, spacedlabel) { 																																				// (KEYBOARD)LABEL UN-SPACED
		this.label = label;
		this.spacedlabel = spacedlabel;
													// IDENTIFY (MTBG)LTRCASE BY FIRST CHAR #ONLY#
													// (NOT POSSIBLE AFTER SPLIT/SPACING OF LABEL)
		this.charcase = this.getcharcase(this.label) 																													// #TEMP# "charcase"=="CHARCASE"
		this.info = keyToLongname(this.label, this.charcase);
	}
	getcharcase(lbl) {
		return lbl.codePointAt(0);
	}
} // CLASS



																	//  "KEY-TO-LONGNAME" ("INFO")
// #TBD# (MIGHT BE) USEFUL TO EXTEND THIS WITH PARSER "CODEPOINT-TO-XSAMPA"
// (INFO MAY THEN INCLUDE ARTICULATION-HELP LIKE "VOICED/UNVOICED" AND/OR
// REFERENCES TO GRAPHEMES/PHONEMES IN L1)

function keyToLongname(label, ltrcase) {

	//console.log("KEY_TO_LONGNAME", label, ltrcase); // (UNSPACED)
	let longname;
	let ltrform = "";
	let ltrcasename = "";

// REGULAR LATIN
	if (ltrcase >= 97 && ltrcase <= 122) {
		ltrcasename = "kl"; // LINE ##51##																												// #TEMP# (SPOKEN) FORMAT NOT YET DECIDED
	} else if (ltrcase >= 65 && ltrcase <= 90) {
		ltrcasename = "gr";
	}
// CATCH LTRCASE OF ALL UMLAUTS
	if (ltrcase === 196 || ltrcase === 214 || ltrcase === 220) {
		ltrcasename = "gr"; // LINE ##57##																												// #TEMP# (SPOKEN) FORMAT NOT YET DECIDED
	} else if (ltrcase === 228 || ltrcase === 246 || ltrcase === 252) {
		ltrcasename = "kl";
	}


															// DE-MOTE UMLAUT TO BASE VOWEL IN NAME
// (FIX LTRCASE INDIVIDUALLY)
// #NEXT GEN# TRANSCRIPE FLAGGED ITEMS
// DI-GRAPHS (COMPOSITES) AS IN UTF SPECS
// Ä=A¨ (WITH SHIFT)
// i=ı˙
// j=j˙ (TBD)
														// AND FOR ALL OTHER DIACRTITICS OR ACCENTS
	//if (id.includes('uml')) {
		let test = label[0];
		let umlaut = "";

		switch (test) {
  		case 'Ä': // 196						// Ä**
  			umlaut = ` A-Umlaut*`; 																																// "*" = MANDATORY LINK TO ARTICULATION-HELP
  			break;
  		case 'Ö': // 214						// Ö**
  			umlaut = ` O-Umlaut*`;
  			break;
  		case 'Ü': // 220						// Ü**
  			umlaut = ` U-Umlaut*`;
  			break;
  		case 'ä': // 228						// ä**
  			umlaut = ` a-Umlaut*`;
  			break;
  		case 'ö': // 246						// ö**
  			umlaut = ` o-Umlaut*`;
  			break;
  		case 'ü': // 252						// Ü**
  			umlaut = ` u-Umlaut*`;
  			break;
  		//default:
  			//console.log(`(NOT UMLAUTS) ${test}`); // OK
		} // SWITCH




													// TRANSLATE ALT-PROPERTY TO ACTUAL DESCRIPTOR
// "HAND-CURATED" COMMENTS NECESSARY (REQUIRING LANGUAGE/SUBJECT MATTER KNOWLEDGE)
// ##TBD## FOR FUTURE (MORE COMPLEX) FONTS MOVE THIS TO A LOOKUP-TABLE
// #ALL# ALTS IN CURRENT FONT
		switch (label) {
  		case 'a2':
  			ltrform = '(double storey)';
    		break;
  		case 'ä2': 											// ä2**
  			ltrform = '(double storey)';
    		break;
  		case 'g2':
  			ltrform = '(double storey1)';
    		break;
  		case 'g3':
  			ltrform = '(double storey2)';
    		break;
  		case 'g4':
  			ltrform = '(double storey3)';
    		break;
			case 'G2':
  			ltrform = '(two strokes)';
    		break;
			case 'I2':
  			ltrform = '(with serifs)';
    		break;
			case 'J2':
  			ltrform = '(top closed)';
    		break;
			case 'M2':
  			ltrform = '(two strokes)';
    		break;
			case 'N2':
  			ltrform = '(two strokes)';
    		break;
			case 'y2':
  			ltrform = '(rounded descender)';
    		break;
			case 'ng2':
  			ltrform = `(nasal "ng" with dbl-storey "${label.slice(-2)}")`;
    		break;
			case 'ing2':
  			ltrform = `(nasal "ing" with dbl-storey "${label.slice(-2)}")`;
    		break;
    												// CATCH MTBG/DIPHTONGS WITH UMLAUT OR ALT
			case 'a2u':
  			ltrform = `(with double-storey "${label[0]}")`;
  			//console.log("______________ a2u ______________", "N.N.");
    		break;
			case 'äu': 											// ä**u
  			umlaut = ` au-Umlaut*`;
  			//console.log("______________ äu _______________", umlaut);
    		break;
			case 'Äu': 											// Ä**u																									// #TBD# SKIP "Äu" B/C (VERY RARE) EDGE CASE
  			umlaut = ` Au-Umlaut*`;
  			//console.log("______________ Äu _______________", umlaut);
    		break;
			case 'ä2u': 											// ä2**u
  			ltrform = `(with double-storey "${label[0]}")`;
  			umlaut = ` au-Umlaut*`;
  			//console.log("______________ ä2u ______________", umlaut);
    		break;

  		//default:
  			//console.log(`(REGULAR LABEL) ${label}`); // OK 																			// "ß"/"ß2" PROCESSED FURTHER DOWN
		} // SWITCH

// CONCAT FULL LOGNAME (INFO)
	longname = ` ${ltrcasename} "${label}"${umlaut} ${ltrform}`;

// #OVERWITE# REPETITION OF VERSION-NUM IN INFO
// (#TEMP#) UNDO WHEN GLYPH CAN BE SHOWN WYSIWYG
	if (label.includes('2') || label.includes('3') || label.includes('4')) {
		const regex = /[2-4]/g;
		let index = label.search(regex);
		let num = label[label.search(regex)];
		let stem = label.replace(num, "");
		//console.log("__________LABEL TO STEM__________", label, stem) // OK
		longname = ` ${ltrcasename} "${stem}"${umlaut} ${ltrform}`;
	}

// SS-LIG
// #OVERWRITE# ALL PREVIOUS
	//if (id.includes('sslig')) {
		if (label === "ß2") {
			longname = ` old-style "scharfes-s" ("long-s/final-s" ligature)`;
		} else if (label === "ß") {
			longname = ` geometric "scharfes-s" ("German B")`;
		} else if (label === "ie") {
			longname = ` "langes-i"`; 																															// FOR "LONGNAME" (INCLUDE IMPORTANT COMPOSITES)
		}

	return longname;

} // END LONGNAME


export { GraphemeInfo }

