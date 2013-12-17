casper.test.begin("Froumi est affichée", function(test){
	casper.start('./index.html');

	casper.thenEvaluate( function(){
		froumi = new Froumi();
	});

	casper.then( function(){
		test.assertExists("#froumi", "un élément du DOM identifie la froumi");
	});
	
	
	casper.then(function() {
		test.assertEval(function() {
			var froumiElement = document.getElementById('froumi');
			var backgroundPath = froumiElement.style.backgroundImage;
			return backgroundPath.indexOf('fourmi21.gif') >= 0;
		}, "Image est bien fourmi21.gif");
	});

	casper.run( function(){
		test.done();
	});
});

casper.test.begin("Froumi est affichée", function(test){
	casper.start('./index.html');

	casper.thenEvaluate( function(){
		froumi = new Froumi();
	});
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
			froumi = new Froumi();
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
			froumi = new Froumi();
			froumi.rotateLeft();
		}
		).then(function() {
			assertOrientation( test, -90, "La froumi est orientée à gauche (vertical)");
		}).then(function(){
			test.assertEvalEquals(function(){
				return document.getElementById('froumi').style.webkitTransform;
			}, 'rotate(-90deg)', "La froumi est orientée à -90°");
			
		});


		casper.run( function(){
			test.done();
		});
	});

	casper.test.begin("Froumi rotationne droite et avance", function(test) {
		casper.thenEvaluate(function() {
			froumi = new Froumi();
			froumi.rotateRight();
			froumi.moveOneStep();
		}).then(function() {
			test.assertEvalEquals(function() {
				return froumi.getPosition();
			}, {left:0, top:1});
			test.assertEvalEquals(function() {
				return document.getElementById('froumi').style.webkitTransform;
			}, 'rotate(90deg)', "La froumi est retournée 90° à droite");
			test.assertEvalEquals(function() {
				return document.getElementById('froumi').style.left;
			}, '0px', "La froumi a avancé de 0px à droite");
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
			froumi = new Froumi();
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
			froumi = new Froumi();
			froumi.setOrientation(60);
			froumi.moveOneStep();
		}).then(function() {
			test.assertEvalEquals(function() {
				return document.getElementById('froumi').style.left;
			}, '5px', "la position left est correcte");
			test.assertEvalEquals(function() {
				return document.getElementById('froumi').style.top;
			}, '9px', "la position top est correcte");
		});

		casper.run( function(){
			test.done();
		});
	});

	
	casper.test.begin("Froumi se déplace de 5 pas", function(test) {
		casper.thenEvaluate(function() {
			froumi = new Froumi();
			froumi.move(5);
		}).then(function() {
			test.assertEvalEquals(function() {
				return document.getElementById('froumi').style.left;
			}, '50px', "la position left est correcte");
			test.assertEvalEquals(function() {
				return document.getElementById('froumi').style.top;
			}, '0px', "la position top est correcte");
		});
		

		casper.run( function(){
			test.done();
		});
	});

	casper.test.begin("Froumi se déplace de N pas", function(test) {
		casper.thenEvaluate(function() {
			froumi = new Froumi();
			froumi.move(7);
		}).then(function() {
			test.assertEvalEquals(function() {
				return document.getElementById('froumi').style.left;
			}, '70px', "la position left est correcte");
			test.assertEvalEquals(function() {
				return document.getElementById('froumi').style.top;
			}, '0px', "la position top est correcte");
		});
		

		casper.run( function(){
			test.done();
		});
	});

	casper.test.begin("Froumi change d'index d'image après un pas", function(test) {
		casper.thenEvaluate(function() {
			froumi = new Froumi();
			froumi.moveOneStep();
		}).then(function() {
			test.assertEvalEquals(function() {
				return froumi.getCurrentImageIndex();
			}, 2, "l'image courante est correcte");
		});
		

		casper.run( function(){
			test.done();
		});
	});

	casper.test.begin("Froumi change d'image après un pas", function(test) {
		casper.thenEvaluate(function() {
			froumi = new Froumi();
			froumi.moveOneStep();
		}).then(function() {
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

	casper.test.begin("Froumi change d'image après N pas", function(test) {
		casper.thenEvaluate(function() {
			froumi = new Froumi();
			froumi.move(5);
		}).then(function() {
			test.assertEvalEquals(function() {
				return froumi.getCurrentImageIndex();
			}, 2, "l'image courante est correcte");

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
