// функція-генератор *filter(operator, iterable)* - генерує підпослідовність із *iterable*,
// що складається лише з тих елементів, результат виконання функції *operator* над якими є позитивним;
function* filter(operator, iterable) {
    for (let value of iterable) {
        if (operator(value)) {
            yield value;
        }
    }
}

function positiveOperator(n) {
    if (typeof n !== 'number' || n < 0) return false;
    return true;
}

// console.log(
//     'filter positive  values:',
//     Array.from(
//         filter(
//             positiveOperator,
//             signRange(10)
//         )
//     )
// );

// функція-генератор *zip(...iterables)* - генерує послідовність кортежів з елементів послідовностей *iterables*;
function* zip(...iterables) {
    console.log('zip iterables', iterables);
    let smallestIterableLength = getSmallestIterableLength(iterables);
    let courtage = createCourtage(smallestIterableLength, iterables);
    for(let i = 0; i < smallestIterableLength; i++) {
        yield courtage[i];
    }
}

// console.log(
//     'Zip  values:',
//     Array.from(
//         zip(
//             Array.from(signRange(2)),
//             Array.from(signRange(3)),
//             Array.from(signRange(4)),
//         )
//     )
// );

// функція-генератор *cycle(iterable)* - генерує нескінченну циклічну послідовність із елементів послідовності *iterable*;

function* cycle(iterable) {
    let saved = [];

    for(let element of iterable){
        yield element;
        saved.push(element)
    }

    while(saved) {
        for (let element of saved){
            yield element
        }
    }
}
// let cycleIt = cycle(signRange(2));
// for(let i=0; i < 12; i++) {
//     console.log('cycle:',cycleIt.next());
// }

// функція-генератор *range(start, stop, step=1)* - генерує послідовність
// *start*, *start + step*, *start + step + step*... до *stop* невключно;

function* range(start, stop, step = 1) {
    let newStep = start + step;
    yield start;
    for(let i = start; newStep < stop; i++) {
        yield newStep;
        newStep += step;
    }
}

// console.log('range  values:', Array.from(range(1, 22, 2)));

//функція-генератор *takeWhile(operator, iterable)* -
// Make an iterator that returns elements from the iterable
// as long as the operator(x) is true.

function* takeWhile(x, operator, iterable) {

    for(let iter of iterable) {
        if(operator(x, iter)) {
            yield iter;
        }
    }
}

// console.log(
//     'TakeWhile  values:',
//     Array.from(
//         takeWhile(
//             1,
//             takeWhileOperator,
//             Array.from(signRange(3))
//         )
//     )
// );

// функція *tee(iterable, n)* - повертає масив,
// що складається із *n* послідовностей *iterable*;
function* tee(n = 1, iterable) {

    let iterableArray = [];
    let result = [];
    for(let iter of iterable) {
        iterableArray.push(iter)
    }

    for(let i = 0; i < n; i++){
        result.push(iterableArray);
    }

    yield result;
}

// let teeObj = tee(2, signRange(3));
// for(let i = 0; i < 2; i++){
//     let tmpTee = teeObj.next();
//     if(tmpTee.value){
//         for(tmp of tmpTee.value){
//             console.log('tmp', tmp);
//         }
//     }
// }

// функція вищого порядку *all(iterable)* = *iterable_0 && iterable_1 && ... && iterable_n*
function* reduce(operator, iterable, initial = true) {
    let result = initial;
    for(iter of iterable) {
        result = operator(result, iter);
        if(!result) break;
        yield result;
    }

}
function reduceOperator(first, second) {
    return !!(first && second);
}

console.log(
    'reduce  values:',
    Array.from(reduce(reduceOperator, signRange(5), true))
);

//helpers

function takeWhileOperator(maxValue, currentValue) {
    if(typeof maxValue === 'number' && typeof currentValue === 'number' && currentValue < maxValue) return true;
    return false;
}

function* signRange(n) {
    for (let i = -n; i < n; ++i) {
        yield i;
    }
}

function getSmallestIterableLength(iterables) {
    let iterablesSmallestLength = 0;
    for(let i = 0; i < iterables.length; i++) {
        if(i === 0 ) iterablesSmallestLength = iterables[i].length;
        if(iterables[i].length < iterablesSmallestLength)iterablesSmallestLength = iterables[i].length;
    }
    return iterablesSmallestLength
}

function createCourtage(n, iterables) {
    let courtage = [];
    for(let i = 0; i < iterables.length; i++) {
        for(let j = 0; j < n; j++){
            if(!courtage[j]) courtage.push([]);
            courtage[j].push(iterables[i][j])
        }
    }
    return courtage;
}

// console.log(
//     'filter:',
//     Array.from(
//         filter(
//             (value) => value % 3 === 0,
//             filter(
//                 value => value % 2 === 0,
//                 range(100)
//             )
//         )
//     )
// );

// export default {
//     cycle: cycle
// }