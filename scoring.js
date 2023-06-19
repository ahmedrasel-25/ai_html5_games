// Calculate the score based on the number of bubbles popped
export function calculateScore(popCount) {
  return popCount * POINTS_PER_BUBBLE;
}

// Format the score with commas for readability
export function formatScore(score) {
  return score.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// Update the score element on the screen
export function updateScoreElement(scoreElement, score) {
  scoreElement.textContent = formatScore(score);
}
