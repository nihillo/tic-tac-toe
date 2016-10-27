class AI extends Player{
	constructor (id, stone, game) {
		super(id, stone);
		this.game = game;
	}

	move() {
		var cell = this.selectMovement().position;
		
		setTimeout(() => {
			controller.move(cell[0], cell[1]);
			// console.log('AI moving to' + cell);
		},
		1000);	
	}

	selectMovement(){
		var choice;

		// 1. Get free cells (copy array)
		var possibleCells = this.game.board.freeCells.slice();



		// 2. Check the condition hierarchy for every free cell, one condition
		//    per round. 

		// Condition hierarchy:
		var conditionSequence = [
			this.winGame,						// 1. Try to win the game
			this.avoidOpponentWin,				// 2. Try the opponent not to win the game
			this.avoidOpponentProbabilities,	// 3. Try the opponent not to increase winning probabilities
			this.increaseOwnProbabilities,		// 4. Increase own winning probabilities
			this.mostCombinations,				// 5. Choose the cell with most combinations
			this.randomChoice					// 6. If not decided yet, randomize choice
		];

		conditionSequence.forEach((condition) => {
			// console.log('foreach: ' + this);
			if (!choice) {
				var conditionEvaluation = this.evalCondition(condition, possibleCells);
				console.log(conditionEvaluation);
				// if a choice was taken during condition evaluation, overwrite it
				if (conditionEvaluation.choice) {
					choice = conditionEvaluation.choice;
				}
				// if possible cells were reduced, overwrite variable
				if (conditionEvaluation.possibleCells) {
					possibleCells = conditionEvaluation.possibleCells;
				}
			}
		});

		return choice;
	}

	evalCondition(condition, possibleCells) {
		// console.log('evalCondition: ' + this);
		var choice;
		var options = condition(this, possibleCells);	
		// console.log(options());

		if (condition == this.randomChoice){
			choice = this.randomChoice(this, options);
		} 

		else {
			if (options.length == 1) {
				// If one cell matches this condition, choose it. 
				choice = options[0];

			} else if (options.length > 1) {
				// 	If more than one cell match this condition... 
				
				switch (condition){
					case this.wingame:
					case this.avoidOpponentWin:
					case this.mostCombinations:
						//...randomize choice, for defining conditions
						choice = this.randomChoice(this, options); 
						break;
					default:
						//...remove possibilities not matching the condition, for accumulative conditions
						possibleCells = options; 
				}
				
			}
		}

		return {choice: choice, possibleCells: possibleCells};
	}



	// CONDITIONS SET
	
	// 1. Win the game
	winGame(self, possibleCells) {
		//	Build array of winning cells, from possibleCells
		
		var winningCells = [];

		possibleCells.forEach((cell) => {
			// If AI moves to this cell, it wins the game
			// There is at least one tracker containing the cell which sum equals -2
			var isWinningCell = cell.trackers.some((value) => {
				
				return self.game.trackers[value].sum == -2;
			});

			if (isWinningCell) {
				winningCells.push(cell);
			}
		});

		return winningCells;
	}

	// 2. Avoid opponent winning the game
	avoidOpponentWin(self, possibleCells){
		//	Build array of opponent's winning cells, from possibleCells

		var opWinningCells = [];

		possibleCells.forEach((cell) => {
			// If opponent moves to this cell, they win the game
			// There is at least one tracker containing the cell which sum equals 2
			var isOpWinningCell = cell.trackers.some((value) => {
				return self.game.trackers[value].sum == 2;
			});

			if (isOpWinningCell) {
				opWinningCells.push(cell);
			}
		});

		return opWinningCells;
	}

	// 3. Avoid opponent to increase probabilities of winning the game
	avoidOpponentProbabilities(self, possibleCells){
		//	Build array of opponent's increasing posibilities cells, from possibleCells

		var opIncreasingCells = [];

		possibleCells.forEach((cell) => {
			// If opponent moves to this cell, they set a row in which with only one
			// more movement win the game
			// There is at least one tracker containing the cell which sum equals 1
			var isOpIncreasingCell = cell.trackers.some((value) => {
				return self.game.trackers[value].sum == 1;
			});

			if (isOpIncreasingCell) {
				opIncreasingCells.push(cell);
			}
		});

		return opIncreasingCells;
	}

	// 4. Increase AI's probabilities of winning the game
	increaseOwnProbabilities(self, possibleCells){
		//	Build array of opponent's increasing posibilities cells, from possibleCells

		var increasingCells = [];

		possibleCells.forEach((cell) => {
			// If AI moves to this cell, it sets a row in which with only one
			// more movement wins the game
			// There is at least one tracker containing the cell which sum equals -1
			var isIncreasingCell = cell.trackers.some((value) => {
				return self.game.trackers[value].sum == -1;
			});

			if (isIncreasingCell) {
				increasingCells.push(cell);
			}
		});

		return increasingCells;
	}

	// 	5. Choose the cell with more combinations
	mostCombinations(self, possibleCells) {
		// Build array of cells with more combinations (trackers)

		var most = [];

		possibleCells.forEach((cell) => {
			if (most.length === 0) {
				most.push(cell);
			} else {
				var currentCombs = most[0].trackers.length;

				if (cell.trackers.length == currentCombs) {
					most.push(cell);
				} else if (cell.trackers.length > currentCombs) {
					most = [];
					most.push(cell);
				}
			}
		});

		return most;
	}


	//	6. If still didn't decide, randomize choice 
	randomChoice(self, possibleCells) {
		return possibleCells[randInt(0, possibleCells.length - 1)];
	}

}