// Meteor.call(method) on client, runs on client and server
// method runs on client first, server sends real result back, client updates
Meteor.methods({
  playerUpdateIntent : function(intent) {
    //TODO: insert checks to make sure intent is an intent
    if (! Meteor.userId()) {
      throw new Meteor.Error("not-authorized");
    }
    //intent.target = {gridx: int, gridy: int}
    //intent.action = {action: string}
    //TODO: keeps triggering cos intents are null often and this is called every tick
    // if(! (Match.test(intent, {target: {gridx: Match.Integer, gridy: Match.Integer}, action: {action: String}}))) {
    //   throw new Meteor.Error("intent does not match format");
    // }
    _dbPlayers.update({name: Meteor.user().username}, {$set: {"intent.target": intent.target, "intent.action": intent.action}});
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
