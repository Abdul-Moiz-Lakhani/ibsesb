import ActionTypes from "./ActionTypes";

export function startLoader() {
    return {
        type: ActionTypes.SHOW_LOADER
    }
}

export function stopLoader() {
    return {
        type: ActionTypes.STOP_LOADER
    }
}
