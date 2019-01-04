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
		from:'Admin',
		text:'Welcome to the chat app',
		createdAt: new Date().getTime()
	});

	socket.broadcast.emit('newMessage',{
		from:'Admin',
		text:'New user joined',
		createdAt: new Date().getTime()
	});

	socket.on('createMessage', function (msg){
		console.log('create Message',msg);
		io.emit('newMessage',{
			from:msg.from,
			text:msg.text,
			createdAt:new Date().getTime()
		});

        /* socket.broadcast.emit('newMessage',{
         	from:msg.from,
         	text:msg.text,
         	createdAt:new Date().getTime()
         });*/
         	})

	socket.on('disconnect',()=>{
		console.log("User was disconnected");
	});

});
server.listen(port,()=>{
	console.log(`Server is up and running on ${port}`);
})