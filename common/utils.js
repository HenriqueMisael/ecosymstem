function range(value) {
  return [...new Array(value).keys()]
}

function generateName() {
  const names = data.names;
  const index = Math.floor(Math.random() * names.length);
  return names[index];
}
