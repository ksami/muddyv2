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
}