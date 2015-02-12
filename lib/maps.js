//
// Add a new map controller for each map
// 
_mapControllers["map1"] = new MapController({
  name: "map1",
  image: "map1",
  size: {
    x: 640,
    y: 640,
    divx: 10,
    divy: 10,
    stepx: 64,
    stepy: 64,
  },
  portals: [
    {name: "north", to: "town1", location: {gridx: 4, gridy: 0}},
    {name: "south", to: "town1", location: {gridx: 4, gridy: 9}},
    {name: "east", to: "town1", location: {gridx: 9, gridy: 4}},
    {name: "west", to: "town1", location: {gridx: 0, gridy: 4}}
  ],
  turns: {
    playerTime: 5,
    mobTime: 5
  },
  spawn: {
    mobs: [
      {
        species: "stone",
        location: [
          {gridx: 1, gridy: 1},
          {gridx: 2, gridy: 2},
          {gridx: 3, gridy: 3},
          {gridx: 4, gridy: 4},
        ],
        respawnTime: 5000, //ms
        maxCount: 4
      }
    ]
  }
});

_mapControllers["town1"] = new MapController({
  name: "town1",
  image: "map1",
  size: {
    x: 640,
    y: 640,
    divx: 10,
    divy: 10,
    stepx: 64,
    stepy: 64,
  },
  portals: [
    {name: "north", to: "map1", location: {gridx: 4, gridy: 0}},
    {name: "south", to: "map1", location: {gridx: 4, gridy: 9}},
    {name: "east", to: "map1", location: {gridx: 9, gridy: 4}},
    {name: "west", to: "map1", location: {gridx: 0, gridy: 4}}
  ],
  turns: {
    playerTime: 1,
    mobTime: 0
  },
  spawn: {}
});
