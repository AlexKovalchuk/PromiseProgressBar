/**
 * Created by alex on 7/30/18.
 */

const promiseArray = [
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


export default promiseArray;
