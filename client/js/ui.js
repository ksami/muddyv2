if (Meteor.isClient) {

  // Helpers define variables/data rendered in html
  Template.pageGame.helpers({
    actions: [
      {action: {type: "move", val: 1}, text: "move"},
      {action: {type: "fight", val: 1}, text: "fight"},
      {action: {type: "skill", val: 4}, text: "skill"},
      {action: {type: "item", val: 1}, text: "item"}
    ],
    turns: function() {
      return Session.get("turns");
    }
  });


  // Events define listeners for actions
  Template.pageGame.events({
    'click button': function () {
      //debug
    },
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
    var imgs = {};
    imageLoader(imgs);

    // Render kinetic only when db is ready
    // Re-render when data sources change
    Tracker.autorun(function() {
      if(Session.get("playerReady") && Session.get("mobsReady") && Session.get("imagesReady")){
        var player = _dbPlayers.findOne({name: Meteor.user().username});

        console.log(imgs);
        kineticRender(player, imgs);
        combatInfoRender(player);

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


  // Preloads all images
  // returns: imgs{}
  imageLoader = function(imgs) {
    // put the paths to your images in imageURLs
    var fileExt = ".png";
    var imageURLs=[
      "tree",
      "spritesheet",
      "stick",
      "map1",
      "stone"
    ];
    var imagesOK=0;

    // fully load every image, then callback
    for (var i=0; i<imageURLs.length; i++) {
      var img = new Image();
      imgs[imageURLs[i]] = img;
      img.onload = function(){ 
        imagesOK++;
        // callback only when all images are loaded
        if (imagesOK>=imageURLs.length ) {
          Session.set("imagesReady", true);
          console.log("images ready");
        }
      };
      img.onerror=function(){console.err("image load failed");};
      img.crossOrigin="anonymous";
      img.src = imageURLs[i] + fileExt;
    }
  };

}
