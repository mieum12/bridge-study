/**
 * 사용자 입력값의 포맷을 검증하는 클래스
 */
export class InputValidator {
  static validateBridgeSizeInput(input) {
    //숫자가 아닌 경우
    if (isNaN(Number(input))) {
      throw new Error("[ERROR] 숫자로 입력해주세요!!!");
    }
  }

  static validateMovingInput(input) {
    // 문자열이 아닌 경우
    if (typeof input !== "string") {
      throw new Error("[ERROR] 문자열이어야 합니다.");
    }
    // U,D가 아닌 경우
    if (input !== "U" && input !== "D") {
      throw new Error("[ERROR] 입력 값은 'U' 또는 'D'여야 합니다.");
    }
  }

  static validateGameCommandInput(input) {
    // 문자열이 아닌 경우
    if (typeof input !== "string") {
      throw new Error("[ERROR] 문자열이어야 합니다.");
    }
    // R,Q가 아닌 경우
    if (input !== "R" && input !== "Q") {
      throw new Error("[ERROR] 입력 값은 'R' 또는 'Q'여야 합니다.");
    }
  }
}
