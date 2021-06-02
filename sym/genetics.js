/**
 * Responsible for holding the description of a Sym
 * @typedef Genetics
 * @property {number[]} chain
 *
 * @property {function():[number, number, number]} getColorPhenotypes
 * @property {function():number} getSizePhenotypes
 * @property {function(Genetics):Genetics} crossover
 */
/**
 * @param {number[]} [chain]
 * @constructs Genetics
 */
function Genetics(chain) {
  this.chain = chain ?? [...Array(9)].map(() => Math.random());
}

Genetics.prototype.getColorPhenotypes = function () {
  const r = Math.floor(Number(this.chain.slice(0, 2).reduce((acc, v) => acc * v, 255)));
  const g = Math.floor(Number(this.chain.slice(2, 4).reduce((acc, v) => acc * v, 255)));
  const b = Math.floor(Number(this.chain.slice(4, 6).reduce((acc, v) => acc * v, 255)));

  return [r, g, b]
}

Genetics.prototype.getSizePhenotypes = function () {
  const base = 16;
  const [sub0, sub1, sub2, sub3] = this.chain.slice(6, 10);
  return Math.floor(base * 5 - sub0 * base - sub1 * base - sub2 * base - sub3 * base);
}

Genetics.prototype.crossover = function (other) {
  const chain = this.chain.map((firstGene, i) => {
    const option = Math.random();
    const mutate = option <= 0.1;
    if (mutate) return Math.random();

    const mix = option <= 0.5;
    const secondGene = other.chain[i];
    if (mix) return (firstGene + secondGene) / 2;

    return i % 2 ? firstGene : secondGene;
  });
  return new Genetics(chain)
}
