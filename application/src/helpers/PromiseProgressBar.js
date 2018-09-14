class PromiseProgressBar {
    constructor(collBackFunction) {
        this._totalCount = 0;
        this._doneSuccess = 0;
        this._doneError = 0;
        this._timeSpend = 0;
        this._totalTimeSpend = 0;
        this._timeForEachDonePromise = [];
        this._promiseList = new Map();
        this._collback = collBackFunction;
        this._timeStart = 0;
        this._timeEnd = 0;
        this._percentDonePromises = 0;
        this._simpleMovingAverage = 0;
    }

    calculateSimpleMovingAverage() {
        let sum = 0;
        let timeOfDonePromises = this._timeForEachDonePromise;
        let promiseCount = this._totalCount;
        if (promiseCount > timeOfDonePromises.length) {
            promiseCount = timeOfDonePromises.length;
        }

        for (let i = timeOfDonePromises.length - promiseCount; i < timeOfDonePromises.length; i++) {
            sum += timeOfDonePromises[i];
        }
        this._simpleMovingAverage = Math.round(sum / promiseCount) / 1000;
        if (this.getTotalCount === this._timeForEachDonePromise.length) this._simpleMovingAverage = 0;
    }

    calculatePercentageOfDonePromises() {
        let done = this._doneSuccess + this._doneError;
        this._percentDonePromises = Math.round(done * 100 / this._totalCount);
    }

    emit() {
        this._timeSpend = this._timeEnd - this._timeStart;
        this._totalTimeSpend += this._timeSpend / 1000;
        this._timeForEachDonePromise.push(this._timeSpend);
        this._timeEnd = 0;
        this._timeStart = 0;
        this.calculatePercentageOfDonePromises();
        this.calculateSimpleMovingAverage();
        let done = this._doneSuccess + this._doneError;

        const data = {
            tasksCount: this._totalCount,
            tasksDone: done,
            percentDone: this._percentDonePromises,
            timeSpend: parseFloat(this._totalTimeSpend.toFixed(3)),
            sma: this._simpleMovingAverage
        };
        if (typeof this._collback === 'function') this._collback(data);
        return 'test';
    };

    promiseCallback(promise, error, timeStart) {
        if (this._promiseList.get(promise) === false) {
            if (error) {
                this._doneError += 1;
            } else {
                this._doneSuccess += 1;
            }
            this._timeEnd = new Date().getTime();
            this._timeStart = timeStart;
            this._promiseList.set(promise, true);
            this.emit();
        }
    };

    resolvePromises(promiseArray) {
        this._totalCount = promiseArray.length;

        for (let promise of promiseArray) {
            this._promiseList.set(promise, false);
        }
        this._totalCount = promiseArray.length;
        this._doneSuccess = 0;
        this._doneError = 0;
        for (let [key] of this._promiseList) {
            let timeStart = new Date().getTime();
            key
                .then(
                    resolve => this.promiseCallback(key, null, timeStart),
                    error => this.promiseCallback(key, error, timeStart)
                )
                .catch(e => console.info('error:', e));
        }
        return this._totalCount;
    };

    get getTotalCount() {
        return this._totalCount;
    }

}

export default PromiseProgressBar;