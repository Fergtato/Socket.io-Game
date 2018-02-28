var x = 20;
var y  = 20;
//store the x, y pos of all players
var players = {};

var socket = io.connect();

//update the position of all players
socket.on('allPlayers', function(newPlayers){
    players = newPlayers;
});

//update the position of just one player
socket.on('playerUpdate', function(id,pos){
    players[id] = pos;
});

function setup() {
	createCanvas(400,400);

	//x, y, vx, vy, ax, ay, m
	// ball = new Ball(200, 200, 0, 0, 0, 0, 20);

	// for(player in players) {
	// 	var i = Object.keys(players).indexOf(player);
	// 	balls[i] = new Ball(players[player].x, players[player].y, 0, 0, 0, 0, 20);
		
	// 	// console.log(paddles);
	// }

	console.log(socket.id);

	// console.log(players);
}

function draw() {
	background(0);

	strokeWeight(2);
	line(0, 0, 300, 300);

	for(player in players) {
		var ball = new Ball(players[player].x, players[player].y, 0, 0, 0, 0, 20);
		// var i = Object.keys(players).indexOf(player);

		// var c = 2;
		// var normal = 1;
		// var frictionMag = c * normal;
		// var friction = p5.Vector.mult(ball.velocity, -1);
		// friction.normalize();
		// friction.mult(frictionMag);
		// ball.applyForce(friction);

		ball.checkEdges();
		ball.update();
		ball.display();

		x = ball.location.x;
		y = ball.location.y;

		socket.emit('moved', {x : x, y: y});

	}

}

function mousePressed() {
	// for(player in players) {
 // 		balls[0].goToMouse();
 // 	}
}

function keyPressed() {
	if (keyCode === UP_ARROW) {

		if (y - dy > 0) {
        	y -= dy;
            socket.emit('moved', {x : x, y: y});
        }

    	// console.log("up");
  	} else if (keyCode === DOWN_ARROW) {

  		if (y + dy < height) {
            y += dy;
            socket.emit('moved', {x : x, y: y});
        }

    	// console.log("down");
  	}
}