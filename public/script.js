var x = 20;
var y  = 20;
var dx = 5;
var dy = 5;
var score = 0;
//store the x, y pos of all players
var players = {};

var food = {x: 100, y: 100};

var socket = io.connect();

//update the position of all players
socket.on('allPlayers', function(newPlayers){
    players = newPlayers;
});

//update the position of just one player
socket.on('playerUpdate', function(id,pos){
    players[id] = pos;
});

socket.on('updateFood', function(newfood){
    food = newfood;
    console.log("updated");
});

function setup() {
	createCanvas(400,400);



	console.log(socket.id);
}

function draw() {
	background(0);

	strokeWeight(2);
	line(0, 0, 300, 300);

	fill("yellow");
	rectMode(CENTER);
	rect(food.x,food.y,10,10);

	for(player in players) {
		if (player === socket.id) {
			fill(255,0,0);
		} else {
			fill(255);
		}
		
		ellipse(players[player].x, players[player].y, 20, 20)

	}

	if (x > food.x-10 && x < food.x+10 && y > food.y-10 && y < food.y+10) { 
		socket.emit('newFoodPos', {x : random(10,390), y: random(10,390)});
		score++;
		console.log(score);
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
  	} else if (keyCode === LEFT_ARROW) {

  		if (x - dx > 0) {
            x -= dx;
            socket.emit('moved', {x : x, y: y});
        }

    	// console.log("down");
  	} else if (keyCode === RIGHT_ARROW) {

  		if (x + dx < width) {
            x += dx;
            socket.emit('moved', {x : x, y: y});
        }

    	// console.log("down");
  	}
}