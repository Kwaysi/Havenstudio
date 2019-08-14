import { START, POSTBOOKING, BOOKINGFAILED } from "../actions/type";

const INITIAL = {
    isLoading: false
}

export default (state = INITIAL, action) => {
    const { type, payload } = action;
    switch (type) {
        case START:
            return {
                ...state,
                isLoading: payload.isLoading
            }
        case POSTBOOKING:
            return {
                ...state,
                isLoading: false,
                // msg: payload.msg
            }
        case BOOKINGFAILED:
            return {
                ...state,
                msg: payload.msg,
                isLoading: false
            }
        default:
            return state
    }
}
