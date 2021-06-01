/**
 * Select the gene of the first parent
 * @param {Sym} parent0
 * @param {Sym} parent1
 * @param {number} i
 * @returns {number}
 */
function getFirstParentGeneSelector(parent0, parent1, i) {
  return parent0.genes[i];
}

/**
 * Select the gene of the second parent
 * @param {Sym} parent0
 * @param {Sym} parent1
 * @param {number} i
 * @returns {number}
 */
function getSecondParentGeneSelector(parent0, parent1, i) {
  return parent1.genes[i];
}

/**
 * Mix it up both the genes of the first and second parents
 * @param {Sym} parent0
 * @param {Sym} parent1
 * @param {number} i
 * @returns {number}
 */
function getMixedGeneSelector(parent0, parent1, i) {
  return (parent0.genes[i] + parent1.genes[i]) / 2;
}

/**
 * Mix it up both the genes of the first and second parents
 * @returns {number}
 */
function getRandomGene() {
  return Math.random();
}

const geneSelectors = [
  getFirstParentGeneSelector,
  getFirstParentGeneSelector,
  getSecondParentGeneSelector,
  getSecondParentGeneSelector,
  getMixedGeneSelector,
  getMixedGeneSelector,
  getMixedGeneSelector,
  getMixedGeneSelector,
  getMixedGeneSelector,
  getRandomGene
]

function generateRandomGenes() {
  return [...Array(9)].map(() => getRandomGene())
}

/**
 * Simulated being that have genes that describe its appearance, capacities and behaviour
 *
 * @typedef Sym
 * @property {number[]} genes
 * @property {?{x: number, y:number}} position
 *
 * @property {function(Sym):Sym} breed
 */
/**
 * @param {object} [options]
 * @param {{x: number, y:number}} [options.position]
 * @param {number[]} [options.genes]
 *
 * @constructor
 */
function Sym(options = {}) {
  this.genes = options.genes ?? generateRandomGenes();
  this.position = options.position ?? null;
}

Sym.prototype.color = function () {
  if (!this._color) {
    const r = Math.floor(Number(this.genes.slice(0, 2).reduce((acc, v) => acc * v, 255)));
    const g = Math.floor(Number(this.genes.slice(2, 4).reduce((acc, v) => acc * v, 255)));
    const b = Math.floor(Number(this.genes.slice(4, 6).reduce((acc, v) => acc * v, 255)));
    this._color = color(r, g, b);
  }
  return this._color;
}

Sym.prototype.size = function () {
  if (!this._size) {
    const base = 16;
    this._size = Math.floor(Number(this.genes.slice(6, 10).reduce((acc, v) => acc - v * base, base * 5)))
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
  /**
   * @type {number[]}
   */
  const genes = this.genes.map((g, i) => {
    const selectedIndex = Math.floor(Math.random() * geneSelectors.length);
    const geneSelector = geneSelectors[selectedIndex];
    return geneSelector(this, other, i);
  })
  return new Sym({genes});
}

/**
 * Create a new Sym with the same genes
 */
Sym.prototype.copy = function () {
  const {genes, position} = this;
  return new Sym({genes, position});
}
