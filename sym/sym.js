/**
 * Simulated being that have genes that describe its appearance, capacities and behaviour
 *
 * @typedef {GameObject} Sym
 * @property {Genetics} genetics
 * @property {?Hut} home
 * @property {?Bush} _target
 * @property {number} _food
 *
 * @property {function(Sym):Sym} breed
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

  this._target = null;
  this._food = 0;
}

Sym.prototype.__proto__ = GameObject.prototype;

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
  return this._food >= this.size();
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
 *
 * @param {number} timeOfDay
 * @param {Bush[]} bushes - bushes it at line of sight
 *
 * @returns {boolean} if it exited the map
 */
Sym.prototype.update = function (timeOfDay, bushes) {
  console.log(typeof this._target)
  if (this._target) {
    if (this._target instanceof Bush && this._target.food() <= 0) {
      this._target = null;
    } else {
      const target = this._target.position.copy()
      const distance = target.dist(this.position);
      if (distance <= 1) {
        this._food += this._target.collect();
        if (this.isAtCarryLimit()) {
          this._target = this.home;
        }
      } else {
        target.sub(this.position)
        target.normalize()
        target.mult(this.speed())
        this.position.add(target);
      }
    }
  } else {
    const nearestBush = bushes.reduce((acc, bush) => {
      const food = bush.food();
      if (food <= 0) return acc;
      const distance = this.position.dist(bush.position);
      if (distance < (acc?.distance ?? Number.POSITIVE_INFINITY)) return {distance, bush};
      return acc;
    }, null)?.bush
    if (nearestBush) this._target = nearestBush;
  }

  if (timeOfDay < 18) return false;

  this.home.openFor([this]);
  return true;
}
