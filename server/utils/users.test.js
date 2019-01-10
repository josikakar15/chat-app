const expect=require('expect');
const {Users}=require('./users.js');


var users;
beforeEach(()=>{
	users=new Users();
	users.users=[{
		id:'1',
		name:'Mike',
		room:'A'
	},{
		id:'2',
		name:'Jen',
		room:'B'
	}, {
		id:'3',
		name:'Julie',
		room:'A'
	}];
});

describe('Users', ()=>{
	it('should add new user', ()=>{
		var users=new Users();
		var user={
			id:'123',
			name:'Josika',
			room:'aA'
		};
		users.addUser(user.id,user.name,user.room);
		expect(users.users).toEqual([user]);
	});

	it('should remove a user', ()=>{
       var res=users.removeUser('1');
       expect(res.id).toBe('1');
       expect(users.users.length).toBe(2);
	});

	it('should not remove a user', ()=>{
		var res=users.removeUser('99');
		//expect(res).toNotExist();
		expect(users.users.length).toBe(3);
	});

	it('should find a user', ()=>{
        var res=users.getUser('1');
        expect(res.id).toBe('1');
	});

	it('should not find a user', ()=>{
		var res=users.getUser('99');
        expect(res).toNotExist();		
	});

	it('should give names of users in room B', ()=>{
		
		var res=users.getUserList('B');
		expect(res).toEqual(['Jen']);
	});

});