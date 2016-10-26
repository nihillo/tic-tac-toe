class AI extends Player{
	constructor (id, stone, game) {
		super(id, stone);
		this.game = game;
	}

	move() {
		var cell = this.selectMovement().position;
		
		setTimeout(() => {
			controller.move(cell[0], cell[1]);
			console.log('AI moving to' + cell);
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
		
		// 	1. Win the game
		if (!choice) { // for every condition, check if a choice has been done
			var winningCells = this.winGame(possibleCells);	

			if (winningCells.length == 1) {
				// If one cell matches this condition, choose it. 
				choice = winningCells[0];

			} else if (winningCells.length > 1) {
				// 	If more than one cell match this condition, randomize choice.
				choice = this.randomChoice(winningCells);
			}
		} // If no cell matches this condition, continue to next
		
		
		// 	2. Avoid opponent winning the game
		if (!choice) { // for every condition, check if a choice has been done
			var opWinningCells = this.avoidOpponentWin(possibleCells);	

			if (opWinningCells.length == 1) {
				// If one cell matches this condition, choose it. 
				choice = opWinningCells[0];

			} else if (opWinningCells.length > 1) {
				// 	If more than one cell match this condition, randomize choice.
				choice = this.randomChoice(opWinningCells);
			}
		} // If no cell matches this condition, continue to next



		// 	3. Avoid oppenent to increase probabilities of winning the game
		if (!choice) {
			var opIncreasingCells = this.avoidOpponentProbabilities(possibleCells);

			if (opIncreasingCells.length == 1){
				//	If one cell matches this condition, choose it
				choice = opIncreasingCells[0];
			} else if (opIncreasingCells.length > 1){
				//	If more than one cell match this condition, remove cells which
				//	don't match from possibleCells and continue to next
				possibleCells = opIncreasingCells;
			}
		}	//	If no cell matches this condition, continue to next
		
		
		
		// 	4. Increase own probabilities of winning the game
		if (!choice) {
			var increasingCells = this.avoidOpponentProbabilities(possibleCells);

			if (increasingCells.length == 1){
				//	If one cell matches this condition, choose it
				choice = increasingCells[0];
			} else if (increasingCells.length > 1){
				//	If more than one cell match this condition, remove cells which
				//	don't match from possibleCells and continue to next
				possibleCells = increasingCells;
			}
		}	//	If no cell matches this condition, continue to next
	


		// 	5. Choose the cell with most combinations
		if (!choice) {
			var most = this.mostCombinations(possibleCells);

			if (most.length == 1) {
				choice = most[0];
			} else if (most.length > 1) {
				choice = this.randomChoice(possibleCells);
			}
		}



 		//	6. If still didn't decide, randomize choice
 		if (!choice) {
			choice = this.randomChoice(possibleCells);
		}

		return choice;
	}

	// CONDITIONS SET
	
	// 1. Win the game
	winGame(possibleCells) {
		//	Build array of winning cells, from possibleCells

		var winningCells = [];

		possibleCells.forEach((cell) => {
			// If AI moves to this cell, it wins the game
			// There is at least one tracker containing the cell which sum equals -2
			var isWinningCell = cell.trackers.some((value) => {
				return this.game.trackers[value].sum == -2;
			});

			if (isWinningCell) {
				winningCells.push(cell);
			}
		});

		return winningCells;
	}

	// 2. Avoid opponent winning the game
	avoidOpponentWin(possibleCells){
		//	Build array of opponent's winning cells, from possibleCells

		var opWinningCells = [];

		possibleCells.forEach((cell) => {
			// If opponent moves to this cell, they win the game
			// There is at least one tracker containing the cell which sum equals 2
			var isOpWinningCell = cell.trackers.some((value) => {
				return this.game.trackers[value].sum == 2;
			});

			if (isOpWinningCell) {
				opWinningCells.push(cell);
			}
		});

		return opWinningCells;
	}

	// 3. Avoid opponent to increase probabilities of winning the game
	avoidOpponentProbabilities(possibleCells){
		//	Build array of opponent's increasing posibilities cells, from possibleCells

		var opIncreasingCells = [];

		possibleCells.forEach((cell) => {
			// If opponent moves to this cell, they set a row in which with only one
			// more movement win the game
			// There is at least one tracker containing the cell which sum equals 1
			var isOpIncreasingCell = cell.trackers.some((value) => {
				return this.game.trackers[value].sum == 1;
			});

			if (isOpIncreasingCell) {
				opIncreasingCells.push(cell);
			}
		});

		return opIncreasingCells;
	}

	// 4. Increase AI's probabilities of winning the game
	increaseOwnProbabilities(cell){
		//	Build array of opponent's increasing posibilities cells, from possibleCells

		var increasingCells = [];

		possibleCells.forEach((cell) => {
			// If AI moves to this cell, it sets a row in which with only one
			// more movement wins the game
			// There is at least one tracker containing the cell which sum equals -1
			var isIncreasingCell = cell.trackers.some((value) => {
				return this.game.trackers[value].sum == -1;
			});

			if (isIncreasingCell) {
				increasingCells.push(cell);
			}
		});

		return increasingCells;
	}

	// 	5. Choose the cell with more combinations
	mostCombinations(possibleCells) {
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
	randomChoice(possibleCells) {
		return possibleCells[randInt(0, possibleCells.length - 1)];
	}

}