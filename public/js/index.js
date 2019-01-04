var socket=io();

	socket.on('connect',function (){
		console.log("Connected to server");

		socket.emit('createMessage',{
			from:'ritvik',
			text:"I am doing good"
		});
	});

	socket.on('disconnect', function (){
		console.log("Disconnected from server");
	});

	socket.on('newMessage', function (msg){
		console.log("New message", msg);
	});