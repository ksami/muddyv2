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

    $('#messages').append($('<li>').text(msg.from + ': ' + msg.text));
    $('#messages').scrollTop( $('#messages').prop("scrollHeight") );
  };

  
  Template.pageGame.rendered = function() {

    // KINETIC //

    var stage = new Kinetic.Stage({
      container: 'map',
      width: 578,
      height: 200
    });
    var layer = new Kinetic.Layer();

    var imageObj = new Image();
    imageObj.onload = function() {
      var blob = new Kinetic.Sprite({
        x: 250,
        y: 40,
        image: imageObj,
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

      // add shape to layer
      layer.add(blob);

      // add layer to stage
      stage.add(layer);

      // start sprite animation
      blob.start();
    };

    imageObj.src = "/walk.png";
  };
}
