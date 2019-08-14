import { START, POSTBOOKING, BOOKINGFAILED } from "../actions/type";

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
        default:
            return state
    }
}
