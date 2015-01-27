if (Meteor.isClient) {
  Session.set('chats', [
    {from: "Admin", text: "Ugh."},
    {from: "Admin", text: "I'm sleepy..."},
    {from: "Admin", text: "We done yet?"},
    {from: "Admin", text: "*Yawns*"}
  ]);


  // Helpers define variables/data rendered in html
  Template.pageGame.helpers({

    messages: function() {
      return Session.get('messages');
    },

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

  // Scroll to bottom everytime messages changed
  addMsgToChat = function(msg) {
    var messages = Session.get('messages');
    messages.push(msg)
    Session.set('messages', messages);
    $('#messages').scrollTop( $('#messages').prop("scrollHeight") );
  };
}