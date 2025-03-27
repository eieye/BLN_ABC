/* BLN ABC 0.9 (beta) A Primer for basic literacy development | Ein "Vorkurs" zur Alphabetisierung in Deutsch als Zweitsprache
 * Copyright (C) 2025 Jens Kreitmeyer <self@jenskreitmeyer.de>
 * This file is part of BLN ABC
 * (for the full length copyright notice see the HTML index file and "COPYING.txt")
 */

if (DEBUG_PIPE) {
	console.log('##MODULE## "CONFIG_SETTINGS" PART OF BLN ABC "STRESSTEST#04" (QUIZ) // 27-MAR-25');
}
/* FIRST SKETCH OF COLLECTING "SETTINGS" (USER OPTIONS) */





var rndmCol1, rndmCol2, rndmSelect;

																	// GENERATE RANDOM COLOR
// = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =
// (EXPERIMENTAL)
// CALLED FROM "HANDLERS" @LINE ##470##

	function setDblRandomColor() {

		rndmCol1 = getRandomIntInclusive(0, 360);
		rndmCol2 = getRandomIntInclusive(0, 360);

		//let dblrndmCol = [rndmCol1, rndmCol2];
		//console.log(`bg  ${rndmCol1}\t100% 75% / .75\ndot ${rndmCol2}\t100% 75% / 1`);
	}



																			// RANDOM SELECTION
																	// (FROM CURRENT COLLECTION)
// = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =
		function pickRandomFromCollection() {

			//console.log("CURRENT COLLECTION", COLLECTION);
			let collarray = COLLECTION.split(", ");
			//console.log("SPLIT COLLECTION", collarray);
			
			let colllen = collarray.length;
			let rndmnum = getRandomIntInclusive(0, colllen - 1);
			console.log("\t\t(QUIZ) RNDM NUM", rndmnum, collarray[rndmnum]);

			return rndmSelect = collarray[rndmnum]; // IS LABEL (UNSPACED)
			
		}





																				// RANDOM VALUE
// = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =
	function getRandomIntInclusive(min, max) {
 	 const minCeiled = Math.ceil(min);
  	const maxFloored = Math.floor(max);

 	 return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled);
		// MDN // The maximum is inclusive and the minimum is inclusive
	}







// EXPORT
export { setDblRandomColor, rndmCol1, rndmCol2, pickRandomFromCollection };


