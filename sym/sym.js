/**
 * Simulated being that have genes that describe its appearance, capacities and behaviour
 *
 * @typedef Sym
 * @property {Genetics} genetics
 * @property {?{x: number, y:number}} position
 *
 * @property {function(Sym):Sym} breed
 */
/**
 * @param {object} [options]
 * @param {{x: number, y:number}} [options.position]
 * @param {Genetics} [options.genetics]
 *
 * @constructor
 */
function Sym(options = {}) {
  this.genetics = options.genetics ?? new Genetics();
  this.position = options.position ?? null;
}

Sym.prototype.color = function () {
  if (!this._color) {
    const [r, g, b] = this.genetics.getColorPhenotypes();
    this._color = color(r, g, b);
  }
  return this._color;
}

Sym.prototype.size = function () {
  if (!this._size) {
    this._size = this.genetics.getSizePhenotypes()
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
  return new Sym({genetics: this.genetics.crossover(other.genetics)});
}
