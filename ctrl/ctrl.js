class CtrlGame {
	constructor(){
		this.game = new TicTacToe();
		this.view = new ViewGame();

		this.generateEvents();

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