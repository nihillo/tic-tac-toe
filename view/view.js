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
					<label class="label-primary" for="mode">Select mode:</label><br />
					<input type="radio" name="mode" id="mode-pvp" value="pvp" checked><label for="mode-pvp" class="selector-option-text">PvP</label>
	  				<input type="radio" name="mode" id="mode-pvai" value="pvai"><label for="mode-pvai" class="selector-option-text">PvAI</label>
				</div>
				<div>
					<label class="label-primary" for="stones">Select stones:</label><br />
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

		this.mode == 'pvp' ? this.pl1text = 'Player 1' : this.pl1text = 'Player';
		this.mode == 'pvp' ? this.pl2text = 'Player 2' : this.pl2text = 'AI';

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

		var player, msg, trn;

		switch (message) {
			case 'winner':
				this.content.removeChild(this.turn);
				args[0] == 1 ? player = this.pl1text : player = this.pl2text;
				msg = player + ' wins';
				this.msg.innerHTML = msg;
				break;
			case 'tie':
				this.content.removeChild(this.turn);
				msg = 'It\'s a tie';
				this.msg.innerHTML = msg;
				break;
			case 'turn':
				args[0] == 0 ? player = this.pl1text : player = this.pl2text;
				trn = `${player}'s turn`;
				this.turn.innerHTML = trn;
				break;
		}
	}

	setStone(element, turn) {
		element.innerHTML = this.stones[turn];
	}
}