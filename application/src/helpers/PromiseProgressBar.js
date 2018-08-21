/**
 * Created by alex on 7/23/18.
 */

export let doneProcesses = 0;

const promiseIndicator = (promiseArray) => {
    // console.log('helper', promiseArray);
    // начало цепочки
    let chain = Promise.resolve();

    let results = [];

// в цикле добавляем задачи в цепочку
    promiseArray.forEach((promise, index) => {
        chain = chain
            .then(() => promise)
            .then((result) => {
                doneProcesses = index;
                console.log('result', result, 'done =', doneProcesses);
                results.push(result);
            });
    });

// в конце — выводим результаты
    chain.then(() => {
        console.log('results total:', results);
    });
};



export default promiseIndicator;