/**
 * A hut is a place where Syms can sleep, breed and protect itself
 * @typedef Hut
 * @property color
 * @property {number} level
 * @property {?{x:number, y:number}} position
 *
 * @property {function():number} size
 */
/**
 * @param {'red' | 'blue' | 'green'} color
 * @param {number} level
 * @param {?{x:number, y:number}} [position]
 * @constructor
 */
function Hut(color, level, position = null) {
  this.color = color;
  this.level = level;
  this.position = position
}

/**
 * @returns {number} size of hut
 */
Hut.prototype.size = function () {
  return 64 * (0.8 + this.level / 10);
}
