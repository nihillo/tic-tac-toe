/*Write examples with Arrays to solve the next problems using only Array methods 
(like iterators, etc...):

a) find largest number

b) find longest string

c) find even numbers

d) find odd numbers

e) find words that contain 'is'

f) assert all numbers are divisible by three

g)  zip two arrays together

h) sort joined array from smallest to largest

i) remove the first word in the array

j) place a new word at the start of the array

k) replace some elements

l) Over an array with names, find all entries whose firstname starts with 'J',  
create projection combined of only the initials of the name and then sort 
alphabetically.*/


// AUX FUNCTIONS AND ARRAYS
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


var numbers = [];
for (let i = 0; i < 20; i++) {
	numbers.push(randInt(0, 100));
}


var baseString = `
	Lorem ipsum dolor sit amet, consectetur adipisicing elit. 
	Odit in ducimus nesciunt nisi itaque repudiandae repellat perferendis, 
	praesentium expedita, labore temporibus numquam reiciendis eius nulla 
	delectus pariatur, dolorum dignissimos quisquam.
`;

var strArray = baseString.split(' ');


var multiplesOf3 = [];
for (let i = 0; i < 20; i++) {
	multiplesOf3.push(randInt(0, 100)*3);
}


var baseNames = 'John Smith, Mary Osmond, Jane Calamity, Margaret Flowers, Audrey Hepburn, Joe Tribbiani';
var names = baseNames.split(', ');




// TASKS

/* a) find largest number */
function compare(a, b) {
	return a - b;
}

function largestNumber(array) {
	var aux = array.slice();
	return aux.sort(compare)[numbers.length-1];
}


console.log(largestNumber(numbers));



/* b) find longest string */
function compareStr(strA, strB) {
	return strA.length - strB.length;
}

function longestStr(array) {
	var aux = array.slice();
	return aux.sort(compareStr)[strArray.length-1];
}


console.log(longestStr(strArray));



/* c) find even numbers */
function isEven(value) {
	return value % 2 === 0;
}

function findEven(array) {
	return array.filter(isEven);
}

console.log(findEven(numbers));



/* d) find odd numbers */
function isOdd(value) {
	return value % 2 !== 0;
}

function findOdd(array) {
	return array.filter(isOdd);
}

console.log(findOdd(numbers));



/* e) find words that contain 'is' */
function findSubstr(array, substr) {
	return array.filter(function(value) {
		var regExp = new RegExp(substr);
		return regExp.test(value);
	});
}

console.log(findSubstr(strArray, 'is'));



/* f) assert all numbers are divisible by three */
function allDivisibleBy3(array) {
	return array.every(function(value) {
		return value % 3 === 0;
	});
}

console.log(allDivisibleBy3(multiplesOf3));
console.log(allDivisibleBy3(numbers));



/* g)  zip two arrays together */
function zip(array1, array2) {
	return array1.concat(array2);
}

console.log(zip(numbers, multiplesOf3));



/* h) sort joined array from smallest to largest */
function joinAndSort(array1, array2) {
	return array1.concat(array2).sort(compare);
}

console.log(joinAndSort(numbers, multiplesOf3));



/* i) remove the first word in the array */
function removeFirst(array) {
	aux = array.slice();
	aux.shift();
	return aux;
}

console.log(removeFirst(strArray));



/* j) place a new word at the start of the array */
function addAtFirst(array, value) {
	aux = array.slice();
	aux.unshift(value);
	return aux;
}

console.log(addAtFirst(strArray, 'Morcillem'));



/*k) replace some elements*/
function replaceFirst(array, value) {
	aux = array.slice();
	aux.splice(0, 1, value);
	return aux;
}

console.log(replaceFirst(strArray, 'Morcillem'));



/* l) Over an array with names, find all entries whose firstname starts with 'J',  
create projection combined of only the initials of the name and then sort 
alphabetically. */

function startingWith(array, letter) {
	var nArray = array.map(function(value) {
		if (value[0] == letter) {
			var name = '';
			var nArr = value.split(' ');
			var nMod = `${nArr[0][0]}. ${nArr[1]}`;
			return nMod;
		}
	});

	// Remove undefined values
	while (nArray.indexOf(undefined) != -1){
		nArray.splice(nArray.indexOf(undefined), 1);
	}

	nArray.sort();
	return nArray;
}

console.log(startingWith(names, 'J'));
console.log(startingWith(names, 'M'));