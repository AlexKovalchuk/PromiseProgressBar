/**
 * Created by alex on 7/30/18.
 */

const promiseArray = [];

let promise1 = new Promise((resolve, reject) => {
    setTimeout(() => {
        // console.log('1');
        resolve({data: '1'});
    }, 10000);
});
let promise2 = new Promise((resolve, reject) => {
    setTimeout(() => {
        // console.log('2');
        resolve({data: '2'});
    }, 9000);
});
let promise3 = new Promise((resolve, reject) => {
    setTimeout(() => {
        // console.log('3');
        resolve({data: '3'});
    }, 8000);
});
let promise4 = new Promise((resolve, reject) => {
    setTimeout(() => {
        // console.log('4');
        resolve({data: '4'});
    }, 7000);
});
let promise5 = new Promise((resolve, reject) => {
    setTimeout(() => {
        // console.log('5');
        resolve({data: '5'});
    }, 5000);
});
let promise6 = new Promise((resolve, reject) => {
    setTimeout(() => {
        // console.log('6');
        resolve({data: '6'});
    }, 6000);
});
let promise7 = new Promise((resolve, reject) => {
    setTimeout(() => {
        // console.log('7');
        resolve({data: '7'});
    }, 7000);
});
let promise8 = new Promise((resolve, reject) => {
    setTimeout(() => {
        // console.log('8');
        resolve({data: '8'});
    }, 5500);
});
let promise9 = new Promise((resolve, reject) => {
    setTimeout(() => {
        // console.log('9');
        resolve({data: '9'});
    }, 6500);
});
let promise10 = new Promise((resolve, reject) => {
    setTimeout(() => {
        // console.log('10');
        resolve({data: '10'});
    }, 15000);
});
let promise11 = new Promise((resolve, reject) => {
    setTimeout(() => {
        // console.log('11');
        resolve({data: '11'});
    }, 500);
});

promiseArray.push(promise1);
promiseArray.push(promise2);
promiseArray.push(promise3);
promiseArray.push(promise4);
promiseArray.push(promise5);
promiseArray.push(promise6);
promiseArray.push(promise7);
promiseArray.push(promise8);
promiseArray.push(promise9);
promiseArray.push(promise10);
promiseArray.push(promise11);

export default promiseArray;
