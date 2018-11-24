var expect = require('expect');
var {generateMessage} = require('./message');


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