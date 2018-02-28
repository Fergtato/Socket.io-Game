//x and y locations, xand y velocity, x and y acceleration, m is mass
function Ball(x, y, vx, vy, ax, ay, m) { 

	this.location = createVector(x, y);
	this.velocity = createVector(vx, vy);
	this.acceleration = createVector(ax, ay);
	this.mass = m;
	this.fill = "white";

	this.update = function () {
		this.velocity.add(this.acceleration);
		this.velocity.limit(10);
		this.location.add(this.velocity);
		this.acceleration.mult(0);

		
	}

	this.goToMouse = function() {
		var mouse = createVector(mouseX, mouseY);

		this.acceleration = p5.Vector.sub(mouse, this.location);
		this.acceleration.normalize();
		this.acceleration.mult(5);
	}

	this.display = function () {
		fill(this.fill);
		noStroke();
		ellipse(this.location.x, this.location.y, this.mass, this.mass);
	}

	this.checkEdges = function () {
		if(this.location.x > width-m/2 || this.location.x < 0+m/2) {
			this.velocity.x *= -1;
		}
		if(this.location.y > height-m/2 || this.location.y < 0+m/2) {
			this.velocity.y *= -1;
		}
	}

	this.applyForce = function (force) {
		var f = p5.Vector.div(force, this.mass);
		this.acceleration.add(f);
	}

}