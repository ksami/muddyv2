_dbPlayers = new Mongo.Collection('players');

_streamChat = new Meteor.Stream('chat');
_streamTimer = new Meteor.Stream('timer');

_MAPSIZE = {
  X: 640,
  Y: 640,
  DIV: 10,
  STEPX: 64,
  STEPY: 64,
};

_cursor = {};

// Add a new map controller for each map
_mapControllers = {};
_mapControllers["map1"] = new MapController({
  name: "map1",
  image: "map1",
  turns: {
    playerTime: 5,
    mobTime: 5
  },
  spawn: {
    mobs: [
      {
        species: "tree",
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
