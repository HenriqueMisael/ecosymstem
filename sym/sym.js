/**
 * Simulated being that have genes that describe its appearance, capacities and behaviour
 *
 * @typedef Sym
 * @property {Genetics} genetics
 * @property {?Hut} home
 * @property {?{x: number, y:number}} position
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
  this.genetics = genetics ?? new Genetics();
  this.home = home ?? null;
  this.position = position ?? null;
}

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
 * Breed this Sym with another Sym received by argument mixing their genes for generating
 * a new Sym
 *
 * @param {Sym} other
 */
Sym.prototype.breed = function (other) {
  return new Sym(this.genetics.crossover(other.genetics));
}

/**
 * @params {number} timeOfDay
 * @returns {boolean} if it exited the map
 */
Sym.prototype.update = function (timeOfDay) {
  if (timeOfDay < 18) return false;

  this.home.openFor([this]);
  return true;
}
