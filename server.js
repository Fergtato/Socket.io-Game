var express = require('express');  
var app = express();  
var server = require('http').createServer(app);
var io = require('socket.io')(server);

//store the coordinates of all the clients (players)
var players = {};

var food = {x: 100, y: 100};

app.use(express.static(__dirname + '/public'));
//redirect / to our index.html file
app.get('/', function(req, res,next) {  
    res.sendFile(__dirname + '/public/index.html');
});  

//when a client connects, do this
io.on('connection', function(client) {  
	//when a new client connects place them at 0,0
	players[client.id] = {x: 20, y: 20, score: 0, col: 'rgb(255,255,255)'};
	
	//send a message to all other clients updating them on this new player
	io.emit('allPlayers', players);
	io.emit('updateFood', food);
	
	//if any client moves, store their new x,y and notify all clients
	client.on('moved',function(player){
		players[client.id] = {x: player.x, y: player.y, score: player.score, col: player.col};
		
		io.emit('playerUpdate', client.id, players[client.id]);
	});

	client.on('newFoodPos',function(pos){
		food = {x: pos.x, y: pos.y};
		
		io.emit('updateFood', food);
	});
	
	//if any client disconnects remove them and notify all clients
	client.on('disconnect', function(){
		delete players[client.id];
		io.emit('allPlayers', players);
	});
});
	
//start our web server and socket.io server listening
server.listen(3000, function(){
 	console.log('listening on *:3000');
});

