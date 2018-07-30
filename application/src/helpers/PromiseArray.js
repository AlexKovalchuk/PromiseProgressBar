/**
 * Created by alex on 7/30/18.
 */

const promiseArray = [];

let promise1 = new Promise(function(resolve, reject){
    setTimeout(() => {
        console.log('first asynchronous task just completed');
        resolve({data: 'one'});
    }, 1000);
});
let promise2 = new Promise(function(resolve, reject){
    setTimeout(() => {
        console.log('second asynchronous task just completed');
        resolve({data: 'two'});
    }, 2000);
});
let promise3 = new Promise(function(resolve, reject){
    setTimeout(() => {
        console.log('third asynchronous task just completed');
        resolve({data: 'three'});
    }, 3000);
});
let promise4 = new Promise(function(resolve, reject){
    setTimeout(() => {
        console.log('fourth asynchronous task just completed');
        resolve({data: 'four'});
    }, 4000);
});
let promise5 = new Promise(function(resolve, reject){
    setTimeout(() => {
        console.log('fifth asynchronous task just completed');
        resolve({data: 'five'});
    }, 5000);
});
let promise6 = new Promise(function(resolve, reject){
    setTimeout(() => {
        console.log('sixth asynchronous task just completed');
        resolve({data: 'six'});
    }, 6000);
});
let promise7 = new Promise(function(resolve, reject){
    setTimeout(() => {
        console.log('seventh asynchronous task just completed');
        resolve({data: 'seven'});
    }, 7000);
});
let promise8 = new Promise(function(resolve, reject){
    setTimeout(() => {
        console.log('eighth asynchronous task just completed');
        resolve({data: 'eight'});
    }, 8000);
});
let promise9 = new Promise(function(resolve, reject){
    setTimeout(() => {
        console.log('ninth asynchronous task just completed');
        resolve({data: 'nine'});
    }, 9000);
});
let promise10 = new Promise(function(resolve, reject){
    setTimeout(() => {
        console.log('tens asynchronous task just completed');
        resolve({data: 'ten'});
    }, 10000);
});
let promise11 = new Promise(function(resolve, reject){
    setTimeout(() => {
        console.log('eleventh asynchronous task just completed');
        resolve({data: 'eleven'});
    }, 11000);
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

let promiseProgress = 0;

export default {promiseArray, promiseProgress};
