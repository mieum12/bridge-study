import { GAME } from "../constants/constants";

/**
 * 다리 건너기 게임을 관리하는 클래스
 * 🚨BridgeGame 클래스에서 InputView, OutputView 를 사용하지 않는다. = 비즈니스로직?
 * 🚨메서드의 이름은 변경할 수 없다.
 */
class BridgeGame {
  /**
   * 사용자가 칸을 이동할 때 사용하는 메서드
   * <p>
   * 이동을 위해 필요한 메서드의 반환 값(return value), 인자(parameter)는 자유롭게 추가하거나 변경할 수 있다.
   */
  move(answer, moving) {
    // 입력값이 정답과 같으면 입력값 반환, 다르면 UX, DX 반환
    if (moving === answer) {
      return moving;
    }
    return moving + GAME.move_fail;
  }

  /**
   * 사용자가 게임을 다시 시도할 때 사용하는 메서드
   * <p>
   * 재시작을 위해 필요한 메서드의 반환 값(return value), 인자(parameter)는 자유롭게 추가하거나 변경할 수 있다.
   */
  retry( ) {
    console.log('R 눌렀으니까 다시 시작해볼게!!!')
      //게임 재시작
      this.move();
  }
}

export default BridgeGame;
