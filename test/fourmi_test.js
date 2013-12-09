casper.test.begin("Froumi est affichée", function(test){
	casper.start('./index.html');
	casper.then( function(){
		test.assertExists("#froumi", "un élément du DOM identifie la froumi");
	});

	casper.then(function() {
		test.assertEval(function() {
			var froumiElement = document.getElementById('froumi');
			var backgroundPath = froumiElement.style.backgroundImage;
			return backgroundPath.indexOf('fourmi22.gif') >= 0;
		}, "Image est bien fourmi22.gif");
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
			}, {left:1, top:0}, "position 1 pas à droite");
			
			test.assertEvalEquals(function() {
				return document.getElementById('froumi').style.left;
			}, '10px', "élément DOM 10 pixels à droite");
		});

		casper.run( function(){
			test.done();
		});
	});

	casper.test.begin("Froumi rotationne droite", function(test) {
		casper.thenEvaluate(function() {
			froumi.rotateRight();			
		});

		casper.then( function(){
			assertOrientation( test, 90, "La froumi est orientée à 90°" );
		});

		casper.then(function(){
			test.assertEvalEquals(function(){
				return document.getElementById('froumi').style.webkitTransform;
			}, 'rotate(90deg)', "La froumi est orientée à 90°");
			
		});

		casper.run( function(){
			test.done();
		});
	});

	casper.test.begin("Froumi rotationne gauche", function(test) {
		casper.thenEvaluate(function() {
			froumi.rotateLeft();
		}
		).then(function() {
			assertOrientation( test, 0, "La froumi est retournée à gauche");
		}).then(function(){
			test.assertEvalEquals(function(){
				return document.getElementById('froumi').style.webkitTransform;
			}, 'rotate(0deg)', "La froumi est orientée à 0°");
			
		});


		casper.run( function(){
			test.done();
		});
	});

	casper.test.begin("Froumi rotationne droite et avance", function(test) {
		casper.thenEvaluate(function() {
			froumi.rotateRight();
			froumi.moveOneStep();
		}).then(function() {
			test.assertEvalEquals(function() {
				return froumi.getPosition();
			}, {left:1, top:1});
			test.assertEvalEquals(function() {
				return document.getElementById('froumi').style.webkitTransform;
			}, 'rotate(90deg)', "La froumi est retournée 90° à droite");
			test.assertEvalEquals(function() {
				return document.getElementById('froumi').style.left;
			}, '10px', "La froumi a avancé de 10px à droite");
			test.assertEvalEquals(function() {
				return document.getElementById('froumi').style.top;
			}, '10px', "La froumi a avancé de 10px à vers le bas");
		});

		casper.run( function(){
			test.done();
		});
	});

	casper.test.begin("Froumi s'oriente par rapport à la verticale", function(test) {
		casper.thenEvaluate(function() {
			froumi.setOrientation(180);
		}).then(function() {
			test.assertEvalEquals(function() {
				return document.getElementById('froumi').style.webkitTransform;
			}, 'rotate(180deg)', "La froumi est orientée à 180°");
		});

		casper.run( function(){
			test.done();
		});
	});

	casper.test.begin("Froumi se déplace dans le bon sens après un changement d'orientation", function(test) {
		casper.thenEvaluate(function() {
			froumi.setOrientation(60);
			froumi.moveOneStep();
		}).then(function() {
			test.assertEvalEquals(function() {
				return document.getElementById('froumi').style.left;
			}, '15px', "la position left est correcte");
			test.assertEvalEquals(function() {
				return document.getElementById('froumi').style.top;
			}, '19px', "la position top est correcte");
		});

		casper.run( function(){
			test.done();
		});
	});

	casper.run( function(){
		test.done();
	});
});

function assertOrientation( test, expectedAngle, msg ) {
	test.assertEvalEquals(function(){
		return froumi.getOrientation();
	}, expectedAngle, msg);
}

function assertFroumiTransform( test,expected, msg ) {
	test.assertEvalEquals(function(){
		return document.getElementById('froumi').style.webkitTransform;
	}, expected, msg);
}
