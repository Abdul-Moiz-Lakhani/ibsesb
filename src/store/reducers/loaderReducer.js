import ActionTypes from "./../actions/ActionTypes";

const loaderReducer = (state = {
    status: false
}, action) => {
    switch (action.type) {
        case ActionTypes.SHOW_LOADER:
           return state = { status: true };
        case ActionTypes.STOP_LOADER:
            return state = { status: false };
        default:
            return state;
    }
};

export default loaderReducer;