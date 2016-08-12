var twilio = require('twilio'),
client = twilio('ACe85eeb6ace9dba68f933f3fdfedceca3', '1032377e4dcecd2b976fe7195bd9cd2c'),
cronJob = require('cron').CronJob;

var express = require('express'),
bodyParser = require('body-parser'),
app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
	
var numbers = ['6159467334'];


var textJob = new cronJob( '30 22 * * *', function(){
for( var i = 0; i < numbers.length; i++ ) {
  client.sendMessage( { to:numbers[i], from:'6154318052', body:'Time for messages!.'}, function( err, data ) {
    console.log( data.body );
  });
}
},  null, true);



app.post('/message', function (req, res) {
  var resp = new twilio.TwimlResponse();
  resp.message('Thanks for subscribing!');
  res.writeHead(200, {
    'Content-Type':'text/xml'
  });
  res.end(resp.toString());
});



var server = app.listen(3000, function() {
  console.log('Listening on port %d', server.address().port);
});




