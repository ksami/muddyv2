kineticRender = function(player, imgs) {
  var map = _mapControllers[player.at.map];
  console.log(map);

  //  KINETIC  //

  // Stage //
  var stage = new Kinetic.Stage({
    container: 'map',
    width: map.size.x,
    height: map.size.y
  });


  // Background layer //
  var backgroundLayer = new Kinetic.Layer();
  var background = new Kinetic.Image({
    x: 0,
    y: 0,
    width: 640,
    height: 640,
    image: imgs[map.image]
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

  for(var i=map.size.stepy; i<=map.size.y; i+=map.size.stepy) {
    var gridLinex = new Kinetic.Line({
      x: 0,
      y: i,
      points: [0, 0, map.size.x, 0],
      stroke: 'black'
    });
    gridLayer.add(gridLinex);
  }
    
  for(var i=map.size.stepx; i<=map.size.x; i+=map.size.stepx) {
    var gridLiney = new Kinetic.Line({
      x: i,
      y: 0,
      points: [0, 0, 0, map.size.y],
      stroke: 'black'
    });
    gridLayer.add(gridLiney);
  }

  var mapmobs = _dbMobs.find({"at.map": player.at.map}).fetch();
  console.log("mapmobs\n");
  console.log(mapmobs);
  addMobAvatars(stage, mapmobs, imgs);


  var mapplayers = _dbPlayers.find({"at.map": player.at.map}, {fields: {name: 1, avatar: 1, at: 1}}).fetch();
  console.log("mapplayers\n");
  console.log(mapplayers);
  addPlayerAvatars(stage, mapplayers, imgs);



  // Cursor layer //
  var cursorLayer = new Kinetic.Layer();
  var cursor = new Kinetic.Rect({
    width: map.size.stepx,
    height: map.size.stepy,
    stroke: 'red',
    strokeWidth: 2
  });
  cursorLayer.add(cursor);



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
  $("#page").keydown(function(e) {
    console.log("keydown");
    e.preventDefault();

    // W key
    if(e.which == 87) {
      if(cursorLayer.y() - map.size.stepy >= 0) {
        cursorLayer.y(cursorLayer.y() - map.size.stepy);
      }
    }
    // S key
    else if(e.which == 83) {
      if(cursorLayer.y() + map.size.stepy < map.size.y) {
        cursorLayer.y(cursorLayer.y() + map.size.stepy);
      }
    }
    // A key
    else if(e.which == 65) {
      if(cursorLayer.x() - map.size.stepx >= 0) {
        cursorLayer.x(cursorLayer.x() - map.size.stepx);
      }
    }
    // D key
    else if(e.which == 68) {
      if(cursorLayer.x() + map.size.stepx < map.size.x) {
        cursorLayer.x(cursorLayer.x() + map.size.stepx);
      }
    }
    // E key commit target
    else if(e.which == 69) {
      //Session.set("cursor", {x: cursorLayer.x(), y: cursorLayer.y()});
      _cursor = {x: cursorLayer.x(), y: cursorLayer.y()};
      cursor.stroke('blue');
      console.log("e key pressed");
    }
    cursorLayer.draw();
  });

  $("#page").keyup(function(e) {
    e.preventDefault();

    // E key commit target
    if(e.which == 69) {
      cursor.stroke('red');
      cursorLayer.draw();
    }
  });

};


addMobAvatars = function(stage, mobs, imgs) {
  console.log("---adding mobs---");

  var layers = [];

  for (var i = 0; i < mobs.length; i++) {
    var mob = mobs[i];
    console.log(mob.name);

    // Character layer // 
    layers[i] = new Kinetic.Layer();

    var base = new Kinetic.Sprite({
      x: 0,
      y: 0,
      image: imgs[mob.avatar.base],
      animation: 'idle',
      animations: {
        idle: [
          0,0,64,64
        ]
      },
      frameRate: 5,
      frameIndex: 0
    });

    layers[i].add(base);
    base.start();


    var nameText = new Kinetic.Text({
      x: 6,
      y: 3,
      fontFamily: 'sans-serif',
      fontSize: 10,
      text: mob.name,
      fill: 'black'
    });
    layers[i].add(nameText);


    // Character
    stage.add(layers[i]);

    layers[i].x(mob.at.x);
    layers[i].y(mob.at.y);
    layers[i].draw();
  }
};



addPlayerAvatars = function(stage, players, imgs) {
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


//todo: or move above each char
combatInfoRender = function(player) {
  var map = _mapControllers[player.at.map];
  //  KINETIC  //

  // Stage //
  var stage = new Kinetic.Stage({
    container: 'combatInfo',
    width: 150,
    height: 100
  });


  var mapmobs = _dbMobs.find({"at.map": player.at.map}).fetch();
  thingsInfoRender(stage, mapmobs, 0);

  var mapplayers = _dbPlayers.find({"at.map": player.at.map}).fetch();
  thingsInfoRender(stage, mapplayers, 1);

};


thingsInfoRender = function(stage, things, column) {
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
