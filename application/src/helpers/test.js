/**
 * Created by alex on 9/27/18.
 */
let instance = null;

class SingletonModuleScopedInstance {
    constructor() {
        if (!instance) {
            instance = this;
        }

        this._type = 'SingletonModuleScopedInstance';
        this.time = new Date();

        return instance;
    }

    test(){
        console.log('test')
    }

    findLongestMatchOfNonRepetitiveChars(str) { // takes 15 min
        console.log('str=', str);
        if(typeof str !== 'string') return '';
        let result = '',
            length = str.length,
            tmp = '';
        for(let i = 0; i < length; i++) {
            let char = str[i];
            if(tmp.indexOf(char) === -1) {
                tmp += char;
                if(result.length < tmp.length) result = tmp;
            } else {
                tmp = char;
            }
        }
        console.log('result', result);
        return result;
    }


    writeNumbersWithPeriod(arrNumbers, period) {  // takes 15 min
        if(!arrNumbers || arrNumbers.length < 1 || typeof period !== 'number') return false;
        for(let i = 0; i < arrNumbers.length; i++){
            let num = arrNumbers[i];
            setTimeout(() => {
                console.log('my', num);
            }, period * i);
        }
    }

    singletonMethod() {
        return 'singletonMethod';
    }

    static staticMethod() {
        return 'staticMethod';
    }

    get type() {
        return this._type;
    }

    set type(value) {
        this._type = value;
    }

    bind(func, context) {
        let previousArgs = [].slice.call(arguments, 2);
        return function() {
            let currentArgs = [].slice.call(arguments);
            let combinedArgs = [].concat(previousArgs, currentArgs);
            return func.apply(context, combinedArgs);
        }
    }
}

let user = 'admin';
const myBind = function (func, context) {
    let previousArgs = [].slice.call(arguments, 2);
    return function() {
        let currentArgs = [].slice.call(arguments);
        let combinedArgs = [].concat(previousArgs, currentArgs);
        return func.apply(context, combinedArgs);
    }
};

let log = {
    error: myBind(console.log, console, '[Error]', user),
    warning: myBind(console.log, console, '[Warning]', user)
};
log.error('File not found');
log.warning('No timezone set');

export default SingletonModuleScopedInstance;