var x = 20;
var y  = 20;
var dx = 8;
var dy = 8;
var score = 0;
var col = 'rgb(255,255,255)';
//store the x, y pos of all players
var players = {};

var food = {x: 100, y: 100};

var socket = io.connect();

//update the position of all players
socket.on('allPlayers', function(newPlayers){
    players = newPlayers;
});

//update the position of just one player
socket.on('playerUpdate', function(id,player){
    players[id] = player;
});

socket.on('updateFood', function(newfood){
    food = newfood;
});

function setup() {
	createCanvas(1000,600);

	//set random colour for player
	col = 'rgb(' + floor(random(0,255)) + ',' + floor(random(0,255)) + ',' + floor(random(0,255)) + ')';
	socket.emit('moved', {x : x, y: y, score: score, col: col});

}

function draw() {
	background('rgba(240,240,240,0.5)');

	strokeWeight(2);

	//display the golden nugget on the canvas
	fill("yellow");
	rectMode(CENTER);
	rect(food.x,food.y,10,10);

	//display players on the canvas
	for(player in players) {
		if (player === socket.id) {
			fill(255,0,0);
		} else {
			fill(255);
		}
		fill(players[player].col);
		ellipse(players[player].x, players[player].y, 20, 20)

	}

	//display player scores
	fill('#222');
	textAlign(CENTER);
	text("Scores", width-50,25);
	var i = 1;
	for(player in players) {
		fill(players[player].col);
		textSize(20);
		text(players[player].score, width-50,25+i*25);
		i++;
	}
	
	//check for collision of player with nugget
	if (x > food.x-10 && x < food.x+10 && y > food.y-10 && y < food.y+10) { 
		//create new nugget and new position
		socket.emit('newFoodPos', {x : random(10,width-10), y: random(10,height-10)});
		score++;
		socket.emit('moved', {x : x, y: y, score: score, col: col});
	}

	//Keyboard inputs and controls
	if (keyIsDown(LEFT_ARROW)) {
		x -= dx;
        socket.emit('moved', {x : x, y: y, score: score, col: col});
	}
	if (keyIsDown(RIGHT_ARROW)) {
		x += dx;
        socket.emit('moved', {x : x, y: y, score: score, col: col});
	}
	if (keyIsDown(UP_ARROW)) {
		y -= dy;
        socket.emit('moved', {x : x, y: y, score: score, col: col});
	}
	if (keyIsDown(DOWN_ARROW)) {
		y += dy;
        socket.emit('moved', {x : x, y: y, score: score, col: col});
	}

	//Check edges of player, create "infinity walls"
	if (x < 0) {
        x = width;
    }
    if (x > width) {
    	x = 0;
    }
    if (y < 0) {
    	y = height;
    }
    if (y > height) {
    	y = 0;
    }

}