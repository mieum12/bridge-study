/**
 * 다리의 길이를 입력 받아서 다리를 생성해주는 역할을 한다.
 * 🚨 경로 변경 불가!
 * 🚨 프로퍼티를 추가할 수 없다.
 * 🚨 메서드의 시그니처(인자, 이름)와 반환 타입은 변경할 수 없다.
 *
 * 다리 칸을 생성하기 위한 Random 값은 아래와 같이 추출한다.
 * const number = generateRandomNumber();
 */
const BridgeMaker = {
  /**
   * @param {number} size 다리의 길이
   * @param {function(): number} generateRandomNumber 무작위 값을 생성해주는 함수
   * @return {string[]} 입력받은 길이에 해당하는 다리 모양. 위 칸이면 U, 아래 칸이면 D로 표현해야 한다.
   *
   *  ['U', 'D', 'U']  이런 형태로 리턴?
   */
  makeBridge(size, generateRandomNumber) {
    // size로 받아 온 수 만큼 랜덤 번호를 생성해주는 함수를 돌려 반환한 값(0 또는 1)을 받아온다
    const randomArr = [];
    for (let i = 0; i < size; i++) {
      const randomNumber = generateRandomNumber();
      randomArr.push(randomNumber); //배열에 랜덤값 추가
    }
    // 새로운 배열 리턴 [0, 1, 0] -> ['U', 'D', 'U']
    return randomArr.map((el) => (el === 0 ? "U" : "D"));
  },
};

export default BridgeMaker;
