/**
 * Created by alex on 7/23/18.
 */
import React, {Component} from 'react';
import './PromiseProgressBar.css';
import promiseProgressBar from '../../helpers/PromiseProgressBar';
import promiseArray from '../../helpers/PromiseArray';

class PromiseProgressBar extends Component {
    constructor(props) {
        super(props);
        this.state={
            promiseProgressBar: new promiseProgressBar(this.promiseProgressBarCallback),
        }

    }

    componentDIdMount() {
        this.state.promiseProgressBar.resolvePromises(promiseArray);
    }

    promiseProgressBarCallback() {
    console.log(`total promises count: ${this._totalCount}, percent of done promises: ${this._percentDonePromises}%, success: ${this._doneSuccess} / errors: ${this._doneError}, total time spend: ${this._totalTimeSpend}, time of all done promises: ${this._timeForEachDonePromise}, time left: ${this._simpleMovingAverage} seconds`);
    }

    render() {
        return(
            <div>
                here will be my progress bar
                <h1>We have {promiseArray.length} processes.</h1>
                <div>
                    done processes ????
                </div>
            </div>
        )
    }
}

export default PromiseProgressBar;
