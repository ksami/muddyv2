if(Meteor.isServer){
  //  MAP CONTROLLERS  //


  // Start each MapController's timer
  // for things like dmg over time, mob respawn
  for(var i=0; i<_roomControllers.length; i++) {
    var room = _roomControllers[i];
    for(var j=0; j<room.mapControllers.length; j++) {
        var map = room.mapControllers[j];
        map.timer.start();
    }
  }
}