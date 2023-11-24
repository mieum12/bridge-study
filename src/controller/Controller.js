import BridgeMaker from "../BridgeMaker";
import BridgeRandomNumberGenerator from "../BridgeRandomNumberGenerator";
import BridgeGame from "../domain/BridgeGame";
import BridgeMap from "../domain/BridgeMap";
import InputView from "../view/InputView";
import OutputView from "../view/OutputView";
import {GAME} from "../constants/constants.js";

export class Controller {
  async start() {


    // 본 게임(재도전이면 여기서부터 시작!)
    await this.play(bridgeSize, answerBridge);

    // 종료 시 최종 결과 출력
    OutputView.printResult();
  }

  async setUpGame(){
    OutputView.printStart();
    // 다리 길이 입력을 받고 정답 다리 생성
    const bridgeSize = await InputView.readBridgeSize();
    const answerBridge = BridgeMaker.makeBridge(
      bridgeSize,
      BridgeRandomNumberGenerator.generate
    );
    console.log(answerBridge);
  }

  //게임 한 라운드 : 게임 라운드를 진행하는 재귀함수
  async play(gameRound, answerBridge) {
    const resultArray = [];

    // 라운드 횟수(=bridgeSize)가 0이 되면 종료
    if (gameRound === 0) {
      console.log("성공적으로 끝!!!!!!!!!!!!!!");
      return
    }

    //정답 다리의 인덱스를 0부터 하나씩 올려서 비교
    for (let i = 0; i < answerBridge.length; i++) {
      // 1. 이동경로 입력받기
      const moving = await InputView.readMoving();
      // 2. 정답과 비교
      const result = new BridgeGame().move(answerBridge[i], moving); //이동가능한입력값 혹은 '어쩌구X' 로 반환
      resultArray.push(result); //['U', 'D', 'UX']
      // 3. 결과 배열(resultArray)을 전달해 현재 라운드 다리 모양 객체 {위,아래} 만들기
      const bridgeMap = new BridgeMap().makeBridgeMap(resultArray);
      // 만든 다리모양 출력
      OutputView.printMap(bridgeMap);
      gameRound -= 1;
      //이동 실패 시
      if(resultArray.includes('UX') || resultArray.includes('DX')){
        console.log("이동 실패로 재시작 여부 물어보기");
        await this.retry(bridgeMap)
        return
      }
      }
    // 라운드 수 줄이기 : 3->2->1->0이면 게임 종료,
    await this.play(gameRound, answerBridge);
  }

  async retry(bridgeMap){
    let totalTrial = 1
    const gameCommand = await InputView.readGameCommand()
    if (gameCommand === GAME.retry) {
      new BridgeGame().retry()
      totalTrial ++
    }
    if (gameCommand === GAME.quit){
      OutputView.printResult(bridgeMap,GAME.fail, totalTrial)
    }
  }
}
