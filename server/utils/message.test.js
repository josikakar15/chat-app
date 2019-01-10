var expect=require('expect');
var {generateMessage, generateLocationMessage}=require('./message');

describe('generateMessage',()=>{
	it('should generate correct message object',()=>{
      var from='Jen';
      var text='Some text';
      var message=generateMessage(from,text);

      expect(message.createdAt).toBe(number);
      expect(message).toInclude({from,text});
	});
});

describe('generateLocationMessage', ()=>{
	it('should generate correct location object', ()=>{
		var from='Jen';
		var lat=15;
		var lon=19;
		var url='https://www.google.com/maps?q=15,19';
		var message=generateLocationMessage(from,lat,lon);

		expect(message.createdAt).toBe(number);
		expect(message).toInclude({from,url});
	});
});