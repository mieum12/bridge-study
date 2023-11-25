import {GAME} from "../constants/constants";
import BridgeMap from "./BridgeMap.js";
import GameResult from "./GameResult.js";

/**
 * 다리 건너기 게임을 관리하는 클래스
 * 🚨BridgeGame 클래스에서 InputView, OutputView 를 사용하지 않는다. = 비즈니스로직?
 * 🚨메서드의 이름은 변경할 수 없다.
 */
class BridgeGame {
  #answerBridge;
  #gameState;
  #resultArray;
  #totalTrial;

  /**
   *
   * @param answerBridge
   */
  constructor(answerBridge) {
    this.#answerBridge = answerBridge;
    this.#gameState = GAME.progress; //다음
    this.#resultArray = []; // ['U', ... ,'UX' ] 만든다
    this.#totalTrial = 1;
  }

  get answerBridge() {
    return this.#answerBridge;
  }

  get gameState() {
    return this.#gameState;
  }

  /**
   * 사용자가 칸을 이동할 때 사용하는 메서드
   * <p>
   * 이동을 위해 필요한 메서드의 반환 값(return value), 인자(parameter)는 자유롭게 추가하거나 변경할 수 있다.
   */
  /**
   *
   * @param {string} moving
   * @param {string} answer
   */
  move(moving, answer) {
    // 입력값이 정답과 같으면 입력값 반환, 다르면 실패를 알리고 UX, DX 반환(이건 프린트를 위해)
    if (moving === answer) {
      this.#gameState = GAME.progress;
      this.#resultArray.push(moving);
    }
    if (moving !== answer) {
      this.#gameState = GAME.fail;
      this.#resultArray.push(moving + GAME.move_fail);
      console.log("게임 상태는?", this.gameState);
    }
  }

  /**
   * 사용자가 게임을 다시 시도할 때 사용하는 메서드
   * <p>
   * 재시작을 위해 필요한 메서드의 반환 값(return value), 인자(parameter)는 자유롭게 추가하거나 변경할 수 있다.
   */
  retry(game, gameCommand) {
    // R 입력
    if (gameCommand === GAME.retry) {
      console.log("R을 입력함!!!!!");
      this.#totalTrial++;
      this.#gameState = GAME.progress;
    }
    //Q 입력
    if (gameCommand === GAME.quit) {
      console.log("Q을 입력함!!!!!");
      this.#gameState = GAME.fail;
      // Q로 종료 -> 끝내고, 결과 반환
    }
  }

  gameSuccess() {
    this.#gameState = GAME.success;
  }

  /**
   *
   * @return {BridgeMap}
   * @description 결과 배열을 map 만드는 BridgeMap클래스에 전달해서 현재 map을 받아온다
   */
  makeBridgeArray() {
    return new BridgeMap().makeCurrentBridgeMap(this.#resultArray);
  }

  getResult() {
    return new GameResult(
      this.#gameState,
      this.makeBridgeArray(),
      this.#totalTrial,
    );
  }
}

export default BridgeGame;
