var expect = require('expect');
var {generateMessage, generateLocationMessage} = require('./message');


describe('generateMessage', () =>{
  it('should generate correct message object',() =>{
    const fromText = 'iAmSender';
    const messageText = 'A message for the ages!';
    const messageObj = generateMessage(fromText, messageText)
    expect(messageObj.from).toEqual(fromText);
    expect(messageObj.text).toEqual(messageText);
    //alternatively
    expect(messageObj).toInclude({from:fromText,text:messageText});
    expect(messageObj.createdAt).toBeA('number');
  })
});


describe('generateLocationMessage', () =>{
  it('should generate correct location object',() =>{
    const from = 'IAMSender';
    const latitude = '104.2323';
    const longitude = '3333.3333';
    const locationMessage = generateLocationMessage(from, latitude,longitude);
    expect(locationMessage).toInclude({from,url:`https://www.google.com/maps?q${latitude},${longitude}`});
    expect(locationMessage.createdAt).toBeA('number');

  })
});