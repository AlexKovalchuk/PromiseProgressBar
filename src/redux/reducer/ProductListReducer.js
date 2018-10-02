const INITIAL_STATE = {
    title: '',
    description: '',
    id: '',
    isVoted: false,
    items: [],
    message: ''
};

export default (state = INITIAL_STATE, {type, payload}) => {
    switch (type) {

        case 'VOTE_GOODS':
        case 'UPDATE_GOODS':
        case 'VOTE_RESULTS_GOODS':
            return {...state, ...payload};
        default:
            return state
    }

}