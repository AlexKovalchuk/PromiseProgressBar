import React, { Component } from 'react';
import './LoginPage.styl'
import TextField from '@material-ui/core/TextField';
import {connect} from "react-redux";
import mainActions from '../../actions/mainActions';
import validateBarcode from '../../services/dataValidator';
import Button from '@material-ui/core/Button';
import {Recapture} from '../../component/recapture/Reecapture';

class LoginView extends Component {
    state = {
        barcode: '',
        isCorrect: false,
        message: '',
        label: 'Номер картки Власного Рахунку',
        recaptureIsValid: false
    };

    inputRef = null;

    removeFocusInput = () => {
        if(this.inputRef !== null && document.activeElement !== this.inputRef) {
            this.inputRef.blur();
        }
    };

    componentDidUpdate(prevProps){
        if (prevProps.recaptureStatus !== this.props.recaptureStatus) {
            this.setState({
                isCorrect: false,
                recaptureIsValid: false
            })
        }
    }
    /***
     * Sample form test
     * @param e
     * @returns {{recaptureIsValid: boolean, barcode: any | string, isCorrect: *, blurMessage: string, changeMessage: string}}
     */
    testForm = (e) => {
        const recaptureIsValid = this.state.recaptureIsValid;
        let barcode = e.target.value.replace(/[^0-9]/g, '') || '';
        barcode = barcode.length > 13 ? barcode.slice(0, 13) : barcode;
        const isCorrect = validateBarcode(barcode);
        const blurMessage = isCorrect && barcode.length === 13?
            recaptureIsValid? '' : 'Заповніть, будь-ласка, капчу'
            : barcode.length === 0 ? `Поле обов'зкове для заповнення` : barcode.length < 13 ?
                'Номер має містити 13 цифр' : barcode.length >= 13 ?
                    'Невірний номер карти' : '';
        const changeMessage = isCorrect && barcode.length === 13? recaptureIsValid? '' : 'Заповніть, будь-ласка, капчу'
            : barcode.length >= 13 ? 'Невірний номер карти': '';
        return {
            recaptureIsValid,
            barcode,
            isCorrect,
            blurMessage,
            changeMessage,
        };
    };
    /***
     * input validation (part 1 of validation)
     * @param e
     */
    testBarcode = (e) => {
        const {barcode, isCorrect, changeMessage: message, recaptureIsValid} = this.testForm(e);
        this.setState({
            barcode,
            isCorrect: isCorrect && recaptureIsValid,
            message,
            label: isCorrect && barcode.length === 13? this.state.label : barcode.length >= 13 ? ' '  : this.state.label
        });
    };
    /***
     * input validation on blur (part 2 of validation)
     * @param e
     */
    testBarcodeBlur = (e) => {
        const {barcode, isCorrect, blurMessage: message, recaptureIsValid} = this.testForm(e);
        this.setState({
            barcode,
            isCorrect: isCorrect && recaptureIsValid,
            message,
            label: barcode.length === 0 ? 'Номер картки Власного Рахунку' : ' '
        })
    };
    /***
     * Send request to api
     * @param e
     */
    sendAuthRequest = (e) => {
        e.stopPropagation();
        e.preventDefault();
        const {barcode, isCorrect} = this.state;
        if (!isCorrect) {
            return;
        }
        this.props.auth(barcode);
    };
    /***
     * Update recapture key for validation
     */
    updateRecapture = () => {
        this.setState({recaptureIsValid: true},()=>{
            this.testBarcode({target: {value: this.state.barcode}})
        })};

    render() {
        const {barcode, message, isCorrect} = this.state;
        const apiError = this.props.apiError;
        return (
            <div className="login-page-container" onClick={() => this.removeFocusInput()}>
                <div className="login-form">
                    <p className="title-text">Вхід до голосування</p>
                    <form noValidate autoComplete="off">
                        <TextField
                            id="number"
                            label={this.state.label}
                            className={'card-number'}
                            value={barcode}
                            onChange={this.testBarcode}
                            onBlur={this.testBarcodeBlur}
                            onClick={()=>{this.setState({label: ' '})}}
                            onFocus ={()=>{this.setState({label: ' '})}}
                            margin="normal"
                            type="text"
                            inputRef={inputRef => {this.inputRef = inputRef}}
                        />
                        <div className="validation-message">{message}</div>
                        <Recapture setKey={this.updateRecapture} />
                        <div className="login-api-error-message">{apiError}</div>
                        <Button disabled={!isCorrect}
                                className="button-enter"
                                onClick={this.sendAuthRequest}
                        >увійти</Button>
                    </form>
                </div>
            </div>
        );
    }
}


const mapStateToProps = store => {
    return {
        apiError: store.main.message,
        recaptureStatus: store.main.recaptureStatus
    };
};

const mapDispatchToProps = dispatch => {
    return {auth: barcode => dispatch(mainActions.auth(barcode))}
};

export default connect (mapStateToProps, mapDispatchToProps)(LoginView);
