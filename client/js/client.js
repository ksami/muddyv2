if (Meteor.isClient) {
  // {{> loginButtons}} in html
  // meteor install accounts-ui
  // auth type: accounts-password, accounts-facebook etc
  Accounts.ui.config({
    passwordSignupFields: "USERNAME_ONLY"
  });

  Session.set("dbReady", false);
  Session.set("ticks", {val: 0, maxval: false});

  // accept own info
  Meteor.subscribe("player", function() {
    //Session.set("player", _dbPlayers.find().fetch()[0]);
    var player = _dbPlayers.findOne();
    console.log("db ready");
    Session.set("dbReady", true);
    _cursor = {x: player.at.x, y: player.at.y};
    //Session.set("cursor", {x:player.at.x, y:player.at.y});
  });

  // Event listener for _streamTimer
  _streamTimer.on('tick', function(tick) {
    Session.set("ticks", tick);
  });

  // console.log(Session.get("player"));
}
