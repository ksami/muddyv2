// Class declaration for MapController

MapController = function(map) {
  this.name = map.name;
  this.image = map.image;

  this.players = [];
  this.mobs = [];


  //  Methods  //

  // Check if player exists in map
  // returns true if exists
  this.playerExists = function(player) {
    var resultArray = $.grep(this.players, function(e, idx) {
      return e.name == player.name
    });

    if(resultArray.length == 0) {
      return true;
    }
    else {
      return false;
    }
  }

  // Add player to this.players
  // returns true on successful add
  this.addPlayer = function(player) {
    var isExist = this.playerExists(player);

    if(!isExist) {
      players.push(player);
      return true;
    }
    else {
      return false;
    }
  }

  // Remove player from this.players
  // returns true on successful remove
  this.removePlayer = function(player) {
    var isExist = this.playerExists(player);

    if(isExist) {
      this.players = this.players.filter(function(e) {
        return e.name == player.name;
      });
      return true;
    }
    else {
      return false;
    }
  }
}