import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
// import MainReducer from './reducer/MainReducer';
// import MobileMenu from './reducer/MobileMenu';
// import ProductListReducer from './reducer/ProductListReducer';

export default combineReducers({
  router: routerReducer,
  // main: MainReducer,
  // mobileMenu: MobileMenu,
  // goods: ProductListReducer
});
