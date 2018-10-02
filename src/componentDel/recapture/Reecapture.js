import React,  { Component} from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
const {GCKEY} = process.env;
let recaptchaInstance;

const resetRecaptcha = () => {
    if(recaptchaInstance){
        recaptchaInstance.reset();
    }
};

class Recapture extends Component{
    render(){
        const {setKey} = this.props;
        return (<ReCAPTCHA
            sitekey={GCKEY}
            onChange={setKey}
            ref={e => recaptchaInstance = e}
            className="grecapture" />);
    }

}

export {Recapture, resetRecaptcha};