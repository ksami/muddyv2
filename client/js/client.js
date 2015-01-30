if (Meteor.isClient) {
  // {{> loginButtons}} in html
  // meteor install accounts-ui
  // auth type: accounts-password, accounts-facebook etc
  Accounts.ui.config({
    passwordSignupFields: "USERNAME_ONLY"
  });

  // accept own info
  Meteor.subscribe("player");

  console.log(_dbPlayers.find().fetch());
  // Session.set("player", _dbPlayers.find());
  // console.log(Session.get("player"));
}