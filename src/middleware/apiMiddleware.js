import {LOCATION_CHANGE, replace} from 'react-router-redux';
import updateProductList from '../actions/updateProductList';
import mainActions from '../actions/mainActions';
import productsActions from '../actions/updateProductList';
import axios from 'axios';
import {resetRecaptcha} from '../component/recapture/Reecapture';

const ENDPOINT = 'http://awards.silpo.iir.fozzy.lan/api/Awards/';
const API = {
    SEND_AUTHORIZATION: {path: ENDPOINT + 'Authorization', type: 'post'},
    INITIALISATION: {path: ENDPOINT + 'GetNominationTree', type: 'post'},
    UPDATE_GOODS: {path: ENDPOINT + 'GetCategories', type: 'post'},
    VOTE_GOODS: {path: ENDPOINT + 'SetAwardResults', type: 'post'},
    VOTE_RESULTS: {path: ENDPOINT + 'GetAwardResults', type: 'post'},
};

/***
 * Rebuild menu for reducer
 * @param data
 * @returns {*}
 */
function rebuildMenu(data) {
    if (data.errors) {
        return {
            message: data.errors.message,
            startDate: '2019-08-09T12:26:05.637Z',
            expDate: '2019-08-09T12:26:05.637Z',
            menu: [],
            paths: {},
            defaultPath: ''
        }
    }
    data.menu = data.menu || [];
    const paths = {};
    let defaultPath = '';

    for (let i = 0; i < data.menu.length; i++) {
        const section = data.menu[i];
        section.items = section.items || [];
        let sectionPath = `/vote/${section.slug}/`;
        let finalSectionPath = `/vote/${section.slug}/`;

        for (let j = 0; j < section.items.length; j++) {
            const category = section.items[j];
            category.items = category.items || [];
            let categoryPath = `${sectionPath}${category.slug}`;
            let finalCategoryPath = `${sectionPath}${category.slug}`;
            if (j === 0 && category.items.length === 0) {
                finalSectionPath = categoryPath;
                paths[categoryPath] = category.id;
            }
            if (category.items.length === 0) {
                paths[categoryPath] = category.id;
            }
            if (category.items.length > 0) {

                for (let k = 0; k < category.items.length; k++) {
                    const subCategory = category.items[k];
                    const subCategoryPath = `${categoryPath}/${subCategory.slug}`;
                    paths[subCategoryPath] = subCategory.id;
                    if (j === 0 && k === 0) {
                        finalSectionPath = subCategoryPath;
                    }
                    if (k === 0) {
                        paths[subCategoryPath] = subCategory.id;
                        finalCategoryPath = subCategoryPath;
                    }
                    category.items[k].path = subCategoryPath;
                }
            }
            section.items[j].path = finalCategoryPath;
        }
        section.path = finalSectionPath;
        if (i === 0) {
            defaultPath = finalSectionPath;
        }
    }
    data.paths = paths;
    data.defaultPath = defaultPath;
    data.message = '';
    return data;
}

const apiMiddleware = store => next => action => {
    let {
        type: actionType,
        params = {},
        payload = {}
    } = action;
    const {main: {paths, barcode, awardId}} = store.getState();


    if (actionType === LOCATION_CHANGE && payload.pathname.indexOf('/vote') !== -1 && payload.pathname.indexOf('#/vote') === -1) {
        if (paths[payload.pathname]) {
            store.dispatch(productsActions.requestProducts(paths[payload.pathname], barcode, awardId));
        }
    }
    if (actionType === LOCATION_CHANGE && payload.pathname.indexOf('/selected') !== -1) {
        if (barcode) {
            store.dispatch(productsActions.awardResults(barcode, awardId));
        } else {
            store.dispatch(replace('/login#' + window.location.pathname));
        }
    }
    if (!API[actionType]) {
        return next(action);
    }

    axios[API[actionType].type](API[actionType].path, params)
        .then(function (res) {
            const {data, resultStr, awardResults, resultCode} = res.data;
            let newPayload = {};
            switch (actionType) {
                case 'INITIALISATION':
                    if (resultCode !== 0 && resultStr) {
                        newPayload = {message: resultStr};
                    } else {
                        newPayload = rebuildMenu(data);
                        localStorage.setItem('defaultPath', newPayload.defaultPath);
                        localStorage.setItem('awardId', newPayload.awardId);
                        let currentPath = window.location.pathname;
                        if (currentPath === '/vote') {
                            window.location.pathname = newPayload.defaultPath;
                        } else {
                            if (currentPath.indexOf('/vote') !== -1 && currentPath.indexOf('#/vote') === -1) {
                                if (newPayload.paths[currentPath]) {
                                    store.dispatch(productsActions.requestProducts(newPayload.paths[currentPath], barcode, newPayload.awardId));
                                }
                            } else if (currentPath.indexOf('/selected') !== -1) {
                                if (barcode) {
                                    store.dispatch(productsActions.awardResults(barcode, newPayload.awardId));
                                } else {
                                    replace('/login#' + currentPath);
                                }
                            }
                        }
                    }
                    break;
                case 'SEND_AUTHORIZATION':
                    if (resultCode !== 0 && resultStr) {
                        newPayload = {
                            message: resultStr,
                            recaptureStatus: new Date().toString()
                        };
                        resetRecaptcha();
                    } else {
                        newPayload = {message: ''};
                        localStorage.setItem('barcode', data.barcode);
                        const hash = window.location.hash.replace('#', '');
                        const finalPath = hash && hash.indexOf('/vote') === 0 ? hash : '/selected';
                        store.dispatch(mainActions.authFinish(data));
                        store.dispatch(replace(finalPath));
                    }
                    break;
                case 'VOTE_RESULTS':
                    if (resultCode !== 0 && resultStr) {
                        newPayload = {awardResults: [], message: resultStr};
                    } else {
                        newPayload = {awardResults: awardResults, message: ''}
                    }
                    break;
                case 'UPDATE_GOODS':
                case 'VOTE_GOODS':
                    if (resultCode !== 0 && resultStr) {
                        newPayload = {
                            title: '',
                            description: '',
                            id: '',
                            isVoted: false,
                            items: [],
                            message: resultStr
                        };
                    } else {
                        newPayload = {...data, message: ''};
                    }
                    store.dispatch(updateProductList.resetProduct(newPayload));
                    return;
                case 'AUTHORIZATION':
                    if (resultCode !== 0 && resultStr) {
                        newPayload = {message: resultStr};
                    } else {
                        newPayload = {message: ''};
                    }
                    break;
                default:
                    newPayload = data;
            }
            let newAction = Object.assign({}, action, {
                payload: newPayload
            });
            next(newAction);
        })
        .catch(function (error) {
            let message = '';
            if (error.response && error.response.data) {
                const keys = Object.keys(error.response.data);
                let errorString = '';
                for (let i = 0; i < keys.length; i++) {
                    errorString = errorString + error.response.data[keys[i]];
                }
                message = errorString;
            } else {
                message = JSON.stringify(error);
            }

            let newAction = Object.assign({}, action, {
                payload: {message}
            });
            next(newAction);
        })
};

export default apiMiddleware