// Everyone's hp bars

//todo: or move above each char
combatInfoRender = function(player) {
  var map = _mapControllers[player.at.map.id];
  //  KINETIC  //

  // Stage //
  var stage = new Kinetic.Stage({
    container: 'combatInfo',
    width: 150,
    height: 100
  });


  var mapmobs = _dbMobs.find({"at.map.id": player.at.map.id}).fetch();
  addThingsInfo(stage, mapmobs, 0);

  var mapplayers = _dbPlayers.find({"at.map.id": player.at.map.id}).fetch();
  addThingsInfo(stage, mapplayers, 1);

};


addThingsInfo = function(stage, things, column) {
  var layers = [];

  for (var i = 0; i < things.length; i++) {
    var thing = things[i];
    layers[i] = new Kinetic.Layer();

    var hp = new Kinetic.Rect({
      x: 0,
      y: 0,
      width: Math.floor((thing.hp.current/thing.hp.max) * 50),
      height: 4,
      fill: 'red',
      strokeEnabled: false
    });
    layers[i].add(hp);

    var hpbar = new Kinetic.Rect({
      x: 0,
      y: 0,
      width: 50,
      height: 4,
      fillEnabled: false,
      stroke: 'black',
      strokeWidth: 2
    });
    layers[i].add(hpbar);

    var nameText = new Kinetic.Text({
      x: 0,
      y: 4,
      fontFamily: 'sans-serif',
      fontSize: 12,
      text: thing.name,
      fill: 'black'
    });
    layers[i].add(nameText);

    stage.add(layers[i]);
    layers[i].x(3 + column*60);
    layers[i].y(i*20);
    layers[i].draw();
  }
};
