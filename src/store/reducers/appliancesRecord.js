import ActionTypes from "./../actions/ActionTypes";

const appliancesRecord = (state = {
    appliances: []
}, action) => {
    switch (action.type) {
        case ActionTypes.GET_APPLIANCES:
           return state = { appliances: action.data };
        default:
            return state;
    }
};

export default appliancesRecord;