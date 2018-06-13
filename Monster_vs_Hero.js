//@see https://stackoverflow.com/questions/1335851/what-does-use-strict-do-in-javascript-and-what-is-the-reasoning-behind-it
'use strict';

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}




function LivingThing(name, health) {
  this.name = name;
  this.health = health;
}

LivingThing.prototype = {

  constructor: LivingThing,

  isAlive: function () {
    return Boolean(this.health);
  },

  getName: function () {
    return this.name;
  },

  getHealth: function () {
    return this.health;
  },

  setHealth: function (newHealth) {
    if (newHealth < 0) {
      newHealth = 0;
    }

    this.health = newHealth;
  },

}

function Hero(name, secretIdentity, health) {
  LivingThing.call(this, name, health);

  this.identity = secretIdentity;
}

Hero.prototype = Object.create(LivingThing.prototype)
Hero.prototype.constructor = Hero

Hero.prototype.getSecretIdentity = function () {
  return "You won't make me reveal my true identity!"
}

Hero.prototype.attack = function (monster) {
  const damageToHero = getRandomInt(0, 10);
  const damageToLivingThing = getRandomInt(0, 10);

  this.setHealth(this.getHealth() - damageToHero);
  monster.setHealth(monster.getHealth() - damageToLivingThing);

  console.log(this.getName() + "'s health (" + this.getHealth() + ") reduced by: " + damageToHero);
  console.log(monster.getName() + "'s health (" + monster.getHealth() + ") reduced by: " + damageToLivingThing);
}

Hero.prototype.fight = function (monsters) {
  for (let livingThing of monsters) {

    while (this.isAlive() && livingThing.isAlive()) {
      this.attack(livingThing)
    }

    if (!this.isAlive()) {
      break;
    }
  }
}


// The code below should work when you are done
const ratSupremacist = new Monster("Intelligent Rat (Racist)", "lab-experiment gone awry", 5);
const lawsuitWaitingToHappen = new Monster("Sentient Boiling Hot Spilled Coffee", "construct", 5);
const gheklekTheWereRainbow = new Monster("Semi-Iridescent Goblin", "fantastical creature", 30);
const jennifer = new Monster("Misunderstood Ogre (Former Cast Member of 'One Tree Hill') Acting in Self-Defense and Sheer Bewilderment", "fantastical creature", 80);
const monsters = [ratSupremacist, lawsuitWaitingToHappen, gheklekTheWereRainbow, jennifer];
const superhero1 = new Hero("Superman", "Clark Kent", 110);

console.log("A hero emerges!");
console.log("The noble " + superhero1.name + " has vowed to defeat the monsters and save the realm");
console.log("Will they be victorious?");

superhero1.fight(monsters);

if (superhero1.isAlive) {
  console.log("The hero, " + superhero1.name + ", prevailed!");
} 
else {
  console.log(superhero1.name + " was bested by the monsters and when unmasked was discovered to be " + superhero1.secretIdentity + "!");
}




