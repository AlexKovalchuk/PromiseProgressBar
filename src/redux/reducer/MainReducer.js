const INITIAL_STATE = {
    barcode: localStorage.getItem('barcode') || null,
    awardId: localStorage.getItem('awardId') || 0,
    awardName: '',
    message: '',
    startDate: '2019-08-09T12:26:05.637Z',
    expDate: '2019-08-09T12:26:05.637Z',
    menu: [],
    awardResults: [],
    paths: {},
    recaptureStatus: '',
    defaultPath: localStorage.getItem('defaultPath') || '/vote',
};

export default (state = INITIAL_STATE, {type, payload = {}}) => {
    switch (type) {

        case 'LOGOUT':
            return {...state, barcode: ''};
        case 'INITIALISATION':
        case 'VOTE_RESULTS':
        case 'SEND_AUTHORIZATION':
        case 'AUTHORIZATION':
            return {...state, ...payload};
        default:
            return state
    }
}