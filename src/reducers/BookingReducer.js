import { START, POSTBOOKING, BOOKINGFAILED, CHECK_STATUS, CHECK_FAILED } from "../actions/type";

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
        case POSTBOOKING:
            return {
                ...state,
                isSubmitting: false,
                // msg: payload.msg
            }
        case BOOKINGFAILED:
            return {
                ...state,
                msg: payload.msg,
                isSubmitting: false
            }
        case CHECK_STATUS:
            return {
                ...state,
                checkStatus: action.data,
                msg: ""

            };
        case CHECK_FAILED:
            return {
                ...state,
                checkStatus: action.error,
                msg: 'Session not available',


            };
        default:
            return state
    }
}
