class TicTacToe {
	constructor() {
		this.board = new Board();
		this.players = [new Player(this, 0, 1), new Player(this, 1, -1)];
		this.winner = null;

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

	move (cell) {
		// cell: array [number row, number col]
		if (this.winner === null) {
			this.players[this.turn].move(cell);
		} else {
			// Test in console
			console.log('Movement not allowed: Game is finished');
		}
	}

	// play() {
	// 	while (this.winner === null) {
	// 		// Test in console
	// 		var cell = prompt ('Position (row, col');

	// 	}
	// }
}


class Board {
	constructor() {
		this.cells = [
			[new Cell(0, 0), new Cell(0, 1), new Cell(0, 2)],
			[new Cell(1, 0), new Cell(1, 1), new Cell(1, 2)],
			[new Cell(2, 0), new Cell(2, 1), new Cell(2, 2)]
		];

		this.trackers = [
			// Rows
			new Tracker([this.cells[0][0], this.cells[0][1], this.cells[0][2]]),
			new Tracker([this.cells[1][0], this.cells[1][1], this.cells[1][2]]),
			new Tracker([this.cells[2][0], this.cells[2][1], this.cells[2][2]]),
			// Cols
			new Tracker([this.cells[0][0], this.cells[1][0], this.cells[2][0]]),
			new Tracker([this.cells[0][1], this.cells[1][1], this.cells[2][1]]),
			new Tracker([this.cells[0][2], this.cells[1][2], this.cells[2][2]]),
			// Diagonals
			new Tracker([this.cells[0][0], this.cells[1][1], this.cells[2][2]]),
			new Tracker([this.cells[0][2], this.cells[1][1], this.cells[2][0]])
		];
	}
}


class Cell {
	constructor(row, col) {
		this.position = [row, col];
	}

	get value() {
		return this.value;
	}

	set value(stone) {
		if (!this.value) {
			this.value = stone;
		} 
	}
}


class Tracker {
	constructor(cells) {
		this.cells = cells;
	}

	get sum() {
		var sum = 0;
		for (let i = 0; i < this.cells.length; i++) {
			sum += this.cells[i].value;
		}
	}
}


class Player {
	constructor(game, id, stone){
		this.game = game;
		this.id = id;
		this.stone = stone;
	}

	move (cell){
		if (!this.game.board.cells[cell[0]][cell[1]].value) {
			this.game.board.cells[cell[0]][cell[1]].value = this.stone;
		} else {
			// Test in console
			console.log('Movement not allowed: cell already in use');
		}	
	}
}

