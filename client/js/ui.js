if (Meteor.isClient) {

  // Helpers define variables/data rendered in html
  Template.pageGame.helpers({
    actions: [
      {action: {type: "move", val: 1}, text: "move"},
      {action: {type: "fight", val: 1}, text: "fight"},
      {action: {type: "skill", val: 4}, text: "skill"},
      {action: {type: "item", val: 1}, text: "item"}
    ],
    player: function() {
      return _dbPlayers.findOne();
    }
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
    // Render kinetic only when db is ready
    // Re-render when data sources change
    Tracker.autorun(function() {
      if(Session.get("dbReady")){
        kineticRender();

        // Force canvas to be focus-able
        $("canvas").attr("tabindex", 1);
        $("#page").attr("tabindex", 1);
        $("canvas").focus();

        $("#page").focus(function() {
          console.log("page focus");
          $("canvas").focus();
        });
        $(".kineticjs-content").click(function() {
          console.log("kjs focus");
          $("canvas").focus();
        });
      }
    });

  };

}
