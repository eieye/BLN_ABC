/* BLN ABC 0.9 (beta) A Primer for basic literacy development | Ein "Vorkurs" zur Alphabetisierung in Deutsch als Zweitsprache
 * Copyright (C) 2025 Jens Kreitmeyer <self@jenskreitmeyer.de>
 * This file is part of BLN ABC
 * (for the full length copyright notice see the HTML index file and "COPYING.txt")
 */

if (DEBUG_PIPE) {
	console.log('##MODULE## "LTRCASE_(FIND_)COMPLEMENT" PART OF BLN ABC "STRESSTEST#04" (QUIZ) // 27-MAR-25');
}

// "COMPLEMENT" IS THE CROSS-WISE "OPPOSITE" (COMPLEMENTARY) CASE (UC-FOR-LC AND VICE VERSA)
// (MANUALLY) DEFINE EXCEPTIONSLIST "HAS-LOWERCASE-ONLY" FOR CHARS/MTBG IN CURRENT COLLECTION // @LINE ##15##
// ALL OTHERS CONVERT TO "OPPOSITE" CASE AND STRIP VERSION NUMBER // @LINE ##61##
// (RETURN TO WIREDOM_SELECTLIST)




// ============  ============  ============  ============  ============  ============  ============
// FORMAT == SPACED LABEL // LINE ##20##
let exceptionslist = ["ß", "ß2", "c h s", "i e", "n g", "n g2", "i n g", "i n g2", "a c h s o"];  // ##TEMP## TEST "i e" // (YOU NAME IT)
console.log("(LTRCASE COMPLEMENT) EXCEPTIONSLIST LC-ONLY", exceptionslist);

// ## CURENT IMPLEMENTATION ##
// NO UPPERCASE INCLUDED FOR "ß" AND "ß2" (AKA "GERMAN B"/SSLIG)
// ("ß" "ß2" IS SORTED AFTER "s")
// ALL OTHER LOWERCASE-VARIANTS ARE COMPLEMENTED BY THE REGULAR UPPERCASE (EVEN IF A UC-VARIANT EXISTS)
// a2 ä2 g2 g3 g4 y2 
// ANY VARIANTS OF UPPERCASE ARE JUST "ISOLATED" EXTRAS
// G2 I2 J2 M2 N2

// ##NEXT GEN## (FROZEN) // SOME ALT-LOWERCASE GLYPHS MAY HAVE AN ALT-UPPERCASE
// ALT-LOWERCASE "g2" (DBL-STORY) LIKE ALT-LC "a2" (DBL-STORY) IS TIED MOSTLY TO ANTIQUA-STYLE FONTS 
// (BEST EXAMPLE FRANKLIN GOTHIC) SO A SPECIFIC FONT MAY JUST NOT HAVE A "GEOMETRIC/SANS-SERIF" UPPER CASE
// STILL BOTH FORMS UC/LC MAY BE FREELY MIXED (#TBD# TRUE OR FALSE?) WHEN IN THE FONT
// (COMPARE THIS TO "J2" "M2""N2" AND "y2" THAT ARE JUST AVAILABLE "EXTRAS" (WITH "N2" JUST A STROKE-ORDER ALTERNATIVE)
// "I2" IS SPECIFICALLY FOR "DIS-AMBIGUATION" IN CRITICAL CASES // SIMILAR TO UC "O" VS. FIGURE "0" (ZERO) WITH DASH/DOT





function ltrcaseComplement(spacedlabel) {


// ============  ============  ============  ============  ============  ============  ============
// CHECK AGAINST LIST "LC-ONLY"
	exceptionslist.forEach((exception) => {
		if (spacedlabel === exception) {
			//console.log(`(EXCEPTIONS) SPACEDLABEL ${spacedlabel} ITEM ${exception}`);
			spacedlabel = ""; // (NN) // ##WATCH ITEM##
		}
	});


	let complement = [];

// SPLIT TO ARRAY
// (PRESERVING "LEGIT" DIPHTHONGS/DIGRAPHS LIKE "a2u" AND "ä2u" OR "g2e")
	let splitchars = spacedlabel.split(" ");																												// (VAR "KEYCHARS" (ARRAY) IS USED FOR RENDERING)
	//console.log(`SPACEDLABEL ${spacedlabel} SPLITCHARS ${splitchars}`);

	let initialchar = splitchars[0];
	//console.log(`SPLITCHARS ${splitchars} INITIALCHAR ${initialchar}`);


// STRIPPING VERSION-NUM FROM INITIAL GLYPH // LINE ##61##
// (CURRENTLY LIMITED TO "au/a2u" "äu/ä2u" "ge/g2e")
	if (initialchar.length > 1) {
	// 	console.log(`\t\tFIRST CHAR ALT-VERSION ${initialchar}`);

// ##TBD## (REDUNDANT) CHECK IF 2ND CHAR IS A NUMBER (IT CAN BE NOTHING ELSE)
//console.log(`${initialchar} 2ND CHAR "${initialchar[1]}" IS A NUMBER ${ isNaN(Number.parseInt(initialchar[1])) === false }`);

// /!\ GENERALLY TRUNCATE // STRIP NUM
// SET REG-GLYPH AS COMPLEMENT ("x#"->"X" OR "X#"->"x")
		initialchar = initialchar[0]; 																																// (NO LIGATURES.-)
		splitchars[0] = initialchar;
	}






// TEST FOR ORIGINAL LTRCASE
	let initialToUpper = splitchars[0].toUpperCase();
	let newcase;

	if (initialToUpper === initialchar) {
// 	console.log(`\tFIRST CHAR IS UPPER ${initialchar}`);
// 	console.log(`\tCOMPLEMENT IS LOWER ${initialchar.toLowerCase()}`);
		newcase = initialchar.toLowerCase();
	
	} else {
// 	console.log(`\tFIRST CHAR IS LOWER ${initialchar}`);
// 	console.log(`\tCOMPLEMENT IS UPPER ${initialchar.toUpperCase()}`);
		newcase = initialchar.toUpperCase();
	}



// RE-CONVERT TO (WORD)SPACED LABEL // DEEP COPY
	splitchars.forEach((elem) => {
		complement.push(elem);
	});

	complement[0] = newcase;
	complement = complement.join(" "); // FORMAT SPACEDLABEL

//console.log(`\t\tSPACEDLABEL ${spacedlabel} COMPLEMENT ${complement}`); // TIPPITOPPI (250221 2235)

	return complement;

} // (END LTRCASE_COMPLEMENT)






export { ltrcaseComplement };

