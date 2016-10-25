class AI extends Player{
	constructor (id, stone, app) {
		super(id, stone);
		this.app = app;
	}

	move() {
		var cell = selectMovement();
		
		setTimeout(function(){
			this.app.move(...cell);
		},
		1000);	
	}

	selectMovement(){

	}
}