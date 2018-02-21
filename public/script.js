var ball;
var paddles= {};
var x = 0;
var y = 0;
var dy = 20;

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
	createCanvas(1000,400);

	ball = new Ball(200, 200, 7, 5, 0, 0, 20);

	for(player in players) {
		var i = Object.keys(players).indexOf(player);
		paddles[i] = new Paddle(players[player].x, players[player].y);
		
		// console.log(paddles);
	}

	console.log(socket.id);

	// console.log(players);
}

function draw() {
	background(0);

	strokeWeight(2);
	line(0, 0, 300, 300);

	ball.checkEdges(paddles);
	ball.update();
	ball.display();


	for(player in players) {
		var i = Object.keys(players).indexOf(player);

		paddles[i].update(players[player].x, players[player].y);
		paddles[i].display();
	}

	

}

function keyPressed() {
	if (keyCode === UP_ARROW) {

		if (y - dy > 0){
        	y -= dy;
            socket.emit('moved', {x : x, y: y});
        }

    	// console.log("up");
  	} else if (keyCode === DOWN_ARROW) {

  		if (y + dy < height){
            y += dy;
            socket.emit('moved', {x : x, y: y});
        }

    	// console.log("down");
  	}
}