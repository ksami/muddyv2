// Class declaration for MapController

MapController = function(id, map) {
  this.id = id;
  this.name = map.name;
  this.image = map.image;
  this.size = map.size;
  this.portals = map.portals;
  this.spawn = map.spawn;

  this.thingsList = [{name: "hello"}];
  
  this.turns = {
    queue: []
  };

  this.isOccupied = false;


  //  Methods  //
  
  // Turns
  this.enqueueTurn = function(thing) {
    this.turns.queue.push(thing.name);
  };

  this.dequeueTurn = function() {
    return this.turns.queue.shift();
  };

  this.onNextTurn = function() {
    //todo: stub
    console.log("next turn");
    // this.enqueueTurn(this.thingsList[0]);
    // var thing = this.dequeueTurn();
    // thing.intent.execute();
  }


  // Timer 
  var self = this;

  this.timer = {
    interval: 3000,
    handle: undefined,

    // Starts whatever needs to be repeated in intervals
    start: function() {
      if(!self.timer.handle) {
        self.timer.handle = Meteor.setInterval(function() {
          self.onNextTurn();
        }, self.timer.interval);
      }
    },

    stop: function() {
      if(self.timer.handle) {
        Meteor.clearInterval(self.timer.handle);
      }
    }
  };


  // // Spawn a random mob from list of spawns
  // this.spawnMob = function() {
  //   var i = Math.floor(Math.random()*(this.spawn.mobs.length-1));
  //   var mob = this.spawn.mobs[i];
    
  //   if(_dbMobs.find({"at.map": this.name, species: mob.species}).count() < mob.maxCount) {
  //     var rand = Math.floor(Math.random()*(mob.location.length-1));
  //     var loc = mob.location[rand];
  //     // translate to x-y coords first
  //     var pos = {
  //       map: this.name,
  //       x: loc.gridx * this.size.stepx,
  //       y: loc.gridy * this.size.stepy
  //     };
  //     console.log("mob spawned");
  //     _dbMobs.insert(new Mob(mob.species, pos));

  //   }
  // };

};