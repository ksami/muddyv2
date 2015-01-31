if (Meteor.isClient) {
  // {{> loginButtons}} in html
  // meteor install accounts-ui
  // auth type: accounts-password, accounts-facebook etc
  Accounts.ui.config({
    passwordSignupFields: "USERNAME_ONLY"
  });

  Session.set("dbReady", false);

  // accept own info
  Meteor.subscribe("player", function() {
    //Session.set("player", _dbPlayers.find().fetch()[0]);
    console.log("db ready");
    Session.set("dbReady", true);
  });

            console.log(_mapControllers["map1"]);

  // console.log(Session.get("player"));
}