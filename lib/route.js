function route() {

	if (location.hash) {
		rt = location.hash.split('/');

		switch (rt[0]) {
			case '#game':
				controller = new CtrlGame(rt[1], rt[2]);
				break;
			case '#select':
				controller = new CtrlSelector();
				break;
			default:
				controller = new CtrlSelector();
		}

	} else {

		controller = new CtrlSelector();

	}

	// controller = new CtrlGame();
}