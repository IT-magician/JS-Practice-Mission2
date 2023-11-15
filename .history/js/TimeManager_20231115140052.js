class TimeManager {
  pungs = [];

  static #checkInterval = 500; // 500ms

  static #baseLeftTime = 0;
  static #isAllStop = false;

  static #uuid = 1;

  static #GenerateUUID() {
    return this.#uuid++;
  }

  /// ________________________________________________________________________
  //                            외부 호출 메소드 API
  /// ________________________________________________________________________
  static Create(name, value) {
    let timerInfo = {
      name,
      uuid: this.#GenerateUUID(),
      value,
      timer: null,
      isStop: false,
    };

    new Promise((resolve, reject) => {
      // 시간 카운트 다운 설정
      timerInfo.timer = setInterval(() => {
        if (this.#isAllStop || timerInfo.isStop) return;

        if (this.#baseLeftTime <= 0)
          timerInfo.value = Math.max(0, timerInfo.value - this.#checkInterval);

        if (this.#baseLeftTime + timerInfo.value === 0) {
          clearInterval(timerInfo.timer);
          timerInfo.timer = null;

          resolve();
        }
      }, this.#checkInterval).then((resolve, reject) => {
        // 종료 작업
      });
    });
  }

  static Reset() {}

  static multiplerIncrease() {}

  multiplerIncrease() {}

  static Stop() {}
  Stop() {}

  static Start() {}
  Start() {}

  Increase(value = 5) {}

  Cancel() {}
}

export { TimeManager };
