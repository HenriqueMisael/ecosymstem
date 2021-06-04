/**
 * Type of vegetation that grows food
 * @typedef {GameObject} Bush
 * @property {number} production - amount of food it have produced
 * @property {number} growingRate - amount of food it generates every day
 * @property {number} depletingRate - amount of food it generates every day
 * @property {?{x: number, y:number}} position
 *
 * @property {function():number} food
 * @property {function(number):void} grow
 */
/**
 * @param {number} [growingRate]
 * @param {number} [depletingRate]
 * @param {?{x: number, y:number}} [position]
 * @constructor
 */
function Bush(growingRate = 1, depletingRate = 0.5, position = null) {
  GameObject.call(this, position)
  this.growingRate = growingRate;
  this.depletingRate = depletingRate;
  this.production = 0;
  this.maxProduction = 10;
}

/**
 * @returns {number} amount of food it haves for collecting
 */
Bush.prototype.food = function () {
  return Math.floor(this.production)
}

/**
 * Produces and depletes production at the standard rate
 * @param {number} daysPast - amount of days past since last growth
 * @returns {boolean} if the bush is still alive
 */
Bush.prototype.grow = function (daysPast) {
  if (this.production === this.maxProduction) return true;

  this.production += Math.max(daysPast * (this.growingRate - this.depletingRate), this.maxProduction)
  return this.production >= 0;
}
