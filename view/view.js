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
	constructor (stones) {
		super();

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
		element.innerHTML = this.stones[turn];

	}
}