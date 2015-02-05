// Class declaration for MapController

MapController = function(map) {
  this.name = map.name;
  this.image = map.image;
  this.size = map.size;

  this.turns = {
    playerTime: map.turns.playerTime,
    mobTime: map.turns.mobTime,
    roundTime: map.turns.playerTime + map.turns.mobTime
  };

  this.spawn = {
    mobs: map.spawn.mobs,
  };


  //  Methods  //

  // // Check if player exists in map
  // // returns true if exists
  // this.playerExists = function(player) {
  //   var resultElem = _.find(this.players, function(p) {
  //     return p.name == player.name
  //   });

  //   if(resultElem == undefined) {
  //     return false;
  //   }
  //   else {
  //     return true;
  //   }
  // }

  // // Add player to this.players
  // // returns true on successful add
  // this.addPlayer = function(player) {
  //   var isExist = this.playerExists(player);

  //   if(!isExist) {
  //     this.players.push(player);
  //     return true;
  //   }
  //   else {
  //     return false;
  //   }
  // }

  // // Remove player from this.players
  // // returns true on successful remove
  // this.removePlayer = function(player) {
  //   var isExist = this.playerExists(player);

  //   if(isExist) {
  //     this.players = this.players.filter(function(e) {
  //       return e.name == player.name;
  //     });
  //     return true;
  //   }
  //   else {
  //     return false;
  //   }
  // }
  
  var self = this;

  this.timer = {
    interval: 1000,
    handle: undefined,

    // Starts whatever needs to be repeated in intervals
    start: function() {
      self.timer.handle = Meteor.setInterval(function() {
        self.spawnMob();
      }, self.timer.interval);
    },

    stop: function() {
      if(self.timer.handle) {
        Meteor.clearInterval(self.timer.handle);
      }
    }
  };


  // Spawn a random mob from list of spawns
  this.spawnMob = function() {
    //stub
    console.log("mob spawned");
  };

}