import {Console} from "@woowacourse/mission-utils";
import {GAME, MESSAGE} from "../constants/constants";

/**
 * 사용자에게 게임 진행 상황과 결과를 출력하는 역할을 한다.
 */
const OutputView = {
  printStart() {
    Console.print(MESSAGE.start);
  },
  /**
   * 현재까지 이동한 다리의 상태를 정해진 형식에 맞춰 출력한다.
   * <p>
   * 출력을 위해 필요한 메서드의 인자(parameter)는 자유롭게 추가하거나 변경할 수 있다.
   */
  printMap(bridgeMap) {
    // 위!!  [ " ", " ", " ", "O" ]
    // 아래!! [ "O", "O", "O", " " ]
    // 배열의 원소를 ' | ' 으로 join해서 새로운 배열  [ O |   ] 생성
    const formatUpBridge = `[ ${bridgeMap.up.join(GAME.divider)} ]`;
    const formatDownBridge = `[ ${bridgeMap.down.join(GAME.divider)} ]`;
    Console.print(`${formatUpBridge}\n${formatDownBridge}`);
  },

  /**
   * 게임의 최종 결과를 정해진 형식에 맞춰 출력한다.
   * <p>
   * 출력을 위해 필요한 메서드의 인자(parameter)는 자유롭게 추가하거나 변경할 수 있다.
   */
  printResult(result) {
    Console.print(`${MESSAGE.result_map}`); // 최종게임 결과
    OutputView.printMap(result.map);
    Console.print(`${MESSAGE.result_state} ${result.gameState}`); // 게임 성공 여부: 성공
    Console.print(`${MESSAGE.total_trial} ${result.totalTrial}`); // 총 시도한 횟수: 2
  },
};

export default OutputView;
