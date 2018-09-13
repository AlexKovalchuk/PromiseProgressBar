// функція-генератор *filter(operator, iterable)* - генерує підпослідовність із *iterable*,
// що складається лише з тих елементів, результат виконання функції *operator* над якими є позитивним;

function* filter(operator, iterable) {
    for (let value of iterable) {
        if (operator(value)) {
            yield value;
        }
    }
}

function* range(n) {
    for (let i = 0; i < n; ++i) {
        yield i;
    }
}

console.log(
    Array.from(
        filter(
            (value) => value % 3 === 0,
            filter(
                (value) => value % 2 === 0,
                range(100)
            )
        )
    )
);