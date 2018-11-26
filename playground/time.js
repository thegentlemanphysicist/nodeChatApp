const moment = require('moment');


var someTimestamp = moment().valueOf();
console.log(someTimestamp);


let createdAt = 1234;
let date = moment(createdAt);
date.add(1, 'year').subtract(9,'months');
console.log(date.format('h:mm a'));