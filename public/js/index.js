
var socket=io();

	socket.on('connect',function (){
		console.log("Connected to server");

		/*socket.emit('createMessage',{
			from:'ritvik',
			text:"I am doing good"
		});*/
	});

	socket.on('disconnect', function (){
		console.log("Disconnected from server");
	});

	socket.on('newMessage', function (msg){
		var li=jQuery("<li></li>");
		var formattedTime=moment(msg.createdAt).format('h:mm a');
		li.text(`${msg.from} ${formattedTime} :${msg.text}`);
		jQuery("#messages").append(li);
	});

	socket.on('newLocationMessage', function(msg){
		var li=jQuery("<li></li>");
		var a=jQuery("<a target=_blank>Get my location</a>");
		var formattedTime=moment(msg.createdAt).format('h:mm a');
		li.text(`${msg.from} ${formattedTime} :`);
		a.attr('href',msg.url);
		li.append(a);
		jQuery('#messages').append(li);
	});

	

	jQuery("#message-form").on('submit' , function(e){
		e.preventDefault();
		var textBox=jQuery('[name=message');
		socket.emit('createMessage',{
			from:'User',
			text:textBox.val()
		},function(){
             textBox.val('');
		});
	});
 var locButton=jQuery("#send-location");
 locButton.on('click', function(){
 	if(!navigator.geolocation){
 	return alert('Geolocation is not supported by your browser');	
 	}
    locButton.attr('disabled','disabled').text('Sending location...');

 	navigator.geolocation.getCurrentPosition(function(position){
 		locButton.removeAttr('disabled').text('Send location');
        socket.emit('createLocationMessage',{
        	latitude:position.coords.latitude,
        	longitude:position.coords.longitude
        });
 	}, function(){
 		locButton.removeAttr('disabled').text('Send location');
  		return alert('Cannot fetch location.');
 	});
 });