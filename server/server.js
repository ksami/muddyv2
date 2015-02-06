if (Meteor.isServer) {
  // expose player's info to player
  Meteor.publish("player", function() {
    return _dbPlayers.find({userId: this.userId});
  });
  // and basic info about other players on same map
  Meteor.publish("playersInMap", function() {
    var playerAtMap = _dbPlayers.findOne({userId: this.userId}, {fields: {"at.map": 1}});
    if(playerAtMap) {
      return _dbPlayers.find({"at.map": playerAtMap.at.map, isLoggedIn: true}, {fields: {userId: 0}});
    }
    else {
      return null;
    }
  });
  // and basic info about mobs on same map
  Meteor.publish("mobsInMap", function() {
    var playerAtMap = _dbPlayers.findOne({userId: this.userId}, {fields: {"at.map": 1}});
    if(playerAtMap !== null) {
      return _dbMobs.find({"at.map": playerAtMap.at.map});
    }
    else {
      return null;
    }
  });
  
  Meteor.startup(function () {
    // code to run on server at startup
  });


  Meteor.users.find().observe({
    added: function(user) {
      var foundArray = _dbPlayers.find({name: user.username}).fetch();
      if(foundArray.length === 0) {
        // Create a new document in _dbPlayers
        _dbPlayers.insert(new Player(new Date(), user.username, user._id));
        console.log("new Player added");
      }
    }
  });


  Meteor._onLogin = function(userId) {
    console.log(userId + " just logged in");
    _dbPlayers.update({userId: userId}, {$set: {isLoggedIn: true}});
  };

  Meteor._onLogout = function(userId) {
    console.log(userId + " just logged out");
    //debug: simulate other players
    //_dbPlayers.update({userId: userId}, {$set: {isLoggedIn: false}});
  };



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