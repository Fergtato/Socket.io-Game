//x and y locations, xand y velocity, x and y acceleration, m is mass
function Paddle(x, y) { 

	this.location = createVector(x, y);

	this.update = function (playerX, playerY) {
		this.location.x = playerX;
		this.location.y = playerY;
	}

	this.display = function () {
		fill('white');
		noStroke();
		rect(this.location.x, this.location.y, 10, 80);
	}

}