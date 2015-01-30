if (Meteor.isServer) {
  // only expose player's info to player
  Meteor.publish("player", function () {
    return _dbPlayers.find({ userId: this.userId });
  });
  
  Meteor.startup(function () {
    // code to run on server at startup

    // Add a new map controller for each map
    _mapControllers["map1"] = new MapController({
      name: "map1",
      image: "map1.png"
    });
  });


  Meteor.users.find().observe({
    added: function(user) {
      // Create a new document in _dbPlayers
      _dbPlayers.insert(new Player(new Date(), user.username, user._id));
    }

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