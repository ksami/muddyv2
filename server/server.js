if (Meteor.isServer) {
  // only expose player's info to player
  Meteor.publish("player", function() {
    return _dbPlayers.find({userId: this.userId});
  });
  
  Meteor.startup(function () {
    // code to run on server at startup
  });


  Meteor.users.find().observe({
    added: function(user) {
      var foundArray = _dbPlayers.find({name: user.username}).fetch();
      if(foundArray.length == 0) {
        // Create a new document in _dbPlayers
        _dbPlayers.insert(new Player(new Date(), user.username, user._id));
        console.log("new Player added");
      }
    }
  });


  _streamChat.permissions.write(function(eventName) {
    return true;
  });
  _streamChat.permissions.read(function(eventName) {
    return true;
  });

  _streamTimer.permissions.write(function(eventName) {
    return true;
  });
  _streamTimer.permissions.read(function(eventName) {
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

  var val = 2048682739;
  var initVal = 2048682739;

  Meteor.setInterval(function() {
    _streamTimer.emit('tick', {val: val});
    val-=1;
    if(val <= 0) {
      val = initVal;
    }
  }, 1000);

}