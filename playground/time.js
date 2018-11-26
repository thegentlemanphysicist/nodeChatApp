const moment = require('moment');

let date = moment();
date.add(1, 'year').subtract(9,'months');
console.log(date.format('h:mm a'));