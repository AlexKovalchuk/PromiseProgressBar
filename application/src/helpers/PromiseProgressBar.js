/**
 * Created by alex on 7/23/18.
 */

// класс с колбуков(функция с выводом полей обьекта)
// Главная функция : принимает массив промисов. Загоняем массив промисов в Map(),
//  устанавливаем поля обьекта в НОЛЬ
//  пробегаемся по промисам, утсанавливаем два колбека для резолв и реджект
// Колбек функция: принимает промис и проверяет или он не выполнен.
//  плюсует поля: выолнено ок или с ошибкой
//  выполняю колбек который дает обновленные данные
// Геттер функции для полей.

class PromiseProgressBar {
    constructor(collBackFunction) {
        this._totalCount = 0;
        this._doneSuccess = 0;
        this._doneError = 0;
        this._timeSpend = 0;
        this._totalTimeSpend = 0;
        this._timeForEachDonePromise = [];
        this._timeLeft = 0;
        this._promiseList = new Map();
        this._collback = collBackFunction;
        this._timeStart = 0;
        this._timeEnd = 0;
        this._percentDonePromises = 0;
        this._simpleMovingAverage = 0;
    }

  calculateSimpleMovingAverage() {
    let sum=0;
    let timeOfDonePromises = this._timeForEachDonePromise;
    let promiseCount = this._totalCount;
    if(promiseCount > timeOfDonePromises.length){
        promiseCount = timeOfDonePromises.length;
    }

    for(let i=timeOfDonePromises.length-promiseCount; i<timeOfDonePromises.length; i++){
        sum += timeOfDonePromises[i];
    }
      this._simpleMovingAverage =  Math.round(sum/promiseCount)/1000;
      if(this.getTotalCount === this._timeForEachDonePromise.length)this._simpleMovingAverage = 0;
  }

    calculatePercentageOfDonePromises() {
        let done = this._doneSuccess + this._doneError;
        this._percentDonePromises = Math.round(done * 100 / this._totalCount);
    }

    emit() {
        this._timeSpend = this._timeEnd - this._timeStart;
        this._totalTimeSpend += this._timeSpend/1000;
        this._timeForEachDonePromise.push(this._timeSpend);
        this._timeEnd = 0;
        this._timeStart = 0;
        this.calculatePercentageOfDonePromises();
        this.calculateSimpleMovingAverage();
        let done = this._doneSuccess + this._doneError;

        const data = {
            tasksCount: this._totalCount,
            tasksDone: done,
            percentDone: this._percentDonePromises,
            timeSpend: parseFloat(this._totalTimeSpend.toFixed(3)),
            sma: this._simpleMovingAverage
        };
        if (typeof this._collback === 'function') this._collback(data);
    };

    promiseCollback(promise, error, timeStart) {
        if (this._promiseList.get(promise) === false) {
            if (error) {
                this._doneError += 1;
            } else {
                this._doneSuccess += 1;
            }
            this._timeEnd = new Date().getTime();
            this._timeStart = timeStart;
            this._promiseList.set(promise, true);
            this.emit();
        }
    };

    resolvePromises(promiseArray) {
        // console.info('promiseArray', promiseArray);
        this._totalCount = promiseArray.length;

        for (let promise of promiseArray) {
            this._promiseList.set(promise, false);
        }
        // console.info('list', this._promiseList);
        this._totalCount = promiseArray.length;
        this._doneSuccess = 0;
        this._doneError = 0;
        for (let [key, value] of this._promiseList) {
            let timeStart = new Date().getTime();
            key
                .then(
                    resolve => this.promiseCollback(key, null, timeStart),
                    error => this.promiseCollback(key, error,timeStart)
                )
                .catch(e => console.info('error:', e));
        }
    };

    get getTotalCount() {
        return this._totalCount;
    }

    get getDoneSuccess() {
        return this._doneSuccess;
    }

    get getDoneError() {
        return this._doneError;
    }

    get getTimeLeft() {
        return this._timeLeft;
    }

    get getTimeSpend() {
        return this._timeSpend;
    }


}

const rollBack = function () {
    // console.info(`total promises count: ${this._totalCount}, percent of done promises: ${this._percentDonePromises}%, success: ${this._doneSuccess} / errors: ${this._doneError}, total time spend: ${this._totalTimeSpend}, time of all done promises: ${this._timeForEachDonePromise}, time left: ${this._simpleMovingAverage} seconds`);
};

const promises = [
    new Promise(function (resolve, reject) {
        setTimeout(() => resolve(1), 10000); // (*)
    }),
    new Promise(function (resolve, reject) {
        setTimeout(() => resolve(2), 9000); // (*)
    }),
    new Promise(function (resolve, reject) {
        setTimeout(() => resolve(4), 8000); // (*)
    }),
    new Promise(function (resolve, reject) {
        setTimeout(() => resolve(8), 7000); // (*)
    }),
    new Promise(function (resolve, reject) {
        setTimeout(() => resolve(10), 6000); // (*)
    }),
    new Promise(function (resolve, reject) {
        setTimeout(() => resolve(12), 5000); // (*)
    }),
    new Promise(function (resolve, reject) {
        setTimeout(() => resolve(14), 4000); // (*)
    }),
    new Promise(function (resolve, reject) {
        setTimeout(() => resolve(16), 3000); // (*)
    }),
    new Promise(function (resolve, reject) {
        setTimeout(() => resolve(18), 2000); // (*)
    }),
    new Promise(function (resolve, reject) {
        setTimeout(() => resolve(18), 1000); // (*)
    }),
];

// const progressBar = new PromiseProgressBar(rollBack);
// progressBar.resolvePromises(promises);

export default PromiseProgressBar;