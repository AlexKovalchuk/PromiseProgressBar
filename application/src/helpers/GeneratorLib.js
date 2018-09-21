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
function* range(n) {
    for (let i = 0; i < n; ++i) {
        yield i;
    }
}

// console.log(
//     'cycle  values:',
//     Array.from(
//         cycle(
//             Array.from(signRange(2)),
//         )
//     )
// );
//helpers


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