//x and y locations, xand y velocity, x and y acceleration, m is mass
function Ball(x, y, vx, vy, ax, ay, m) { 

	this.location = createVector(x, y);
	this.velocity = createVector(vx, vy);
	this.acceleration = createVector(ax, ay);
	this.mass = m;

	this.update = function () {
		this.velocity.add(this.acceleration);
		this.velocity.limit(10);
		this.location.add(this.velocity);
		this.acceleration.mult(0);
	}

	this.display = function () {
		fill('white');
		noStroke();
		ellipse(this.location.x, this.location.y, this.mass, this.mass);
	}

	this.checkEdges = function (paddles) {
		if(this.location.x < 0+m/2) {
			if (this.location.y > paddles[0].location.y && this.location.y < paddles[0].location.y+80) {
				console.log("hit 1");
			}

			this.velocity.x *= -1;
		}
		if(this.location.x > width-m/2) {

			
			this.velocity.x *= -1;
		}
		
		if(this.location.y > height-m/2 || this.location.y < 0+m/2) {
			this.velocity.y *= -1;
		}



		// for(var i = 0; i < paddles.length; i++) {
		// 	console.log(paddles[i]);
		// }
	}

	this.applyForces = function (force) {
		var f = p5.Vector.div(force, this.mass);
		this.acceleration.add(f);
	}

}