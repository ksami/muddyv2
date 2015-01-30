// Class declaration for Player

Player = function(date, username, userId) {
  this.createdAt = date;
  this.name = username;  // Meteor.user().username
  this.userId = userId;
  this.avatar = {
    base: "spritesheet.png",
    weapon: "stick.png"
  }
}