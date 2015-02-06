// Class declaration for Player

Player = function(date, username, userId) {
  this.createdAt = date;
  this.isLoggedIn = true;
  this.name = username;  // Meteor.user().username
  this.userId = userId;
  this.avatar = {
    base: "spritesheet",
    weapon: "stick"
  };
  this.at = {
    map: "map1",
    x: 0,
    y: 0
  };

  this.hp = {
    current: 100,
    max: 100
  };
}