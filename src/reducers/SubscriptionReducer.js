import { START, SUBSCRIPTIONSUCCESS, SUBSCRIPTIONFAILED, UPDATESUBSCRIPTION } from "../actions/type";

const INITIAL = {
    isSubmitting: false
}

export default (state = INITIAL, action) => {
    const { type, payload } = action;
    switch (type) {
        case START:
            return {
                ...state,
                isSubmitting: payload.isSubmitting
            }
        case SUBSCRIPTIONSUCCESS:
            return {
                ...state,
                isSubmitting: false,
                // msg: payload.msg
            }
        case SUBSCRIPTIONFAILED:
            return {
                ...state,
                msg: payload.msg,
            }
        case UPDATESUBSCRIPTION:
            return {
                ...state,
                isSubmitting: false,
            }
        default:
            return state
    }
}
