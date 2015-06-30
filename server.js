var express = require('express'),
    server = express(),
    port = process.env.PORT || 3000,

    WebSocket = require('ws').Server, //no error its not real
    socket = new WebSocket({port: 1337});//has to run on its own port
    /*<><><><><>*/
    //socket = require('socket.io')(http);
    //socket = new WebSocket({server: server});
    /*<><><><><>*/
server.listen(port);
var chatUser = require('./models/chatUser.js');
var userDb = [];
var history = [];

socket.on('connection', function(client){ //client represents what is connected
  console.log('client connected...');
  /*<><><><><><><><><>*/
  /*var id = setInterval(function() {
    client.send(JSON.stringify(new Date()), function() {  });
  }, 1000);*/
  /*<><><><><><><><><>*/
  var chatuser = new chatUser(client);
  

  client.on('message',function(msg){ //two types of client events , message and closing the connection.
    var unwrapped = JSON.parse(msg);
    if(!chatuser.hasName()){
        chatuser.name = unwrapped.text;
    } else {
        unwrapped.name = chatuser.name;
        console.log(unwrapped);
        history.push(unwrapped);
        userDb.forEach(function(eachClient){ //sends it to every client in the database
          eachClient.send(unwrapped);
        });
    }
  });

  client.on('close', function(){
    var index = userDb.indexOf(chatuser);
    userDb.splice(index,1);
    console.log('goodbye');
  });

/*<><><><><><><><><>*/
/*client.on("close", function() {
    console.log("websocket connection close");
    clearInterval(id);
  });*/
/*<><><><><><><>*/

  history.forEach(function(msg){
    chatuser.send(msg);
  });

  userDb.push(chatuser);

});


console.log('Socket Running on Heroku!');
