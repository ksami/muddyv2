kineticRender = function() {
  var player = _dbPlayers.findOne();
  console.log("tracker autorun");
  console.log(player.name);

  //  KINETIC  //

  // Stage //
  var stage = new Kinetic.Stage({
    container: 'map',
    width: 640,
    height: 640
  });


  // Background layer //
  var backgroundLayer = new Kinetic.Layer();
  var backgroundImg = new Image();
  backgroundImg.onload = function() {
    var blob = new Kinetic.Image({
      x: 0,
      y: 0,
      width: 640,
      height: 640,
      image: backgroundImg
    });
    backgroundLayer.add(blob);
    backgroundLayer.draw();
  };

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
  stage.add(backgroundLayer);
  backgroundLayer.moveToBottom();


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

  stage.add(gridLayer);
  gridLayer.moveUp();
  gridLayer.draw();


  // Character layer // 
  var characterLayer = new Kinetic.Layer();
  var characterImg = new Image();
  characterImg.onload = function() {
    var blob = new Kinetic.Sprite({
      x: 0,
      y: 0,
      image: characterImg,
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

    characterLayer.add(blob);
    blob.start();
  };

  var usernameText = new Kinetic.Text({
    x: 6,
    y: 3,
    fontFamily: 'sans-serif',
    fontSize: 10,
    text: Meteor.user().username,
    fill: 'black'
  });
  characterLayer.add(usernameText);

  var weaponImg = new Image();
  weaponImg.onload = function() {
    var blob = new Kinetic.Sprite({
      x: 0,
      y: 0,
      image: weaponImg,
      animation: 'idle',
      animations: {
        idle: [
          0,0,64,64
        ]
      },
      frameRate: 5,
      frameIndex: 0
    });

    characterLayer.add(blob);
    blob.start();
  };
  stage.add(characterLayer);
  characterLayer.x(player.at.x);
  characterLayer.y(player.at.y);
  

  // Cursor layer //
  var cursorLayer = new Kinetic.Layer();
  var cursorImg = new Kinetic.Rect({
    width: _MAPSIZE.STEPX,
    height: _MAPSIZE.STEPY,
    stroke: 'red',
    strokeWidth: 2
  })
  cursorLayer.add(cursorImg);
  stage.add(cursorLayer);
  cursorLayer.moveToTop();
  cursorLayer.x(player.at.x);
  cursorLayer.y(player.at.y);
  cursorLayer.draw();


  // src //
  characterImg.src = player.avatar.base;
  weaponImg.src = player.avatar.weapon;
  backgroundImg.src = _mapControllers[player.at.map].image;
  //treeImg.src = "/tree.png";


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
        Meteor.call("movePlayer", {x: -1*_MAPSIZE.STEPX, y: 0*_MAPSIZE.STEPY});
      }
    }
    // D key
    else if(e.which == 68) {
      if(cursorLayer.x() + _MAPSIZE.STEPX < _MAPSIZE.X && player.at.x + _MAPSIZE.STEPX < _MAPSIZE.X) {
        cursorLayer.x(cursorLayer.x() + _MAPSIZE.STEPX);
        Meteor.call("movePlayer", {x: 1*_MAPSIZE.STEPX, y: 0*_MAPSIZE.STEPY});
      }
    }
    cursorLayer.draw();
  });

}