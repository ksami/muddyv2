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

// Add a new map controller for each map
_mapControllers = {};
_mapControllers["map1"] = new MapController({
  name: "map1",
  image: "map1.png"
});