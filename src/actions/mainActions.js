const mainActions = {
    /***
     * Send request to init menu, expDate and etc.
     * @returns {{type: string}}
     */
    init: () => {
        return {
            type: 'INITIALISATION'
        }
    },
    /***
     * Send request to auth user by barcode
     * @param barcode
     * @returns {{type: string, params: {barcode: *}}}
     */
    auth: (barcode) => {
        return {
            type: 'SEND_AUTHORIZATION',
            params: {barcode}
        }
    },
    /***
     * Update user data in storage
     * @param barcode
     * @returns {{type: string, payload: *}}
     */
    authFinish: (barcode) => {
        return {
            type: 'AUTHORIZATION',
            payload: barcode
        }
    },
    /***
     * Logout user
     * @returns {{type: string}}
     */
    logout: () => {
        localStorage.removeItem('barcode');
        return {
            type: 'LOGOUT'
        }
    },
    /***
     * Trigger side menu on mobile
     * @returns {{type: string}}
     */
    mobileMenuButtonClick: () => {
        return {type: 'MOBILE_MENU_CLICK'}
    }
};

export default mainActions