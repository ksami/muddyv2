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

    var stage = new Kinetic.Stage({
      container: 'map',
      width: 640,
      height: 640
    });

    // Background layer //
    var background = new Kinetic.Layer();
    var backgroundImage = new Image();
    backgroundImage.onload = function() {
      var blob = new Kinetic.Image({
        x: 0,
        y: 0,
        width: 640,
        height: 640,
        image: backgroundImage
      });

      background.add(blob);
      stage.add(background);
      background.moveToBottom();
      background.draw();
    };


    // Grid //
    var grid = new Kinetic.Layer();
    var gridLines = new Kinetic.Line({
      x: 64,
      y: 0,
      points: [0, 0, 0, 640],
      stroke: 'black'
    });
    grid.add(gridLines);
    stage.add(grid);
    grid.moveUp();
    grid.draw();


    // Character layer // 
    var layer = new Kinetic.Layer();
    var character = new Image();
    character.onload = function() {
      var blob = new Kinetic.Sprite({
        x: 128,
        y: 0,
        image: character,
        animation: 'walk',
        animations: {
          walk: [
            0,0,64,64,
            64,0,64,64
          ]
        },
        frameRate: 5,
        frameIndex: 0
      });

      layer.add(blob);
      stage.add(layer);
      blob.start();
    };
    layer.moveToTop();


    // src //
    character.src = "/walk.png";
    backgroundImage.src = "/map1.png";

    setInterval(function() {
      layer.y(layer.y() + 1);
    },200);
  };

}