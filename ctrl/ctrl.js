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
		this.mode = mode;

		this.view = new ViewGame(stones, mode);

		this.generateEvents();


		this.view.showMessage('turn', this.game.turn);

	}

	bindEvent(element, row, col){
		element.addEventListener('click', () => {
			if (!this.game.finished && (this.mode == 'pvp' || (this.mode == 'pvai' && this.game.turn === 0))) {
				this.move(row, col);
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

	move (row, col) {
			if (this.game.isValid(row, col)) {
				var element = this.view.getCell(row, col);
				this.view.setStone(element, this.game.turn);
				this.game.move(row, col);
				this.checkFinished();
				this.view.showMessage('turn', this.game.turn);
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