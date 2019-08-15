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
                isSubmitting: payload.isSubmitting,
                booked: false
            }
        case POSTBOOKING:
            return {
                ...state,
                isSubmitting: false,
                booked: true
            }
        case BOOKINGFAILED:
            return {
                ...state,
                msg: payload.msg,
                isSubmitting: false,
                booked: false
            }
        case CHECK_STATUS:
            return {
                ...state,
                checkStatus: action.data,
                msg: "",
                booked: false
            };
        case CHECK_FAILED:
            return {
                ...state,
                checkStatus: action.error,
                msg: 'Session not available',
                booked: false
            };
        default:
            return state
    }
}
