if (Meteor.isClient) {

  // Helpers define variables/data rendered in html
  Template.pageGame.helpers({
    actions: [
      {action: {type: "move", val: 1}, text: "move"},
      {action: {type: "fight", val: 1}, text: "fight"},
      {action: {type: "skill", val: 4}, text: "skill"},
      {action: {type: "item", val: 1}, text: "item"}
    ]
  });


  // Events define listeners for actions
  Template.pageGame.events({
    // 'click button': function () {
    //   // increment the counter when button is clicked
    //   Session.set('counter', Session.get('counter') + 1);
    // }
    'submit .form-chat': function(event) {
      var msg = {from: Meteor.user().username, text: event.target.inputChat.value};

      _streamChat.emit('message', msg);
      addMsgToChat(msg);

      event.target.inputChat.value = "";

      // Prevent default form submit
      return false;
    }
  });


  // Event listener for _streamChat
  _streamChat.on('message', function(msg) {
    addMsgToChat(msg);
  });

  // Scroll to bottom everytime messages added
  addMsgToChat = function(msg) {
    // Remove <buffer> oldest messages everytime it hits 2*<buffer>
    var buffer = 100;
    if( $('#messages li').length >= buffer*2) {
      $('#messages li').slice(0,buffer).remove();
    }

    $('#messages').append('<li>' + msg.from + ': ' + msg.text + '</li>');
    $('#messages').scrollTop( $('#messages').prop("scrollHeight") );
  };

  
  Template.pageGame.rendered = function() {

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
    };

    var treeImg = new Image();
    treeImg.onload = function() {
      for (var i=0; i<10; i++) {
        var blob = new Kinetic.Image({
          x: Math.floor(Math.random()*586),
          y: Math.floor(Math.random()*586),
          width: 64,
          height: 64,
          image: treeImg
        });
        backgroundLayer.add(blob);
      }
      backgroundLayer.draw();
    };
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
        animation: 'walk',
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
      stage.add(characterLayer);
      blob.start();
    };
    

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
    cursorLayer.draw();


    // src //
    characterImg.src = "/spritesheet.png";
    weaponImg.src = "/stick.png";
    backgroundImg.src = "/map1.png";
    treeImg.src = "/tree.png";

    setInterval(function() {
      characterLayer.y(characterLayer.y() + 1);
    },200);

    $(document).keydown(function(e) {
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
        if(cursorLayer.x() - _MAPSIZE.STEPX >= 0) {
          cursorLayer.x(cursorLayer.x() - _MAPSIZE.STEPX);
        }
      }
      // D key
      else if(e.which == 68) {
        if(cursorLayer.x() + _MAPSIZE.STEPX < _MAPSIZE.X) {
          cursorLayer.x(cursorLayer.x() + _MAPSIZE.STEPX);
        }
      }
      cursorLayer.draw();
    });
  };

}