casper.test.begin("Froumi est affichée", function(test){
	casper.start('./index.html');
	casper.then( function(){
		test.assertExists("#froumi");
	});

	casper.then(function() {
		test.assertEvalEquals(function() {
			var froumiElement = document.getElementById('froumi');
			__utils__.echo(froumiElement.style.background);
			return froumiElement.style.backgroundImage;
		}, 'url(file:///Users/eric/Dropbox/code/ftv_fourmi/Images_Fourmis/fourmi21.gif)');
	});

	casper.run( function(){
		test.done();
	});
});

casper.test.begin("Froumi est affichée", function(test){
	casper.start('./index.html');

// evaluer position

	casper.test.begin("Froumi avance", function(test) {
		casper.thenEvaluate( function(){
			froumi.moveOneStep();
		});

		casper.then(function () {
			test.assertEvalEquals(function() {
				return froumi.getPosition();
			}, {left:1, top:0});
			test.assertEvalEquals(function() {
				return document.getElementById('froumi').style.left;
			}, '10px');
		});
	});

	casper.test.begin("Froumi rotationne", function(test) {
		casper.thenEvaluate(function() {
			froumi.rotateRight();
		});

		casper.thenEvaluate(function(){
			return froumi.getOrientation();
		}, 90);

		casper.thenEvaluate(function(){
			return document.getElementById('froumi').style.transform;
		}, 'rotate(90deg)');

		casper.thenEvaluate(function() {
			froumi.rotateLeft();
		});

		casper.thenEvaluate(function(){
			return froumi.getOrientation();
		}, 0);
	});

	

	casper.run( function(){
		test.done();
	});
});

