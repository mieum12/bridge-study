import BridgeMaker from "../BridgeMaker";
import BridgeRandomNumberGenerator from "../BridgeRandomNumberGenerator";
import BridgeGame from "../domain/BridgeGame";
import InputView from "../view/InputView";
import OutputView from "../view/OutputView";
import { GAME } from "../constants/constants.js";

export class Controller {
  async start() {
    // 1. 게임 시작 (정답다리 생성)
    const bridgeGame = await this.setUpGame();
    // 2. 본 게임 (재도전이면 여기서부터 시작!)
    const result = await this.play(bridgeGame);
    // 3. 종료 시 최종 결과 출력
    OutputView.printResult(result);
  }

  /**
   *
   * @return {Promise<BridgeGame>}
   * @description 다리 길이 입력을 받고 정답 다리 생성
   */
  async setUpGame() {
    OutputView.printStart();
    const bridgeSize = await InputView.readBridgeSize();
    const answerBridge = BridgeMaker.makeBridge(
      bridgeSize,
      BridgeRandomNumberGenerator.generate,
    );
    console.log(answerBridge);
    return new BridgeGame(answerBridge);
  }

  // 게임 한 라운드 : 게임 라운드를 진행
  async play(game) {
    // 게임의 상태가 '다음'이라면 계속 진행
    for (let i = 0; i < game.answerBridge.length; i++) {
      // 2. 진행중..
      if (game.gameState === GAME.progress) {
        console.log(i + 1, "번째 loop ♻️");
        const moving = await InputView.readMoving();
        game.move(moving, game.answerBridge[i]); // 입력값 전달
        OutputView.printMap(game.makeBridgeArray());
      }

      // 3. 실패 -> 재시작 여부 묻기
      if (game.gameState === GAME.fail) {
        return await this.retry(game);
      }
    }
    // 다 돌고 나온 상태 = 성공
    // TODO
    game.gameSuccess();
    return game.getResult();
  }

  /**
   *
   * @param {BridgeGame}game
   * @return {Promise<GameResult|*>}
   */
  async retry(game) {
    const gameCommand = await InputView.readGameCommand();
    game.retry(game, gameCommand);
    // 재시도
    if (game.getResult().gameState === GAME.progress) {
      // 다리 map 초기화 작업 필요
      game.init(game.answerBridge);
      return await this.play(game);
    }
    if (game.getResult().gameState === GAME.fail) {
      return game.getResult();
    }
  }
}
