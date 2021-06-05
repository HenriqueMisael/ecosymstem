/**
 * A hut is a place where Syms can sleep, breed and protect itself
 * @typedef {GameObject} Hut
 * @property {'red' | 'blue' | 'green'} color
 * @property {number} level
 * @property {number} _food
 *
 * @property {function():number} size
 * @property {function(timeOfDay:number):Sym[]} update
 * @property {function(newcomers:Sym[]):void} openFor
 * @property {function(foodToStore:number):number} store
 */
/**
 * @param {'red' | 'blue' | 'green'} color
 * @param {number} level
 * @param {?{x:number, y:number}} [position]
 * @param {Sym[]} [population]
 * @constructor
 */
function Hut(color, level, position = null, population = []) {
  GameObject.call(this, position)
  this.color = color;
  this.level = level;
  this.population = population;

  this.population.forEach(sym => {
    sym.home = this;
  })
}

Hut.prototype = Object.create(GameObject);

/**
 * @returns {number} size of hut
 */
Hut.prototype.size = function () {
  return 64 * (0.8 + this.level / 10);
}

/**
 * @params {number} timeOfDay
 * @returns {Sym[]} Syms that have exited the hut
 */
Hut.prototype.update = function (timeOfDay) {
  if (timeOfDay >= 6 && timeOfDay < 18) {
    const foragers = this.population.splice(0);
    foragers.forEach(forager => forager.position = this.position.copy())
    return foragers
  }
  return [];
}

/**
 * @params {Sym[]} newcomers - Syms that have entered the Hut
 */
Hut.prototype.openFor = function (newcomers) {
  this.population.push(...newcomers);
}


/**
 * @params {number} foodToStore - food to be stored in the Hut
 */
Hut.prototype.store = function (foodToStore) {
  this._food += foodToStore;
  return foodToStore;
}
