/**
 * Created by alex on 7/23/18.
 */

const promiseIndicator = (promiseArray) => {
    let chain = Promise.resolve();
    let results = [];
    let progressChecker = 0;

    // console.log('helper', promiseArray);
    // начало цепочки
    promiseArray.forEach((promise, index) => {
        chain = chain
            .then(() => promise)
            .then(result => {
                progressChecker++;
                console.log('result', result, 'done =', progressChecker);
                results.push(result);
            });
    });

// в конце — выводим результаты
    chain.then(() => {
        console.log('results total:', results);
    });
};



export default promiseIndicator;