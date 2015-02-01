if (Meteor.isClient) {

  Tracker.autorun(function() {
    var player = _dbPlayers.findOne();
    var turns = Session.get("turns");
    
    if(turns.playerTurn) {
      var cursor = Session.get("cursor");
      console.log(cursor);
      if(cursor.x != player.at.x || cursor.y != player.at.y) {
        console.log("calling moveplayer");
        Meteor.call("movePlayer", cursor);
      }
    }
  })




}
