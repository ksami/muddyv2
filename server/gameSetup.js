if(Meteor.isServer){
  //  MAP CONTROLLERS  //


  // Start each MapController's timer
  // for things like dmg over time, mob respawn
  for(var key in _mapControllers) {
    var map = _mapControllers[key];

    map.intervalHandle = Meteor.setInterval(function() {
      map.spawnMob();
    }, 1000);
  }
}