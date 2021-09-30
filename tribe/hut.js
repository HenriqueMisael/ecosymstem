/**
 * A hut is a place where Syms can sleep, breed and protect itself
 * @typedef {GameObject} Hut
 * @property {'red' | 'blue' | 'green'} color
 * @property {number} level
 * @property {Sym[]} population
 * @property {Map<string,number>} _store
 * @property {boolean} _breedingFeastOccurred
 *
 * @property {function():number} size
 * @property {function(timeOfDay:number):Sym[]} update
 * @property {function(newcomers:Sym[]):void} openFor
 * @property {function(foodToStore:number, forager:Sym):number} store
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

  this._store = new Map()
}

Hut.prototype = Object.create(GameObject);

/**
 * @return {number} size of hut
 */
Hut.prototype.size = function () {
  return 64 * (0.8 + this.level / 10);
}

/**
 * @param {number} timeOfDay
 * @return {Sym[]} Syms that have exited the hut
 */
Hut.prototype.update = function (timeOfDay) {
  const isDaytime = timeOfDay >= 6 && timeOfDay < 18;
  if (isDaytime) {
    this._breedingFeastOccurred = false;
    const foragers = this.population.splice(0);
    foragers.forEach(forager => {
      forager.position = this.position.copy();
    })
    return foragers
  } else if (timeOfDay > 18 && !this._breedingFeastOccurred) {
    this._breedingFeastOccurred = true;
    const entries = Array.from(this._store.entries());
    entries.sort((a, b) => b[1] - a[1])
    console.log(entries.map(a => a[1]))
  }
  return [];
}

/**
 * @param {Sym[]} newcomers - Syms that have entered the Hut
 */
Hut.prototype.openFor = function (newcomers) {
  this.population.push(...newcomers);
}

/**
 * @param {number} foodToStore - food to be stored in the Hut
 * @param {Sym} forager - Sym who is trying to store food in the Hut
 */
Hut.prototype.store = function (foodToStore, forager) {

  const stored = this._store.get(forager.fullname) ?? 0
  this._store.set(forager.fullname, stored + foodToStore)

  return foodToStore;
}

/**
 * @returns {number} - the total amount of food stored in the Hut
 */
Hut.prototype.food = function () {
  return Array.from(this._store.values()).reduce((acc, food) => acc + food, 0)
}
