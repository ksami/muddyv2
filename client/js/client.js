if (Meteor.isClient) {
  // {{> loginButtons}} in html
  // meteor install accounts-ui
  // auth type: accounts-password, accounts-facebook etc
  Accounts.ui.config({
    passwordSignupFields: "USERNAME_ONLY"
  });

  // accept own info
  Meteor.subscribe("player");

  // initialise messages array
  // Session.setDefault('messages', []);

}