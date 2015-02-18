if (Meteor.isClient) {

  // Helpers define variables/data rendered in html
  Template.pageGame.helpers({
    turns: function() {
      return Session.get("turns");
    }
  });


  // Events define listeners for actions
  Template.pageGame.events({
    'click #trigger': function () {
      //debug
      alert("clicked");
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
    $("#page").attr("tabindex", 1);
    $("#page").focus();

    // Actions menu
    actionsRender();

    var imgs = {};
    imageLoader(imgs);

    // Render kinetic only when db is ready
    // Re-render when data sources change
    Tracker.autorun(function() {
      if(Session.get("playerReady") && Session.get("mobsReady") && Session.get("imagesReady")){
        var player = _dbPlayers.findOne({name: Meteor.user().username});

        // Map, players, grid, mobs
        mapRender(player, imgs);
        // Hp bars
        combatInfoRender(player);

        $(".kineticjs-content").click(function() {
          $("#page").focus();
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
