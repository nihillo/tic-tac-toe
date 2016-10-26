class View {
	constructor() {
		this.content = document.getElementById('content');
	}
}


class ViewSelector extends View {
	constructor() {
		super();

		this.selector = document.createElement('section');
		this.selector.className = 'selector';
		this.selector.innerHTML = `
			<form id ="selector-form">
				<div>
					<label for="mode">Select mode:</label>
					<input type="radio" name="mode" value="pvp" checked><span class="selector">PvP</span>
	  				<input type="radio" name="mode" value="pvai"><span class="selector">PvAI</span>
				</div>
				<div>
					<label for="stones">Select stones:</label>
					<span class="stones-mode">Player 1</span>
					<select name="stones">
						<option value="straight">x | o</option>
						<option value="reversed">o | x</option>
					</select>
					<span class="stones-mode">Player 2 / AI</span>
				</div>
				<input type="submit" value="PLAY!">
			</form>
		`;
		this.content.appendChild(this.selector);
		this.selectorForm = document.getElementById('selector-form');
	}
}

class ViewGame extends View {
	constructor (stones, mode) {
		super();
		this.mode = mode;  
		stones == 'straight' ? this.stones = ['x', 'o'] : this.stones = ['o', 'x'];

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

		this.turn = document.createElement('div');
		this.turn.id = 'message';
		this.content.appendChild(this.turn);

		this.msg = document.createElement('div');
		this.msg.id = 'message';
		this.content.appendChild(this.msg);
	}

	getCell(row, col) {
		return document.querySelectorAll(`[data-row="${row}"][data-col="${col}"]`)[0];
	}

	showMessage(message, ...args) {
		this.mode == 'pvp' ? this.pl2text = 'Player 2' : this.pl2text = 'AI';

		var msg, trn;
		switch (message) {
			case 'winner':
				this.content.removeChild(this.turn);
				
				var player = 'Player ' + args[0];
				if (player == 'Player 2') {
					player = this.pl2text;
				}
				
				msg = player + ' wins';
				this.msg.innerHTML = msg;
				break;
			case 'tie':
				this.content.removeChild(this.turn);
				msg = 'It\'s a tie';
				this.msg.innerHTML = msg;
				break;
			case 'turn':
				var player;
				if (args[0] === 0) {
					player = 'Player 1';
				} else {
					player = this.pl2text;
				}
				trn = `${player}'s turn`;
				this.turn.innerHTML = trn;
		}
	}

	setStone(element, turn) {
		element.innerHTML = this.stones[turn];
	}
}