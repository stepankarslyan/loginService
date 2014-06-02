var zmq = require("zmq");
var _ = require("underscore");
var responder = zmq.socket('rep');

var users = [
  {email: "petros.karslyan@gmail.com", password: "xx"},
  {email: "suzy.sargsyan@mail.ru", password: "xxl"},
  {email: "barak.obama@gmail.com", password: "ml"}
];


responder.bind("tcp://*:5555", function(err) {
  if (err) {
    console.log(err);
  } else {
    console.log("Listening on 5555...");  
  }
});

responder.on("message", function(request) {
  console.log("Request from client: " + request);
  var userRequest = JSON.parse(request);
  
  var success = _.some(users, function(user) {
    return (user.email == userRequest.email) && (user.password == userRequest.password);
  });
  
  responder.send(JSON.stringify({success:success}));
});

process.on("SIGINT", function() {
  responder.close();
});
