import chai from 'chai';
import PromiseIndicator from '../helpers/PromiseProgressBar';
// import promiseArray from '../helpers/PromiseArray';

const callback = data => {
    console.log('data', data);
};

const promiseIndicator = new PromiseIndicator(callback);
const resolvePromises = promiseIndicator.resolvePromises;
// resolvePromises(promiseArray);

describe('resolvePromises', () => {
    it('resolvePromises should return type object', () => {
        chai.assert.typeof(resolvePromises, 'object');
    })
});

