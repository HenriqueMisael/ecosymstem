/**
 * Simulated being that have genes that describe its appearance, capacities and behaviour
 *
 * @typedef {GameObject} Sym
 * @property {Genetics} genetics
 * @property {?Hut} home
 * @property {string} fullname
 * @property {?GameObject} _target
 * @property {number} _food
 *
 * @property {function(Sym):Sym} breed
 * @property {function(GameObject):void} moveTowards
 * @property {function():GameObject} findTarget
 * @property {function(timeOfDay:number):boolean} update
 * @property {function():boolean} arrivedAtTarget
 */
/**
 * @param {{x: number, y:number}} [position]
 * @param {Hut} [home]
 * @param {Genetics} [genetics]
 *
 * @constructor
 */
function Sym(genetics, home, position) {
  GameObject.call(this, position);
  this.genetics = genetics ?? new Genetics();
  this.home = home ?? null;
  this.fullname = generateName();

  this._target = null;
  this._food = 0;
}

Sym.prototype = Object.create(GameObject);

/**
 * @returns {number} size of Sym
 */
Sym.prototype.size = function () {
  if (!this._size) {
    this._size = this.genetics.getSizePhenotypes() * 2
  }
  return this._size;
}

/**
 * @returns {number} speed of Sym
 */
Sym.prototype.speed = function () {
  if (!this._speed) {
    this._speed = this.genetics.getSpeedPhenotypes()
  }
  return this._speed;
}

/**
 * @returns {boolean} if the Sym is currently carrying too much
 */
Sym.prototype.isAtCarryLimit = function () {
  return this._food >= Math.floor(this.size() / 2);
}

/**
 * Breed this Sym with another Sym received by argument mixing their genes for generating
 * a new Sym
 *
 * @param {Sym} other
 */
Sym.prototype.breed = function (other) {
  return new Sym(this.genetics.crossover(other.genetics));
}

/**
 * Find a target to go towards based on decision making process
 */
Sym.prototype.findTarget = function () {
  return bushes.reduce((acc, bush) => {
    const food = bush.food();
    if (food <= 0) return acc;
    const distance = this.position.dist(bush.position);
    if (distance < (acc?.distance ?? Number.POSITIVE_INFINITY)) return {
      distance,
      bush
    };
    return acc;
  }, null)?.bush ?? this.home
}

/**
 * @returns {boolean} if the Sym arrived at current target. If there is not target, false
 */
Sym.prototype.arrivedAtTarget = function () {
  if (!this._target) return false;
  return this._target.position.dist(this.position) <= 1
}

/**
 *
 * @param {number} timeOfDay
 * @param {Bush[]} bushes - bushes it at line of sight
 *
 * @returns {boolean} if it exited the map
 */
Sym.prototype.update = function (timeOfDay, bushes) {
  if (timeOfDay > 18) this._target = this.home;
  if (this._target instanceof Bush && this._target.food() <= 0) {
    this._target = null;
  }

  if (!this._target) this._target = this.findTarget()

  if (!this.arrivedAtTarget()) {
    this.moveTowards(this._target)
  } else {
    if (this._target instanceof Bush) {
      this._food += this._target.collect();
      if (this.isAtCarryLimit()) {
        this._target = this.home;
      }
    } else if (this._target === this.home) {
      this._food -= this.home.store(this._food, this);
      this._target = null;
      if (timeOfDay > 18) {
        this.home.openFor([this]);
        return true;
      }
    }
  }
  return false;
}

/**
 * Move towards another game object
 * @param {GameObject} gameObject
 */
Sym.prototype.moveTowards = function (gameObject) {
  GameObject.prototype.moveTowardsAtSpeed.call(this, gameObject, this.speed())
}
