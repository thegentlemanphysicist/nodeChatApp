var socket = io();

function scrollToBottom() {
  //Selectors
  let messages = jQuery('#messages');
  let newMessage = messages.children('li:last-child');
  //Heights
  let clientHeight = messages.prop('clientHeight');
  let scrollTop = messages.prop('scrollTop');
  let scrollHeight = messages.prop('scrollHeight');
  let newMessageHeight = newMessage.innerHeight();
  let lastMessageHeight = newMessage.prev().innerHeight();
  if (clientHeight+scrollTop +newMessageHeight + lastMessageHeight >= scrollHeight) {
    messages.scrollTop(scrollHeight);
  }
}

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
  let formattedTime = moment(message.createdAt).format('h:mm a');
  var template = jQuery('#message-template').html();
  var html = Mustache.render(template,{
    text: message.text,
    from: message.from,
    createdAt: formattedTime
  });
  jQuery('#messages').append(html);
 
  // var li = jQuery('<li> </li>');
  // li.text(`${message.from} ${formattedTime}: ${message.text}`);
  // jQuery('#messages').append(li);
  scrollToBottom();
})

socket.on('newLocationMessage', function (message) {
  let formattedTime = moment(message.createdAt).format('h:mm a');
  let template = jQuery('#location-message-template').html();
  let html = Mustache.render(template, {
    url: message.url,
    from: message.from,
    createdAt: formattedTime
  })
  jQuery('#messages').append(html);
  scrollToBottom();
});

jQuery('#message-form').on('submit', function(e){
  e.preventDefault();

  var messageTextbox = jQuery('[name=message]');

  socket.emit('createMessage', {
      from: 'User',
      text: messageTextbox.val()
    }, function (){
      messageTextbox.val('');
  });
});

var locationButton = jQuery('#send-location');
locationButton.on('click',function(){
  if (!navigator.geolocation){
    return alert('Geolocation not supported by your browser')
  }

  locationButton.attr('disabled','disabled').text('Sending location...');
  navigator.geolocation.getCurrentPosition(function (position) {
    locationButton.removeAttr('disabled').text('Send location');
    socket.emit('createLocationMessage', {
      latitude:  position.coords.latitude,
      longitude: position.coords.longitude
    });
  }, function () {
    locationButton.removeAttr('disabled').text('Send location');
    alert('Unable to fetch location');
  });
});