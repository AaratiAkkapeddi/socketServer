var chatUser = function(client){
  this.client = client;
  this.name = null;
};


chatUser.prototype.hasName = function(){
  return !!this.name;
};


chatUser.prototype.send = function(unwrapped){
  var wrapped = JSON.stringify(unwrapped);
  this.client.send(wrapped);
};

module.exports = chatUser;
