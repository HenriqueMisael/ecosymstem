/**
 * @typedef Vector2
 * @property {number} x
 * @property {number} y
 *
 * @property {function(Vector2):number} dist
 */

/**
 * @typedef GameObject
 * @property {Vector2} position
 *
 * @property {function(gameObject:GameObject):void} moveTowardsAtSpeed
 */
/**
 * @param position
 * @constructor
 */
function GameObject(position) {
  this.position = position;
}

/**
 * Move towards another game object
 * @param {GameObject} gameObject
 * @param {number} speed
 */
GameObject.prototype.moveTowardsAtSpeed = function (gameObject, speed) {
  const target = gameObject.position.copy();
  const distance = target.dist(this.position);
  target.sub(this.position);
  target.normalize();
  target.mult(Math.min(speed * deltaTime * gameSpeed()/64, distance));
  this.position.add(target);
}
