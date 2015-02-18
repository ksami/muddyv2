// Meteor.call(method) on client, runs on client and server
// method runs on client first, server sends real result back, client updates
Meteor.methods({
  playerUpdateIntentTarget : function(target) {
    if (! Meteor.userId()) {
      throw new Meteor.Error("not-authorized");
    }
    //intent.target = {gridx: int, gridy: int}
    if(! (Match.test(target, {gridx: Match.Integer, gridy: Match.Integer})) ) {
      throw new Meteor.Error("intent target does not match format");
    }
    _dbPlayers.update({name: Meteor.user().username}, {$set: {"intent.target": target}});
  },

  playerUpdateIntentAction : function(action) {
    if (! Meteor.userId()) {
      throw new Meteor.Error("not-authorized");
    }
    //intent.action = {action: string}
    if(! (Match.test(action, {action: String})) ) {
      throw new Meteor.Error("intent action does not match format");
    }
    _dbPlayers.update({name: Meteor.user().username}, {$set: {"intent.action": action}});
  }

  // movePlayer: function(moveTo) {
  //   // Make sure the user is logged in before inserting a task
  //   if (! Meteor.userId()) {
  //     throw new Meteor.Error("not-authorized");
  //   }
  //   console.log("moving");
  //   console.log(moveTo);
  //   _dbPlayers.update({name: Meteor.user().username}, {$set: {"at.x": moveTo.x, "at.y": moveTo.y}});
  // },
  // 
  // addTask: function (text) {
  //   _db_tasks.insert({
  //     text: text,
  //     createdAt: new Date(),
  //     owner: Meteor.userId(),
  //     username: Meteor.user().username
  //   });
  // }
});
