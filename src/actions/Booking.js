import { conn } from "./Auth";
import { START, POSTBOOKING, BOOKINGFAILED } from "./type";


export const start = () => {
    return {
        type: START,
        payload: {
            isSubmitting: true
        }
    }
};

export const bookingSuccess = (data) => {
    return {
        type: POSTBOOKING,
        payload: data
    }
};

export const bookingFailed = (data) => {
    return {
        type: BOOKINGFAILED,
        payload: data
    }
};

export const booking = (data) => {
    return (dispatch) => {
        dispatch(start())
        conn.post('/booking/create', data)
            .then(res => {
                dispatch(bookingSuccess(res.data))
            }
            )
            .catch(err => {
                dispatch(bookingFailed(err.response.data))
            }
            );
    }
};
