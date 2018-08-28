/**
 * Created by alex on 7/23/18.
 */

// класс с колбуков(функция с выводом полей обьекта)
// Главная функция : принимает массив промисов. Загоняем массив промисов в Map(),
//  устанавливаем поля обьекста в НОЛЬ
//  пробегаемся по промисам, утсанавливаем два колбека для резолв и реджект
// Колбек функция: принимает промис и проверяет или он не выполнен.
//  плюсует поля: выолнено ок или с ошибкой
//  выполняю колбек который дает обновленные данные
// Геттер функции для полей.

class PromiseProgressBar {
    constructor(collBackFunction){
        this._totalCount = 0;
        this._doneSuccess = 0;
        this._doneError = 0;
        this._promiseList = new Map();
        this._collback = collBackFunction;
    }

    emit = () => {
        if(typeof this._collback === 'function'){
            this._collback();
        }
    };

    promiseCollback = (promise, error) => {
        if(this._promiseList.get(promise) === false) {
            if(error) {
                this._doneError += 1;
            } else {
                this._doneSuccess += 1;
            }
            this._promiseList.set(promise, true);
            this.emit();
        }
    };

    resolvePromises = promiseArray => {
        this._totalCount = promiseArray.length;

        for (let promise of promiseArray) {
            this._promiseList.set(promise, false);
        }
        this._totalCount = 0;
        this._doneSuccess = 0;
        this._doneError = 0;
        for (let promise of this._promiseList) {
            promise
                .then(
                    resolve => this.promiseCollback(promise),
                    error => this.promiseCollback(promise,error)
                )
        }
    }

}


// const promiseIndicator = (promiseArray) => {
//     let chain = Promise.resolve();
//     let results = [];
//     let progressChecker = 0;
//
//     // console.log('helper', promiseArray);
//     // начало цепочки
//     promiseArray.forEach((promise, index) => {
//         chain = chain
//             .then(() => promise)
//             .then(result => {
//                 progressChecker++;
//                 console.log('result', result, 'done =', progressChecker);
//                 results.push(result);
//             });
//     });
//
// // в конце — выводим результаты
//     chain.then(() => {
//         console.log('results total:', results);
//     });
// };
//
//
//
// export default promiseIndicator;