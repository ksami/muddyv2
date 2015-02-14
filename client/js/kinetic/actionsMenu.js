// Actions menu and events


actionsRender = function() {
  var stepx = 50;
  var stepy = 20;

  var actionsText = [
    {text: "Move", action:"move", x: 3, y: 3}, 
    {text: "Attack", action: "attack", x: 53, y: 3}, 
    {text: "Skill", action: "skill", x: 3, y: 23}, 
    {text: "Item", action: "item", x: 53, y: 23}
  ];

  //lookup for easier reverse reference to find action
  var actionsTextLookup = {};
  for(var i=0; i<actionsText.length; i++) {
    if(!(actionsTextLookup[actionsText[i].x])) {
      actionsTextLookup[actionsText[i].x] = {};
    }
    actionsTextLookup[actionsText[i].x][actionsText[i].y] = actionsText[i].action;
  }

  //  KINETIC  //

  // Stage //
  var stage = new Kinetic.Stage({
    container: 'actions',
    width: 150,
    height: 75
  });

  var actionsLayer = new Kinetic.Layer();
  var actions = [];
  for (var i = 0; i < actionsText.length; i++) {
    actions[i] = new Kinetic.Text({
      x: actionsText[i].x,
      y: actionsText[i].y,
      fontFamily: 'sans-serif',
      fontSize: 12,
      text: actionsText[i].text,
      fill: 'black'
    });
    actionsLayer.add(actions[i]);
  }
  stage.add(actionsLayer);
  actionsLayer.draw();

  var cursorLayer = new Kinetic.Layer();
  var cursor = new Kinetic.Rect({
    x: 1,
    y: 1,
    width: stepx,
    height: 15,
    fillEnabled: false,
    stroke: 'red',
    strokeWidth: 2
  });
  cursorLayer.add(cursor);
  stage.add(cursorLayer);
  cursorLayer.draw();


  //  Events  //
  $("#page").keydown(function(e) {
    e.preventDefault();

    // Up arrow key
    if(e.which == 38) {
      if(cursorLayer.y() - stepy >= 0) {
        cursorLayer.y(cursorLayer.y() - stepy);
      }
    }
    // Down arrow key
    else if(e.which == 40) {
      if(cursorLayer.y() + stepy < stepy+2) {
        cursorLayer.y(cursorLayer.y() + stepy);
      }
    }
    // Left arrow key
    else if(e.which == 37) {
      if(cursorLayer.x() - stepx >= 0) {
        cursorLayer.x(cursorLayer.x() - stepx);
      }
    }
    // Right arrow key
    else if(e.which == 39) {
      if(cursorLayer.x() + stepx < stepx+2) {
        cursorLayer.x(cursorLayer.x() + stepx);
      }
    }
    // Enter key
    else if(e.which == 13) {
      _cursorAction = {action: actionsTextLookup[cursorLayer.x()+3][cursorLayer.y()+3]};
      console.log(_cursorAction);
    }
    cursorLayer.draw();
  });
};
