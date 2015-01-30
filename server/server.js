if (Meteor.isServer) {
  // only expose subset of db
  Meteor.publish("player", function () {
    return _dbPlayers.find({ owner: this.userId });
  });
  
  Meteor.startup(function () {
    // code to run on server at startup
    // testuser
    _dbPlayers.insert({
      createdAt: new Date(),
      owner: 1,
      username: "testuser"
    });
  });

  _streamChat.permissions.write(function(eventName) {
    return true;
  });

  _streamChat.permissions.read(function(eventName) {
    return true;
  });

  setInterval( function() {
    var msgs = [
      {from: "Admin", text: "Ugh."},
      {from: "Admin", text: "I'm sleepy..."},
      {from: "Admin", text: "We done yet?"},
      {from: "Admin", text: "*Yawns*"},
      {from: "Admin", text: "This is taking really long >.<"}
    ];
    _streamChat.emit('message', msgs[Math.floor(Math.random()*4)]);
  }, 5000);
}