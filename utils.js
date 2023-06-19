// Utility functions

export function getRandomItemFromArray(array) {
  const randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
}

export function getRandomNumberInRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function calculateDistance(x1, y1, x2, y2) {
  const xDistance = x2 - x1;
  const yDistance = y2 - y1;
  return Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2));
}

export function detectCollision(obj1, obj2) {
  const distance = calculateDistance(obj1.x, obj1.y, obj2.x, obj2.y);
  return distance <= obj1.radius + obj2.radius;
}
