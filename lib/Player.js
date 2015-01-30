// Class declaration for Player

Player = function(date, username, userId) {
  this.createdAt = date;
  this.name = username;  // Meteor.user().username
  this.userId = userId;
  this.avatar = {
    base: "spritesheet.png",
    weapon: "stick.png"
  };
  this.at = {
    map: "map1",
    gridx: 0,
    gridy: 0
  };
}