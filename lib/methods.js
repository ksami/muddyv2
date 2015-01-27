// Meteor.call(method) on client, runs on client and server
// method runs on client first, server sends real result back, client updates
// Meteor.methods({
//   addTask: function (text) {
//     // Make sure the user is logged in before inserting a task
//     if (! Meteor.userId()) {
//       throw new Meteor.Error("not-authorized");
//     }

//     _db_tasks.insert({
//       text: text,
//       createdAt: new Date(),
//       owner: Meteor.userId(),
//       username: Meteor.user().username
//     });
//   }
// });