if (Meteor.isClient) {
  // {{> loginButtons}} in html
  // meteor install accounts-ui
  // auth type: accounts-password, accounts-facebook etc
  Accounts.ui.config({
    passwordSignupFields: "USERNAME_ONLY"
  });


  // if logged in
  Tracker.autorun(function() {
    if(Meteor.user() != null) {
      console.log("logged in");
      Session.set("playerReady", false);
      Session.set("mapReady", false);
      Session.set("mobsReady", false);
      Session.set("imagesReady", false);
      Session.set("ticks", {val: 0, maxval: false});

      // accept own info
      Meteor.subscribe("player", function() {
        Session.set("playerReady", true);
        console.log("playerReady");
        //Session.set("player", _dbPlayers.find().fetch()[0]);
        var player = _dbPlayers.findOne({name: Meteor.user().username});
        _cursor = {x: player.at.x, y: player.at.y};
      });

      Meteor.subscribe("playersInMap", function() {
        Session.set("mapReady", true);
        console.log("mapReady");
      });

      Meteor.subscribe("mobsInMap", function() {
        Session.set("mobsReady", true);
        console.log("mobsReady");
      });

      // Event listener for _streamTimer
      _streamTimer.on('tick', function(tick) {
        Session.set("ticks", tick);
      });
    }
  });

}
