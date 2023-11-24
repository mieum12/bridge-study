import {GAME} from "../constants/constants.js";

/**
 * @description 현재 다리의 상태를 만드는 클래스
 *
 *
 */
class BridgeMap {
  #upBridge;
  #downBridge;

  constructor(upBridge, downBridge) {
    this.#upBridge = upBridge;
    this.#downBridge = downBridge;
  }

  makeBridgeMap(resultArray) {
    //['U', 'D', 'UX'] 변환
    // upBridge,downBridge 따로 생각해야함
    this.makeUpBridge(resultArray);
    this.makeDownBridge(resultArray);
    return {
      up: this.#upBridge,
      down: this.#downBridge,
    };
  }

  makeUpBridge(resultArray) {
    this.#upBridge = resultArray.map((result) => {
      switch (result) {
        case GAME.up:
          return GAME.move_success;
        case GAME.down:
          return GAME.move_blank;
        case (GAME.up+GAME.move_fail):
          return GAME.move_fail;
        case (GAME.down+GAME.move_fail):
          return GAME.move_blank;
      }
    });
  }
  makeDownBridge(resultArray) {
    this.#downBridge = resultArray.map((result) => {
      switch (result) {
        case GAME.up:
          return GAME.move_blank;
        case GAME.down:
          return GAME.move_success;
        case (GAME.up+GAME.move_fail):
          return GAME.move_blank;
        case (GAME.down+GAME.move_fail):
          return GAME.move_fail;
      }
    });
  }
}

export default BridgeMap;
