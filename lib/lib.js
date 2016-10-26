/*const SIZE = 3; */


function rand(min, max) {
/*	Return a random float between min and max
*/
	var rndCoef = Math.random();
	return min + rndCoef * (max - min); 
}


function randInt(min, max) {
/*	Return a random int between min and max
*/	
	return Math.floor(rand(min, max + 1));
}


