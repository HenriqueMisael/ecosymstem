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
 */
/**
 * @param position
 * @constructor
 */
function GameObject(position) {
  this.position = position;
}
