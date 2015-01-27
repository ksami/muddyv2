if (Meteor.isServer) {
  // only expose subset of db
  Meteor.publish("player", function () {
    return _dbPlayers.find({ owner: this.userId });
  });
  
  Meteor.startup(function () {
    // code to run on server at startup
  });
}