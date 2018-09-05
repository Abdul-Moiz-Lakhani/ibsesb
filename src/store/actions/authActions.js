import ActionTypes from "./ActionTypes";

export function userSignIn(user) {
    return {
        type: ActionTypes.SIGN_IN_USER,
        userDetail: user
    }
}

export function userSignOut() {
    return {
        type: ActionTypes.SIGN_OUT_USER
    }
}
