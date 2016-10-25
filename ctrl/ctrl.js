class CtrlSelector {
	constructor() {
		this.view = new ViewSelector();

		var self = this;

		this.view.selectorForm.addEventListener('submit', function(e){
		    e.preventDefault();    //stop form from submitting
	       	
	       	var mode = self.view.selectorForm.mode.value;
	       	var stones = self.view.selectorForm.stones.value;
			// if (self.view.selectorForm.stones.value == 'reversed') {
			// 	stones.reverse();
			// }

			location.hash = `#game/${mode}/${stones}`;
			location.reload();
		});
	}
}


class CtrlGame {
	constructor(mode, stones = 'straight'){
		
		this.game = new TicTacToe(mode);
		
		this.view = new ViewGame(stones);

		this.generateEvents();

		// this.mode = mode;
		// if (stones == 'straight') {
		// 	this.stones
		// }

	}

	bindEvent(element, row, col){
		var self = this;
		element.addEventListener('click', function(){
			if (!self.game.finished) {
				self.view.setStone(element, self.game.turn);
				self.game.move(row, col);
				self.checkFinished();
			}
		});
	}

	generateEvents() {
		for (let row = 0; row < 3; row++){
			for (let col = 0; col < 3; col++){
				this.bindEvent(this.view.getCell(row, col), row, col);
			}
		}
	}

	checkFinished() {
		if (this.game.finished) {
			if (this.game.winner) {
				this.view.showMessage('winner', this.game.winner.id);
			} else {
				this.view.showMessage('tie');
			}
		}
	}
}