import ActionTypes from "./../actions/ActionTypes";

const usersList = (state = {
    usersList: []
}, action) => {
    switch (action.type) {
        case ActionTypes.GET_USERS:
           return state = { usersList: action.data };
        default:
            return state;
    }
};

export default usersList;