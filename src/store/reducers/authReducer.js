import ActionTypes from "./../actions/ActionTypes";

const authReducer = (state = {
    isAuthenticated: false,
    user: {}
}, action) => {
    switch (action.type) {
        case ActionTypes.SIGN_IN_USER:
           return state = { isAuthenticated: true, user: action.userDetail };
        case ActionTypes.SIGN_OUT_USER:
            return state = { isAuthenticated: false, user: {} };
        default:
            return state;
    }
};

export default authReducer;