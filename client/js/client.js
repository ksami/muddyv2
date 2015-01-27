if (Meteor.isClient) {
  // {{> loginButtons}} in html
  // meteor install accounts-ui
  // auth type: accounts-password, accounts-facebook etc
  Accounts.ui.config({
    passwordSignupFields: "USERNAME_ONLY"
  });

  // accept own info
  Meteor.subscribe("player");

  // // counter starts at 0
  // Session.setDefault('counter', 0);

  // Helpers define variables/data rendered in html
  Template.pageLogin.helpers({
    // counter: function () {
    //   return Session.get('counter');
    // }
  });

  // Events define listeners for actions
  Template.pageLogin.events({
    // 'click button': function () {
    //   // increment the counter when button is clicked
    //   Session.set('counter', Session.get('counter') + 1);
    // }
  });
}