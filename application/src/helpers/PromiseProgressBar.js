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
        this._timeLeft = 0;
        this._promiseList = new Map();
        this._collback = collBackFunction.bind(this);
        this._timeStart = 0;
        this._timeEnd = 0;
    }

    emit() {
        console.info('emit');
        this._timeSpend += this._timeEnd - this._timeStart;
        console.info('time end', this._timeEnd, 'time start', this._timeStart);
        console.info('time taken', this._timeEnd - this._timeStart);
        this._timeEnd = 0;
        this._timeStart = 0;
        console.info('emit');
        if (typeof this._collback === 'function') {
            this._collback();
            // console.info(`total: ${this._totalCount}, success: ${this._doneSuccess} / errors: ${this._doneError}, time spend: ${this._timeSpend}`);
        }
    };

    promiseCollback(promise, error) {
        // console.info('callback promise:', promise);
        if (this._promiseList.get(promise) === false) {
            if (error) {
                this._doneError += 1;
            } else {
                this._doneSuccess += 1;
            }
            this._timeEnd = new Date().getTime();
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
        // console.info('total count = ', this.getTotalCount)
        for (let [key, value] of this._promiseList) {
            console.info(`promise: ${key}`);
            this._timeStart = new Date().getTime();

            key
                .then(
                    resolve => this.promiseCollback(key),
                    error => this.promiseCollback(key, error)
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
    console.info(`total: ${this._totalCount}, success: ${this._doneSuccess} / errors: ${this._doneError}, time spend: ${this._timeSpend}`);
};

const promises = [
    new Promise(function (resolve, reject) {
        setTimeout(() => resolve(1), 1000); // (*)
    }),
    new Promise(function (resolve, reject) {
        setTimeout(() => resolve(2), 2000); // (*)
    }),
    new Promise(function (resolve, reject) {
        setTimeout(() => resolve(4), 4000); // (*)
    }),
    new Promise(function (resolve, reject) {
        setTimeout(() => resolve(8), 8000); // (*)
    }),
    new Promise(function (resolve, reject) {
        setTimeout(() => resolve(10), 10000); // (*)
    }),
];

const progressBar = new PromiseProgressBar(rollBack);
progressBar.resolvePromises(promises);