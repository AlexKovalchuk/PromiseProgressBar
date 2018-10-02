import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './CountDownStyle.styl';

class CountDown extends Component {
    constructor(props) {
        super(props);

        this.state = {
            day: 0,
            hour: 0,
            minute: 0,
            second: 0,
        }
    }

    componentDidMount() {
        // update every second
        this.interval = setInterval(() => {
            const date = this.calculateCountdown(this.props.date);
            if (date) {
                this.setState(date)
            } else {
                this.stop();
                this.props.done();
            }
        }, 1000);
    }

    componentWillUnmount() {
        this.stop();
    }

    calculateCountdown = endDate => {
        let diff = (Date.parse(endDate) - Date.parse(new Date())) / 1000;

        // clear countdown when date is reached
        if (diff <= 0) return false;

        const timeLeft = {
            years: 0,
            day: 0,
            hour: 0,
            minute: 0,
            second: 0,
            millisecond: 0,
        };

        // calculate time difference between now and expected date
        if (diff >= (365.25 * 86400)) { // 365.25 * 24 * 60 * 60
            timeLeft.years = Math.floor(diff / (365.25 * 86400));
            diff -= timeLeft.years * 365.25 * 86400;
        }
        if (diff >= 86400) { // 24 * 60 * 60
            timeLeft.day = Math.floor(diff / 86400);
            diff -= timeLeft.day * 86400;
        }
        if (diff >= 3600) { // 60 * 60
            timeLeft.hour = Math.floor(diff / 3600);
            diff -= timeLeft.hour * 3600;
        }
        if (diff >= 60) {
            timeLeft.minute = Math.floor(diff / 60);
            diff -= timeLeft.minute * 60;
        }
        timeLeft.second = diff;

        return timeLeft;
    };

    stop = () => {
        clearInterval(this.interval);
    };

    addLeadingZeros = (value) => {
        value = String(value);
        while (value.length < 2) {
            value = '0' + value;
        }
        return value;
    };

    /**
     * match label and number in the counter
     * @param label
     * @param number
     * @return {string}
     */
    matchlabeleAndNumber = (number = 0, label) => {
        const wordSet = {
            day: {
                firstCase: 'день',
                secondCase: 'дні',
                thirdCase: 'днів'
            },
            hour: {
                firstCase: 'година',
                secondCase: 'години',
                thirdCase: 'годин'
            },
            minute: {
                firstCase: 'хвилина',
                secondCase: 'хвилини',
                thirdCase: 'хвилин'
            },
            second: {
                firstCase: 'секунда',
                secondCase: 'секунди',
                thirdCase: 'секунд'
            }
        };

        let resultEnd;
        number = number % 100;
        if (number >= 11 && number <= 19) {
            resultEnd = wordSet[label].thirdCase;
        }
        else {
            number = number % 10;
            switch (number) {
                case (1):
                    resultEnd = wordSet[label].firstCase;
                    break;
                case (2):
                case (3):
                case (4):
                    resultEnd = wordSet[label].secondCase;
                    break;
                default:
                    resultEnd = wordSet[label].thirdCase;
            }
        }
        return resultEnd;
    };

    render() {
        const countDown = this.state;

        return (
            <div className="countdown">
                <div className="countdown-col">
                    <div className="countdown-col-element first-col-element">
                        <div className={'countdown-col-element-number'}>{this.addLeadingZeros(countDown.day)}</div>
                        <div
                            className={'countdown-col-element-label'}>{this.matchlabeleAndNumber(countDown.day, 'day')}</div>
                    </div>
                </div>

                <span>:</span>

                <div className="countdown-col">
                    <div className="countdown-col-element">
                        <div className={'countdown-col-element-number'}>{this.addLeadingZeros(countDown.hour)}</div>
                        <div
                            className={'countdown-col-element-label'}>{this.matchlabeleAndNumber(countDown.hour, 'hour')}</div>
                    </div>
                </div>

                <span>:</span>

                <div className="countdown-col">
                    <div className="countdown-col-element">
                        <div className={'countdown-col-element-number'}>{this.addLeadingZeros(countDown.minute)}</div>
                        <div
                            className={'countdown-col-element-label'}>{this.matchlabeleAndNumber(countDown.minute, 'minute')}</div>
                    </div>
                </div>

                <span>:</span>

                <div className="countdown-col">
                    <div className="countdown-col-element">
                        <div className={'countdown-col-element-number'}>{this.addLeadingZeros(countDown.second)}</div>
                        <div
                            className={'countdown-col-element-label'}>{this.matchlabeleAndNumber(countDown.second, 'second')}</div>
                    </div>
                </div>
            </div>
        );
    }
}

CountDown.propTypes = {
    date: PropTypes.object,
    done: PropTypes.func
};

CountDown.defaultProps = {
    date: new Date(),
    done: () => {}
};

export default CountDown;