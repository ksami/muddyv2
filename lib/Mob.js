// Class declaration for Mob

Mob = function(species, at) {
  this.name = "stoney";
  this.avatar = {
    base: "stone"
  };
  this.at = at;
  this.species = species;

  this.hp = {
    current: 100,
    max: 100
  };
};