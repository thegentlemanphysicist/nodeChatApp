const expect = require('expect');
const {Users} = require('./users');

describe('Users', ()=>{
  var users;
  beforeEach(()=>{
    users = new Users();
    users.users = [{
      id: '1',
      name: 'Mike',
      room: 'node course'
    },{
      id: '2',
      name: 'Jen',
      room: 'React course'
    },{
      id: '3',
      name: 'July',
      room: 'node course'
    }];
  });

  it('should add new users', () =>{
    var users = new Users();
    var user = {
      id: '123',
      name: 'Jhon',
      room: 'fanboys'
    };
    var resUder = users.addUser(user.id,user.name,user.room);
    expect(users.users).toEqual([user]);

  });

  it('should remove a user', () =>{
    var removedUser = users.removeUser('1');
    expect(removedUser).toInclude({id:'1', name:'Mike',room:'node course'});
    expect(users.getUserList('node course')).toEqual(['July']);
    expect(users.users.length).toBe(2);
  });

  it('should not remove a non user', () =>{
    var removedUser = users.removeUser('4');
    expect(removedUser).toBe(null);
    expect(users.users.length).toBe(3);
  });  

  it('should find a user', () =>{
    var gottenUser = users.getUser('1');
    expect(gottenUser).toInclude({id:'1', name:'Mike',room:'node course'});
  });

  it('should not find a non user', () =>{
    var gottenUser = users.getUser('4');
    expect(gottenUser).toBe(undefined);
  });

  it('should return names for node course', () =>{
    var userList = users.getUserList('node course');
    expect(userList).toEqual(['Mike','July']);
  });

  it('should return names for react course', () =>{
    var userList = users.getUserList('React course');
    expect(userList).toEqual(['Jen']);

  });
});