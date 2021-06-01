let populationSize = 32
let population = []

const RED_BIG = [1, 1, 0, 0, 0, 0, 0, 0, 0, 0]
const RED_MEDIUM = [1, 1, 0, 0, 0, 0, 1, 1, 0, 0]
const RED_STANDARD = [1, 1, 0, 0, 0, 0, 1, 1, 1, 0]
const RED_SMALL = [1, 1, 0, 0, 0, 0, 1, 1, 1, 1]

const GREEN_BIG = [0, 0, 1, 1, 0, 0, 0, 0, 0, 0]
const GREEN_MEDIUM = [0, 0, 1, 1, 0, 0, 1, 1, 0, 0]
const GREEN_STANDARD = [0, 0, 1, 1, 0, 0, 1, 1, 1, 0]
const GREEN_SMALL = [0, 0, 1, 1, 0, 0, 1, 1, 1, 1]

const BLUE_BIG = [0, 0, 0, 0, 1, 1, 0, 0, 0, 0]
const BLUE_MEDIUM = [0, 0, 0, 0, 1, 1, 1, 1, 0, 0]
const BLUE_STANDARD = [0, 0, 0, 0, 1, 1, 1, 1, 1, 0]
const BLUE_SMALL = [0, 0, 0, 0, 1, 1, 1, 1, 1, 1]

const genePool = [
  RED_BIG, RED_MEDIUM, RED_STANDARD, RED_SMALL,
  GREEN_BIG, GREEN_MEDIUM, GREEN_STANDARD, GREEN_SMALL,
  BLUE_BIG, BLUE_MEDIUM, BLUE_STANDARD, BLUE_SMALL
]

function setup() {
  createCanvas(1280, 720);
  let [top, left] = [128, 16]

  while (population.length < populationSize) {
    const randomIndex = Math.floor(Math.random() * genePool.length);
    const genes = genePool[randomIndex];
    const sym = new Sym({genes});
    if (left > width - sym.size()) {
      top += 128;
      left = 16 + sym.size() / 2;
    } else {
      left += sym.size() / 2;
    }
    sym.position = createVector(left, top);
    population.push(sym)
    left += sym.size() / 2 + 16
  }

  frameRate(1)
}

let timeElapsed = 0;

function draw() {
  timeElapsed += deltaTime;
  background(200);
  let first = population[0];
  for (let i = 0; i < population.length; i++) {
    const sym = population[i];
    stroke(sym.color());
    strokeWeight(sym.size());
    point(sym.position.x, sym.position.y)

    if (timeElapsed < 1000) break;
    const other = i + 1 === population.length ? first : population[i + 1]
    const child = sym.breed(other);
    const childX = (sym.position.x + other.position.x) / 2;
    const childY = (sym.position.y + other.position.y) / 2;
    child.position = createVector(childX, childY)
    population[i] = child
  }
  if (timeElapsed > 1000) timeElapsed -= 1000;

}
