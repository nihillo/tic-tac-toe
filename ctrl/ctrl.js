var controller;
var game = new TicTacToe();

class Controller {
	constructor(){
		this.generateEvents();
		this.messages = new Messages();
	}

	getCell(row, col) {
		return document.querySelectorAll(`[data-row="${row}"][data-col="${col}"]`)[0];
	}

	bindEvent(element, row, col){
		var self = this;
		element.addEventListener('click', function(){
			if (!game.finished) {
				game.turn === 0 ? element.innerHTML = 'x' : element.innerHTML = 'o';
				game.move(row, col);
				self.checkFinished();
			}
		});
	}

	generateEvents() {
		for (let row = 0; row < 3; row++){
			for (let col = 0; col < 3; col++){
				this.bindEvent(this.getCell(row, col), row, col);
			}
		}
	}

	move() {

	}

	checkFinished() {
		if (game.finished) {
			this.showMessage(this.messages.finished);
			if (game.winner) {
				this.showMessage(this.messages.winner);
			} else {
				this.showMessage(this.messages.tie);
			}
		}
	}

	showMessage(message) {
		// console.log(message);
		document.getElementById('message').innerHTML += message + ' ';
	}
}


class Messages {
	constructor() {
		this.finished = 'Game finished.';
		this.tie = 'It\'s a tie.';
	}

	get winner() {
		return 'Winner: Player ' + game.winner.id +'.';
	}
}





// Init controller
window.onload = function(){
	controller = new Controller();
};