// Class declaration for RoomController
// holds a bunch of MapControllers

RoomController = function(id, maps) {
    this.id = id;
    this.occupied = false;
    this.mapControllers = {};

    for(var i=0; i<maps.length; i++) {
        this.mapControllers[maps[i].id] = new MapController(maps[i]);
    }
};