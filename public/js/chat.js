
var socket=io();
function scrollToBottom(){
		var messages=jQuery('#messages');
        var newMessage=messages.children('li:last-child');

		var clientHeight=messages.prop('clientHeight');
		var scrollTop=messages.prop('scrollTop');
		var scrollHeight=messages.prop('scrollHeight');
		var newMessageHeight=newMessage.innerHeight();
		var lastMessageHeight=newMessage.prev().innerHeight();

		if(clientHeight+scrollTop+newMessageHeight+lastMessageHeight>=scrollHeight){
			messages.scrollTop(scrollHeight);
		}
	};

	socket.on('connect',function (){
		var params=jQuery.deparam(window.location.search);
		socket.emit('join', params, (err)=>{
            if(err){
                 alert(err);
                 window.location.href='/';
            }
		} );
	});

	socket.on('updateUserList', function(users){
        var ol=jQuery('<ol></ol>');
        users.forEach((user)=>{
        	ol.append(jQuery('<li></li>').text(user));
        });
        jQuery('#users').html(ol);
	});

	socket.on('disconnect', function (){
		console.log("Disconnected from server");
	});


	

	socket.on('newMessage', function (msg){
		var formattedTime=moment(msg.createdAt).format('h:mm a');
		var message=jQuery("#message-template").html();
		var html=Mustache.render(message, {
			text:msg.text,
			from:msg.from,
			createdAt:formattedTime
		});
		jQuery('#messages').append(html);
		scrollToBottom();
		
	});

	socket.on('newLocationMessage', function(msg){
		var formattedTime=moment(msg.createdAt).format('h:mm a');
		var message=jQuery("#location-message-template").html();
		var html=Mustache.render(message, {
			from:msg.from,
			createdAt:formattedTime,
			url:msg.url
		});
		jQuery('#messages').append(html);
		scrollToBottom();

		
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