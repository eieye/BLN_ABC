/* BLN ABC 0.9 (beta) A Primer for basic literacy development | Ein "Vorkurs" zur Alphabetisierung in Deutsch als Zweitsprache
 * Copyright (C) 2025 Jens Kreitmeyer <self@jenskreitmeyer.de>
 * This file is part of BLN ABC
 * (for the full length copyright notice see the HTML index file and "COPYING.txt")
 */

if (DEBUG_PIPE) {
	console.log('##MODULE## "PARSE LTR VERSIONS" PART OF BLN ABC "STRESSTEST#04" (QUIZ) // 27-MAR-25');
}

																// (UTILITY) PARSE VERSION NUMBERS
// RETURN SPACED "LABEL" = "spacedlabel" FOR CHAR-WITH-NUM OR PLAIN MTBG OR MTBG WITH INCLUDED CHAR-WITH-NUM
/* MOVED FROM "SETUP_DOMLAYER" // 110325 */




// DO NOT SPLIT CHAR-WITH-NUM FOR STYLISTIC VARIANTS WHEN SPACING
// LINE ##498##
function parseVersion(label) {

//console.log("–––––––––LABEL (PARSER)–––––––––", label);
	let regular_ltrs = "";				 											 											// REGULAR LTRS IN A COMPOSITE WITH A VARIANT
	let protospacedlabel = "";

// CHECK IF LABEL CONTAINS VARIANTS
	if ( label.includes('2') || label.includes('3') || label.includes('4')) {
// FIND INDEX OF NUMBER
		const regex = /[2-4]/g;
		let index = label.search(regex);
		let num = label[label.search(regex)];
		let variant = label[index - 1] + num; // (WANTED) THE CHAR PRECEDING THE NUMBER
// MAP VARIANT TO ID
		protospacedlabel = variant;

// SEPARATE REGULAR CHARS
		if (label.length > 2) { 																							// "COMBINED VARIANT" VARIANT PLUS REGULAR
			let tempsplit = label.split(variant);
			let splitpart;
			if (tempsplit[0]) {
				splitpart = tempsplit[0];
				for (let i = 0; i < splitpart.length; i++) {
					regular_ltrs += splitpart[i] + " ";
				}
				protospacedlabel = regular_ltrs + protospacedlabel;
			} else if (tempsplit[1]) {
				splitpart = tempsplit[1];
				for (let i = 0; i < splitpart.length; i++) {
					regular_ltrs += " " + splitpart[i];
				}
				protospacedlabel = protospacedlabel + regular_ltrs;
			}
		} // END LENGTH
// END CONTAINS NUM

	} else {
// NO ALT-NUMS
// MULTI-PART
		let compspacedlabel = "";
		for (let i = 0; i < label.length; i++) {
			let firstcase = label[0];
			compspacedlabel += label[i] + " "; // RETURN #SPACED# OBJ(LOOKUP)-spacedlabel
		}
		protospacedlabel = compspacedlabel.trimEnd();
	}
//console.log("––––––––– (PARSER) "(PROTO)SPACEDLABEL" –––––––––", protospacedlabel);


	return protospacedlabel;

} // END PARSE VERSION






export { parseVersion };

