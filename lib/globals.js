_dbPlayers = new Mongo.Collection('players');
_dbMobs = new Mongo.Collection('mobs');

_streamChat = new Meteor.Stream('chat');
_streamTimer = new Meteor.Stream('timer');


// Add a new map controller for each map
_mapControllers = {};
_mapControllers["map1"] = new MapController({
  name: "map1",
  image: "map1",
  size: {
    x: 640,
    y: 640,
    divx: 10,
    divy: 10,
    stepx: 64,
    stepy: 64,
  },
  turns: {
    playerTime: 5,
    mobTime: 5
  },
  spawn: {
    mobs: [
      {
        species: "stone",
        location: [
          {gridx: 1, gridy: 1},
          {gridx: 2, gridy: 2},
          {gridx: 3, gridy: 3},
          {gridx: 4, gridy: 4},
        ],
        respawnTime: 5000, //ms
        maxCount: 4
      }
    ]
  }
});
