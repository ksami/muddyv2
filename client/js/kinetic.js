kineticRender = function(player, imgs) {

  //  KINETIC  //

  // Stage //
  var stage = new Kinetic.Stage({
    container: 'map',
    width: 640,
    height: 640
  });


  // Background layer //
  var backgroundLayer = new Kinetic.Layer();
  var background = new Kinetic.Image({
    x: 0,
    y: 0,
    width: 640,
    height: 640,
    image: imgs[_mapControllers[player.at.map].image]
  });
  backgroundLayer.add(background);
  backgroundLayer.draw();


  // var treeImg = new Image();
  // treeImg.onload = function() {
  //   for (var i=0; i<10; i++) {
  //     var blob = new Kinetic.Image({
  //       x: Math.floor(Math.random()*586),
  //       y: Math.floor(Math.random()*586),
  //       width: 64,
  //       height: 64,
  //       image: treeImg
  //     });
  //     backgroundLayer.add(blob);
  //   }
  //   backgroundLayer.draw();
  // };



  // Grid layer//
  var gridLayer = new Kinetic.Layer();

  for(var i=_MAPSIZE.STEPY; i<=_MAPSIZE.Y; i+=_MAPSIZE.STEPY) {
    var gridLinex = new Kinetic.Line({
      x: 0,
      y: i,
      points: [0, 0, _MAPSIZE.X, 0],
      stroke: 'black'
    });
    gridLayer.add(gridLinex);
  }
    
  for(var i=_MAPSIZE.X/_MAPSIZE.DIV; i<=_MAPSIZE.X; i+=_MAPSIZE.X/_MAPSIZE.DIV) {
    var gridLiney = new Kinetic.Line({
      x: i,
      y: 0,
      points: [0, 0, 0, _MAPSIZE.Y],
      stroke: 'black'
    });
    gridLayer.add(gridLiney);
  }


  var mapplayers = _dbPlayers.find({"at.map": player.at.map}, {fields: {name: 1, avatar: 1, at: 1}}).fetch();
  console.log("mapplayers\n");
  console.log(mapplayers);
  addPlayerCharacters(stage, mapplayers, imgs);



  // Cursor layer //
  var cursorLayer = new Kinetic.Layer();
  var cursorImg = new Kinetic.Rect({
    width: _MAPSIZE.STEPX,
    height: _MAPSIZE.STEPY,
    stroke: 'red',
    strokeWidth: 2
  })
  cursorLayer.add(cursorImg);



  // src //
  //backgroundImg.src = _mapControllers[player.at.map].image;
  //treeImg.src = "/tree.png";


  // Background
  stage.add(backgroundLayer);
  backgroundLayer.moveToBottom();

  // Grid
  stage.add(gridLayer);
  gridLayer.moveUp();
  gridLayer.draw();
  
  
  // Cursor
  stage.add(cursorLayer);
  cursorLayer.moveToTop();
  cursorLayer.x(player.at.x);
  cursorLayer.y(player.at.y);
  cursorLayer.draw();


  //  Events  //
  $("canvas").keydown(function(e) {
    e.preventDefault();

    // W key
    if(e.which == 87) {
      if(cursorLayer.y() - _MAPSIZE.STEPY >= 0) {
        cursorLayer.y(cursorLayer.y() - _MAPSIZE.STEPY);
      }
    }
    // S key
    else if(e.which == 83) {
      if(cursorLayer.y() + _MAPSIZE.STEPY < _MAPSIZE.Y) {
        cursorLayer.y(cursorLayer.y() + _MAPSIZE.STEPY);
      }
    }
    // A key
    else if(e.which == 65) {
      if(cursorLayer.x() - _MAPSIZE.STEPX >= 0 && player.at.x - _MAPSIZE.STEPX >= 0) {
        cursorLayer.x(cursorLayer.x() - _MAPSIZE.STEPX);
        //Meteor.call("movePlayer", {x: -1*_MAPSIZE.STEPX, y: 0*_MAPSIZE.STEPY});
      }
    }
    // D key
    else if(e.which == 68) {
      if(cursorLayer.x() + _MAPSIZE.STEPX < _MAPSIZE.X && player.at.x + _MAPSIZE.STEPX < _MAPSIZE.X) {
        cursorLayer.x(cursorLayer.x() + _MAPSIZE.STEPX);
        //Meteor.call("movePlayer", {x: 1*_MAPSIZE.STEPX, y: 0*_MAPSIZE.STEPY});
      }
    }
    // E key commit target
    else if(e.which == 69) {
      //Session.set("cursor", {x: cursorLayer.x(), y: cursorLayer.y()});
      _cursor = {x: cursorLayer.x(), y: cursorLayer.y()};
      console.log("e key pressed");
    }
    cursorLayer.draw();
  });

}


addPlayerCharacters = function(stage, players, imgs) {
  console.log("---adding players---");

  var layers = [];

  for (var i = 0; i < players.length; i++) {
    var playerCharacter = players[i];
    console.log(playerCharacter.name);

    // Character layer // 
    layers[i] = new Kinetic.Layer();

    var base = new Kinetic.Sprite({
      x: 0,
      y: 0,
      image: imgs[playerCharacter.avatar.base],
      animation: 'idle',
      animations: {
        walk: [
          0,0,64,64,
          64,0,64,64
        ],
        idle: [
          0,64,64,64
        ]
      },
      frameRate: 5,
      frameIndex: 0
    });

    layers[i].add(base);
    base.start();


    var usernameText = new Kinetic.Text({
      x: 6,
      y: 3,
      fontFamily: 'sans-serif',
      fontSize: 10,
      text: playerCharacter.name,
      fill: 'black'
    });
    layers[i].add(usernameText);

    var weapon = new Kinetic.Sprite({
      x: 0,
      y: 0,
      image: imgs[playerCharacter.avatar.weapon],
      animation: 'idle',
      animations: {
        idle: [
          0,0,64,64
        ]
      },
      frameRate: 5,
      frameIndex: 0
    });

    layers[i].add(weapon);
    weapon.start();


    // Character
    stage.add(layers[i]);

    layers[i].x(playerCharacter.at.x);
    layers[i].y(playerCharacter.at.y);
    layers[i].draw();
  }
};
