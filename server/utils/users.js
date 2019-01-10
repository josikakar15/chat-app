class Users {
	constructor(){
		this.users=[];
	}

 	addUser(id, name, room){
		var user={id, name, room};
		this.users.push(user);
		return user;
	}
	removeUser(id){
		var user=this.users.filter((user)=>(user.id===id))[0];
		if(user){
			this.users=this.users.filter((user)=>(user.id!==id));
		}
		return user;


	}
	getUser(id){
         var username=this.users.filter((user)=>(user.id===id))[0];
          
         return username;
	}
	getUserList(room){
		var userList=this.users.filter((user)=>(user.room===room));
		var usernames=userList.map((user)=>(user.name));
		return usernames;
	}
}

module.exports={Users};