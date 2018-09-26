import ActionTypes from "./ActionTypes";

export function getUsers(data) {
    return {
        type: ActionTypes.GET_USERS,
        data: data
    }
}