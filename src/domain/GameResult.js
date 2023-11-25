class GameResult {
  #gameState;
  #map;
  #totalTrial;

  constructor(gameState, map, totalTrial) {
    this.#gameState = gameState;
    this.#map = map;
    this.#totalTrial = totalTrial;
  }

  get gameState() {
    return this.#gameState;
  }

  get map() {
    return this.#map;
  }

  get totalTrial() {
    return this.#totalTrial;
  }
}

export default GameResult;
