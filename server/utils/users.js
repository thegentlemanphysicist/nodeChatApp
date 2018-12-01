[{
  id:'',
  name:"",
  room:""
}]

//adduser
//remmove user
//get user
//get user list

// class Person {
//   constructor (name, age) {
//     this.name = name;
//     this.age = age;
//   }
//   getUserDescription() {
//     return `${this.name} is ${this.age} year(s) old.`
//   }
// }

// var me = new Person('Jon',34);
// var description = me.getUserDescription();
// console.log(description);
class Users {
  constructor () {
    this.users = [];
  }
  addUser (id, name, room) {
    var user = {id, name, room};
    this.users.push(user);
    return user;
  }
  removeUser (id) {
    var userWithID = this.users.filter( (user) => user.id === id);
    if (userWithID.length>0) {
      this.users = this.users.filter( (user) => user.id != id);
      return userWithID[0];
    } else {
      return null;
    }

    // var users = this.users.filter( (user) => user.id != id);
  }
  getUser (id) {
    return this.users.filter( (user) => user.id === id)[0];
    // if (userWithID.length>0) {
    //   return userWithID[0];
    // }
  }
  getUserList(room) {
    var users = this.users.filter( (user) => user.room === room);
    var namesArray = users.map((user)=>user.name);
    return namesArray;
  }
}

module.exports = {Users};