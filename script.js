	var froumi = {
		position: {
			left: 0,
			top: 0
		},
		orientation: 0,
		_domElement: document.getElementById('froumi'),
		moveOneStep: function() {
			this.position.left++;
			this.updateDom();
		},

		getPosition: function() {
			return this.position;
		},

		updateDom: function() {
			this._domElement.style.left = (this.position.left * 10) + 'px';
			this._domElement.style.top = (this.position.top * 10) + 'px';
			this._domElement.style.transform = 'rotate(' + this.orientation + 'deg)';
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
		}
	};

