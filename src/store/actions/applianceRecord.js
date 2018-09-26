import ActionTypes from "./ActionTypes";
import * as firebase from 'firebase'

export function getAppliances(data) {
    return {
        type: ActionTypes.GET_APPLIANCES,
        data: data
    }
}

export function toggleStatus(i, s) {
    firebase.database().ref(`board1/appliances/${i}/status`).set(!s);
}

