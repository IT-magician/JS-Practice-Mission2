class TimeManager {
  pungs = [];

  static #checkInterval = 500; // 500ms

  /// ________________________________________________________________________
  //                            외부 호출 메소드 API
  /// ________________________________________________________________________
  static Create(name, value) {
    let timerInfo = {
      name,
      value,
      timer: null,
      isStop: false,
    };
  }

  static Reset() {}

  static multiplerIncrease() {}

  multiplerIncrease() {}

  static Stop() {}
  Stop() {}

  static Start() {}
  Start() {}

  Increase(value = 5) {}
}

export { TimeManager };
