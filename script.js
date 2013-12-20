
function Froumi() {
	return this.init.apply(this, arguments);
}

Froumi.prototype = {
	init: function(){
		this.position = {
			left: 0,
			top: 0
		};
		this.orientation = 0;
		this.imageIndex = 1;
		this._domElement = document.getElementById('froumi');
		this.updateDom();
	},

	getCurrentImageIndex: function() {
		return this.imageIndex;
	},

	moveOneStep: function() {
		this.move(1);
	},

	move: function( stepCount ) {
		if(stepCount < 0) {
			this.talk();
			return;
		} 
		this.position.left += stepCount*Math.round(Math.cos(this.orientation/360*Math.PI*2) * 100) / 100;
		this.position.top += stepCount*Math.round(Math.sin(this.orientation/360*Math.PI*2) *100)/100;
		this.imageIndex = ((this.imageIndex + stepCount) % 4);
		this.updateDom();
	},

	talk: function() {
		this._domElement.style.backgroundImage = 'url(Images_Fourmis/fourmi-error.gif)';
	},

	teleport: function(left, top) {
		this.position.left = left;
		this.position.top = top;
		this.updateDom();
	},

	getPosition: function() {
		return this.position;
	},

	updateDom: function() {
		this._domElement.style.left = Math.round(this.position.left * 10) + 'px';
		this._domElement.style.top = Math.round(this.position.top * 10) + 'px';
		this._domElement.style.webkitTransform = 'rotate(' + this.orientation + 'deg)';
		this._domElement.style.backgroundImage = 'url(Images_Fourmis/fourmi2' + this.imageIndex + '.gif)';
	},

	rotateRight: function() {
		this.orientation = (this.orientation + 90) % 360;
		this.updateDom();
	},

	rotateLeft: function() {
		this.orientation = (this.orientation - 90) % 360;
		this.updateDom();
	},

	getOrientation: function() {
		return this.orientation;
	},

	setOrientation: function(orientation) {
		this.orientation = orientation;
		this.updateDom();
	}
};

var toto = new Froumi();