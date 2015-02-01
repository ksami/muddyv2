if (Meteor.isClient) {

  Tracker.autorun(function() {
    turns = Session.get("turns");
    console.log("tracker autorun turn");
    if(turns.playerTurn) {
      console.log("player turn");
      Meteor.call("movePlayer", {x: 0, y:64});
    }
  })




}