class TicTacToe {
	constructor(mode) {
		this.mode = mode;
		this.board = new Board(this);

		if (this.mode == 'pvp') {
			this.players = [new Player(1, 1), new Player(2, -1)];
		} else if (this.mode == 'pvai') {
			this.players = [new Player(1, 1), new AI(2, -1, this)];
		}
		
		
		this.trackers = [
			// Rows
			new Tracker(this, [this.board.cells[0][0], this.board.cells[0][1], this.board.cells[0][2]]), // 0, n
			new Tracker(this, [this.board.cells[1][0], this.board.cells[1][1], this.board.cells[1][2]]), // 1, n
			new Tracker(this, [this.board.cells[2][0], this.board.cells[2][1], this.board.cells[2][2]]), // 2, n
			// Cols
			new Tracker(this, [this.board.cells[0][0], this.board.cells[1][0], this.board.cells[2][0]]), // n, 0
			new Tracker(this, [this.board.cells[0][1], this.board.cells[1][1], this.board.cells[2][1]]), // n, 1
			new Tracker(this, [this.board.cells[0][2], this.board.cells[1][2], this.board.cells[2][2]]), // n, 2
			// Diagonals
			new Tracker(this, [this.board.cells[0][0], this.board.cells[1][1], this.board.cells[2][2]]), // n, n
			new Tracker(this, [this.board.cells[0][2], this.board.cells[1][1], this.board.cells[2][0]])  // n, m; n+m = 2
		];


		this.winner = null;
		this.finished = false;

		this.turn = 0;


	}

	changeTurn () {
		switch (this.turn) {
			case 0:
				this.turn = 1;
				break;
			case 1:
				this.turn = 0;
				break;
		}
	}

	move (row, col) {
		if (this.finished) {
		} else if (this.board.cells[row][col].value){
			console.log('Movement not allowed: cell already in use');
		} else {
			this.board.cells[row][col].setValue(this.players[this.turn].stone);
			this.board.countCell();
			this.callTrackers(row, col);
			this.changeTurn();
		}

		if (this.mode == 'pvai' && this.turn == 1) {
			this.players[1].move();
		}
	}


	finish(winnerFlag = 0){
		this.finished = true;
		if (winnerFlag) {
			switch (winnerFlag) {
				case 3:
					this.winner = this.players[0];
					break;
				case -3:
					this.winner = this.players[1];
					break;
			}
		} 	
	}


	callTrackers(row, col) {
		switch (row) {
			case 0:
				this.trackers[0].track();
				break;
			case 1:
				this.trackers[1].track();
				break;
			case 2:
				this.trackers[2].track();
				break;
		}

		switch (col) {
			case 0:
				this.trackers[3].track();
				break;
			case 1:
				this.trackers[4].track();
				break;
			case 2:
				this.trackers[5].track();
				break;
		}

		if (row == col){
			this.trackers[6].track();

		}

		if (row + col == 2){
			this.trackers[7].track();

		}
	}
}


class Board {
	constructor(game) {
		this.game = game;

		this.cells = [
			[new Cell(0, 0), new Cell(0, 1), new Cell(0, 2)],
			[new Cell(1, 0), new Cell(1, 1), new Cell(1, 2)],
			[new Cell(2, 0), new Cell(2, 1), new Cell(2, 2)]
		];

		this.freeCells = 9;
	}

	countCell() {
		this.freeCells--;

		if (!this.freeCells) {
			this.game.finish();
		}
	}

}


class Cell {
	constructor(row, col) {
		this.position = [row, col];
		this.value = 0;
	}

	setValue(value) {
		this.value = value;
	}
}


class Tracker {
	constructor(game, cells) {
		this.game = game;
		this.cells = cells;
	}

	get sum() {
		var sum = 0;
		for (let i = 0; i < this.cells.length; i++) {
			sum += this.cells[i].value;
		}

		return sum;
	}

	track(){
		if (this.sum == 3 || this.sum == -3) {
			this.game.finish(this.sum);
		}
	}
}


class Player {
	constructor(id, stone){
		this.id = id;
		this.stone = stone;
	}
}

