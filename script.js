	var froumi = {
		position: {
			left: 0,
			top: 0
		},
		orientation: 0,
		_domElement: document.getElementById('froumi'),
		moveOneStep: function() {
			this.position.left+=Math.cos(this.orientation/360*Math.PI*2);
			this.position.top+=Math.sin(this.orientation/360*Math.PI*2);
			this.updateDom();
		},

		getPosition: function() {
			return this.position;
		},

		updateDom: function() {
			this._domElement.style.left = Math.round(this.position.left * 10) + 'px';
			this._domElement.style.top = Math.round(this.position.top * 10) + 'px';
			this._domElement.style.webkitTransform = 'rotate(' + this.orientation + 'deg)';
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

