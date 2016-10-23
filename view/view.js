class View {
	constructor() {
		this.content = document.getElementById('content');
	}
}

class ViewGame extends View {
	constructor () {
		super();

		this.board = document.createElement('section');
		this.board.className = 'board';
		this.board.innerHTML =`
			<div class="row">
				<div class="cell" data-row="0" data-col="0"></div><div class="cell" data-row="0" data-col="1"></div><div class="cell" data-row="0" data-col="2"></div>
			</div>
			<div class="row">
				<div class="cell" data-row="1" data-col="0"></div><div class="cell" data-row="1" data-col="1"></div><div class="cell" data-row="1" data-col="2"></div>
			</div>
			<div class="row">
				<div class="cell" data-row="2" data-col="0"></div><div class="cell" data-row="2" data-col="1"></div><div class="cell" data-row="2" data-col="2"></div>
			</div>
		`;
		this.content.appendChild(this.board);

		this.msg = document.createElement('div');
		this.msg.id = 'message';
		this.content.appendChild(this.msg);
	}

	getCell(row, col) {
		return document.querySelectorAll(`[data-row="${row}"][data-col="${col}"]`)[0];
	}

	showMessage(message, ...args) {
		var msg;
		switch (message) {
			case 'winner':
				msg = 'Player ' + args[0] + ' wins';
				break;
			case 'tie':
				msg = 'It\'s a tie';
				break;
		}
		this.msg.innerHTML = msg;
	}

	setStone(element, turn) {
		turn === 0 ? element.innerHTML = 'x' : element.innerHTML = 'o';
	}
}