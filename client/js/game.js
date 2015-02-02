if (Meteor.isClient) {

  // Triggers: dbReady, player, ticks
  Tracker.autorun(function() {
    if(Session.get("dbReady")){

      var player = _dbPlayers.findOne();
      var tick = Session.get("ticks");
      var map = _mapControllers[player.at.map];
      var turn = map.turns;

      var time = tick.val % turn.roundTime;

      if(time < turn.playerTime) {
        turn.playerTurn = true;
        turn.mobTurn = false;
        Session.set("turns", {playerTime: (time+1), mobTime: 0});
        Session.set("turnSwitch", {turn: "player"});
      }
      else {
        turn.playerTurn = false;
        turn.mobTurn = true;
        Session.set("turns", {playerTime: 0, mobTime: (time-turn.playerTime+1)});
        Session.set("turnSwitch", {turn: "mob"});
      }

    }
  });

  // Triggers: dbReady, player, turnSwitch
  Tracker.autorun(function() {
    if(Session.get("dbReady")){
    
      var player = _dbPlayers.findOne();
      var turnSwitch = Session.get("turnSwitch");

      // Players' actions take effect once it switches to mobs' turn
      if(turnSwitch.turn == "mob") {
        //var cursor = Session.get("cursor");
        console.log(_cursor);
        if(_cursor.x != player.at.x || _cursor.y != player.at.y) {
          console.log("calling moveplayer");
          Meteor.call("movePlayer", _cursor);
        }
      }
    
    }
  });



}
