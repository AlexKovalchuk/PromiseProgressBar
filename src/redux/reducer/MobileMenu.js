const INITIAL_STATE = {isMenuShow: false};

const MobileMenu = (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case 'MOBILE_MENU_CLICK':
      return{...state, isMenuShow: !state.isMenuShow};
    default:
      return state;
  }
};

export default MobileMenu;