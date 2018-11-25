var socket = io();

socket.on('connect', function () {
  console.log('connected to server');
  // socket.emit('createEmail', {
  //   to: 'jen@test.ca',
  //   text: 'Hey Guuuuurl What up?'
  // });
  // socket.emit('createMessage', {
  //   from: 'me@me.me',
  //   text: 'The quality of mercy is not strained'
  // });
});



socket.on('disconnect', function () {
  console.log('disconnected from server');
});

// socket.on('newEmail', function(email) {
//   console.log('New Email', email);
// });

// socket.emit('createMessage',{
//   from: 'Frank',
//   text: 'This is a message'
// }, function (data) {
//   console.log('Got it!',data);
// });


socket.on('newMessage', function(message) {
  console.log('New Message', message);
  var li = jQuery('<li> </li>');
  li.text(`${message.from}: ${message.text}`);
  jQuery('#messages').append(li);
})

jQuery('#message-form').on('submit', function(e){
  e.preventDefault();
  socket.emit('createMessage', {
    from: 'User',
    text: jQuery('[name=message]').val()
  }, function (){

  })
});