/**
 * Created by alex on 7/23/18.
 */

class PromiseProgressBar {
    constructor(collBackFunction){
        this._totalCount = 0;
        this._doneSuccess = 0;
        this._doneError = 0;
        this._promiseList = new Map();
    }

    promiseCollback = promise => {

    };

    resolvePromises = promiseArray => {
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