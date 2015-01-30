_dbPlayers = new Mongo.Collection('players');

_streamChat = new Meteor.Stream('chat');

_MAPSIZE = {
  X: 640,
  Y: 640,
  DIV: 10,
  STEPX: 64,
  STEPY: 64,
};

_mapControllers = {};