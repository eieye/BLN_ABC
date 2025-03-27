/* BLN ABC 0.9 (beta) A Primer for basic literacy development | Ein "Vorkurs" zur Alphabetisierung in Deutsch als Zweitsprache
 * Copyright (C) 2025 Jens Kreitmeyer <self@jenskreitmeyer.de>
 * This file is part of BLN ABC
 * (for the full length copyright notice see the HTML index file and "COPYING.txt")
 */

if (DEBUG_PIPE) {
	console.log('##MODULE## "ASSEMBLE_MULTIPART" PART OF BLN ABC "STRESSTEST#04" (QUIZ) // 27-MAR-25');
}





FONTDATA ? console.log("\t\t\t\t\tFONTDATA . . . IN ASSEMBLE_MULTIPART OK") : console.log("\t\t\t\t\tFONTDATA . . . IN ASSEMBLE_MULTIPART FAILED");




// COMPOSITE CHARS OF MTBG INTO COMMON D-DATA 
// AND INSERT DATA INTO "TEMPLATE" (SAME AS FOR SINGLES)

function assembleMultiPart(keychars) {																											// ARG "KEYCHARS" HAS FORMAT '["s", "c", "h"]'
	//console.log("\t\t\t--- ASSEMBLE MULTIPART");

		// ––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
																				// COMPOSITE WIDTH
	let mtbg_width = 0; 			// TYPE TO "NUM"
	let partwidth;						// PARTIAL WIDTH GLYPH ("DICKTE")
	let offsets = []; 				// COLLECT WIDTH EACH MEMBER
	let stackedoffsets = [];	// ACCUMULATE WIDTHS PER MEMBER

// (SPLIT TO ARRAY FROM LABEL-STRING) // ###TBD### USE "WIDTH"
	keychars.forEach((item) => {
		partwidth	= FONTDATA[item].width; //viewbox.split(" ")[2]; 																				// STORE WIDTH-DIMENSIONS
		//console.log(parseFloat(partwidth)); 																										// (LAST ITEM'S OFFSET IS NOT USED)
		mtbg_width += parseFloat(partwidth);
		offsets.push(parseFloat(partwidth));
	});

// FIT MTBG TO SCREEN-WIDTH (LANDSCAPE HORIZON) AND BUILD FULL-WIDTH RULERS
	if (DEBUG_PIPE) {
		console.log('(ASSEMBLE_MULTIPART) MTBG WIDTH', mtbg_width); // ("ASSEMBLE" WAS CALLED TWICE B/C WRONG DESTRUCT-SYNTAX ON RETURN VALUE)
	}

		// ––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
																					// STACK OFFSETS
	offsets.unshift(0); 																																				// ADDS FIRST/MUTATING
	//console.log("(unshift) offsets", offsets);
	offsets.pop(); 																																							// REMOVES LAST/MUTATING
	//console.log("OFFSETS", offsets);

	let index = offsets.length - 1;
	if (index >= 1) {
		stackedoffsets[0] = offsets[0];
		stackedoffsets[1] = offsets[1];
		for (let i = 1; i < index; i++) {
			stackedoffsets[i + 1] = stackedoffsets[i] + offsets[i + 1];															// (EXPECTED MAX NUM OF MEMBERS IS 5)
		}
	} else {
		stackedoffsets[0] = offsets[0]; 																													// NO OFFSET FOR FIRST/SINGLE LTR
	}
	//console.log("STACKED OFFSETS", stackedoffsets);


													// FLATTEN DDATA IN "FONTDATA" FOR PROCESSING
	let DDATA_flat = "";
	let DDATA_rows;
	let DDATA_shifted = "";
	var DDATA_multipart = ""; // (MODULE SCOPE)

// "FLATTEN" D-DATA FOR MTBG
// CREATE A NEW LINE FOR EACH BEZIER EXPRESSION
// WRITE D-DATA TO COLUMNS // "M(OVE)" (1) XY-PAIR//"C(URVE)" (3) XY-PAIRS
// SPLIT ROWS AND ADD OFFSETS TO X-VALUES (STARTING LINE ##110##)

	for (let i = 0; i < keychars.length; i++) {
// WRITE COLUMNS
		let rawdata = FONTDATA[keychars[i]].data;
		//console.log("rawdata", rawdata);
		DDATA_flat = rawdata.replaceAll("M", "\nM");
// ##MEMO##
// DDATA-STRING IN "FONTDATA" (FROM HTML-SVG TO JSON) 
// CONTAINS "\n" NEWLINE BEFORE ALL "C" EXCEPT(!) THE FIRST
		DDATA_flat = DDATA_flat.replaceAll("C", "\nC");
		DDATA_flat = DDATA_flat.replaceAll("\n\n", "\n");
		//console.log("DDATA_flat", DDATA_flat); // OK

// SPLIT LINES
		DDATA_rows = DDATA_flat.split('\n');
						//console.log("–––––––––––––DDATA_rows––––––––––––––", DDATA_rows); // ARRAY

// SHIFT FIRST // POP LAST
// (REMOVE EMPTY LINES)
		DDATA_rows.pop();
		DDATA_rows.shift();
						// OK (REMOVED NEW LINES // "M"-LINES STILL HAVE WORDSPACE AT END)
						//console.log("–––––––––––––DDATA_rows––––––––––––––", DDATA_rows); // ARRAY


		let localoffset = stackedoffsets[i]; 
		//console.log("stackedoffsets", stackedoffsets);

// ##MEMO##
// RESERVE HOOK TO ENABLE VARIABLE LETTTER-SPACING ==
// ADD PLUS/MINUS SPACING TO EACH LOCAL OFFSET
// LIKELY 3 SETTING WOULD BE SUFFICIENT ("NARROW/NORMAL/WIDE")

// ADD OFFSET GLYPH-WISE TO X-VALUES IN EACH ROW
			// X OF M IDX 1
			// X OF C IDX 1 3 5
			// FOR LENGTH OF ARRAY PICK ODD INDICES
			// PARSE TO FLOAT ADD OFFSET

		// ––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
														// OFFSET X-COORDS GLYPHWISE // LINE ##110##
		DDATA_rows.forEach((row) => {
			let DDATA_columns = row.split(' ');
 			if (DDATA_columns.length <= 4) {															// ##TBD## CURRENTLY HAS EMPTY INDEX "" AT END
 				//console.log("DDATA_columns", DDATA_columns);
 				DDATA_columns[1] = parseFloat(DDATA_columns[1]) + localoffset;
 			} else {
 				//console.log("DDATA_columns", DDATA_columns);
 				DDATA_columns[1] = parseFloat(DDATA_columns[1]) + localoffset;
 				DDATA_columns[3] = parseFloat(DDATA_columns[3]) + localoffset;
 				DDATA_columns[5] = parseFloat(DDATA_columns[5]) + localoffset;
 				//console.log("LOCAL OFFSET", localoffset);
			}
			//console.log("DDATA_columns", DDATA_columns); // MUTATED
			DDATA_columns = DDATA_columns.join(' ');
														// # # # # # # # # # # # # # # # # # # # # # # # # # #
														// GET "PURE" BEZIER DATA FOR SAMPLING
			//console.log("DDATA_columns", DDATA_columns); // OK

// (RE)COMPOSITE TO MULTIPART
			DDATA_multipart += DDATA_columns + "\n"; 																				// (NL PRESERVE SOME LEGIBILITY)

		}); // ROWS
	} // FOR KEYCHARS

	//console.log("MULTIPART\n", DDATA_multipart);
	//console.log("\t\t\txxx END ASSEMBLE MULTIPART");
	let MTBG = {
		DDATA: DDATA_multipart,
		glyphwidth: mtbg_width
	}
	return MTBG;

} // END ASSEMBLE MTBG




																						// EXPORT
export { assembleMultiPart }






