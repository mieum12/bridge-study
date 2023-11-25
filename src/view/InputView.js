import {Console} from "@woowacourse/mission-utils";
import {InputValidator} from "./InputValidator";
import {MESSAGE} from "../constants/constants";

/**
 * 사용자로부터 입력을 받는 역할을 한다.
 */
const InputView = {
  /**
   * 1. 다리의 길이를 입력받는다.
   */
  async readBridgeSize() {
    const input = await Console.readLineAsync(MESSAGE.bridge_size);

    try {
      // 검증
      InputValidator.validateBridgeSizeInput(input);
      // 숫자로 변환해서 리턴
      return Number(input);
      // return input;
    } catch (error) {
      // 예외 발생 시 에러 처리
      Console.print(`${error.message}`);
      return this.readBridgeSize();
    }
  },

  /**
   * 2. 사용자가 이동할 칸을 입력받는다.
   */
  async readMoving() {
    const input = await Console.readLineAsync(MESSAGE.moving);
    try {
      // 검증
      InputValidator.validateMovingInput(input);
      return input;
    } catch (error) {
      // 예외 발생 시 에러 처리
      Console.print(`${error.message}`);
      return this.readMoving();
    }
  },

  /**
   * 3. 사용자가 게임을 다시 시도할지 종료할지 여부를 입력받는다.
   */
  async readGameCommand() {
    const input = await Console.readLineAsync(MESSAGE.game_command);
    try {
      // 검증
      InputValidator.validateGameCommandInput(input);
      return input;
    } catch (error) {
      // 예외 발생 시 에러 처리
      Console.print(`${error.message}`);
      return this.readGameCommand();
    }
  },
};

export default InputView;
