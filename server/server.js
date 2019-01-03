const path=require('path');
const http=require('http');
const express=require('express');
const socketIO=require('socket.io');

const port=process.env.PORT||3000;
PublicPath=path.join(__dirname,'../public');
var app=express();
var server=http.createServer(app);
var io=socketIO(server);

app.use(express.static(PublicPath));
io.on('connection',(socket)=>{
	console.log("New user connected");

	socket.emit('newMessage',{
		from:'josikakar',
		text:'How you doin?'
	});

	socket.on('createMessage', function (msg){
		console.log('create Message',msg);
	})

	socket.on('disconnect',()=>{
		console.log("User was disconnected");
	});

});
server.listen(port,()=>{
	console.log(`Server is up and running on ${port}`);
})