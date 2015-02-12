_dbPlayers = new Mongo.Collection('players');
_dbMobs = new Mongo.Collection('mobs');

_streamChat = new Meteor.Stream('chat');
_streamTimer = new Meteor.Stream('timer');


_mapControllers = {};
