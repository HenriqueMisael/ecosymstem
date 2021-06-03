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
  this.chain = chain ?? range(4).map(() => Math.random());
}

Genetics.prototype.getSizePhenotypes = function () {
  const [add0, add1, sub0, sub1] = this.chain.slice(0, 4);
  return Math.floor(16 + add0 + add1 - sub0 - sub1);
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
