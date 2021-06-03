const resources = {}

/**
 * @type {Hut[]}
 */
const huts = []
/**
 * @type {Bush[]}
 */
const bushes = []

function preload() {
  ['red', 'green', 'blue'].forEach(color => {
    resources[`hut-${color}`] = loadImage(`assets/hut/${color}.svg`);
  });
  range(11).forEach((i) => {
    resources[`bush-${i}`] = loadImage(`assets/bush/${i}.svg`);
  })
  resources['sym'] = loadImage("assets/sym.svg");
}

function randomPosition() {
  const x = (Math.random() - 0.5) * width;
  const y = (Math.random() - 0.5) * height;
  return createVector(x, y);
}

function setup() {
  frameRate(60)
  createCanvas(1280, 720, WEBGL);

  huts.push(new Hut('red', 1, randomPosition()))
  range(10).forEach(() => {
    bushes.push(new Bush(0.5 + Math.random(), Math.random(), randomPosition()))
  })
}

const dayDuration = 2048
let timeElapsed = 0

function draw() {
  timeElapsed += deltaTime;
  const daysPast = Math.floor(timeElapsed / dayDuration);

  background(220)

  imageMode(CENTER);
  huts.forEach(hut => {
    const {x, y} = hut.position
    let color = hut.color;
    let size = hut.size();
    image(resources[`hut-${color}`], x, y - size / 2, size, size)
  })
  bushes.forEach((bush, i) => {
    if (!bush.grow(daysPast)) {
      bushes.splice(i, 1)
      return;
    }

    const size = 24;
    const {y, x} = bush.position;
    const foodAmount = bush.food();
    console.log(foodAmount)
    image(resources[`bush-${foodAmount}`], x, y - size / 2, size, size)
  })

  if (daysPast > 0) timeElapsed -= dayDuration * daysPast;
}
