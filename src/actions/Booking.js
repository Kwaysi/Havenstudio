import { conn } from "./Auth";
import { START, POSTBOOKING, BOOKINGFAILED, CHECK_STATUS, CHECK_FAILED } from "./type";
import { updateUserSubscriptionRecord, updateSubscription, subscriptionFailed } from './Subscription';

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

export const checkStatus = (dispatch, data) => {
    dispatch({
        type: CHECK_STATUS,
        data
    });
};
export const checkFailed = error => ({
    type: CHECK_FAILED,
    error
});

export const booking = (data) => {
    return (dispatch) => {
        dispatch(start())
        // console.log(data)

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

export const bookingSession = (data) => {
    return (dispatch) => {
        dispatch(start())
        // console.log(data)

        if (data.subscription > 0) {
            console.log('get user subscription')
            conn.get(`/subscription/${data.subscription}`)
                .then(res => {

                    if (res.data.data.status !== 'Expired') {
                        const uData = {
                            id: res.data.data.id,
                            package: res.data.data.package,
                            type: res.data.data.type,
                            plan: res.data.data.plan
                        }
                        // console.log('update user sub')
                        conn.post('/booking/create', data)
                            .then(res => {
                                dispatch(updateUserSubscriptionRecord(uData))
                                dispatch(bookingSuccess(res.data))

                            }
                            )
                            .catch(err => {
                                dispatch(bookingFailed(err.response.data))
                            }
                            );
                    }
                    else {
                        console.log('package expired')
                        dispatch(bookingFailed({ 'msg': 'package expired' }))

                    }
                })
        } else {
            console.log('create user subscription', data)

            conn.post('/booking/create', data)
                .then(res => {
                    // console.log(data)
                    const postData = {
                        user: data.user,
                        package: data.package,
                        type: data.type,
                        plan: data.plan,
                        days: data.days - 1
                    }
                    conn.post('/subscription/create', postData)
                        .then(res => {
                            // console.log(res.data.data.id)
                            dispatch(updateSubscription(res.data.data.id))
                            dispatch(bookingSuccess(res.data))
                        }
                        )
                        .catch(err => {
                            dispatch(subscriptionFailed(err.response.data))
                            // console.log(err.response)
                        }
                        )
                }
                )
                .catch(err => {
                    dispatch(bookingFailed(err.response.data))
                }
                );
        }
    }
};


export const checkBooking = (data) => {
    return (dispatch) => {
        // console.log(data)
        conn.get(`/booking/check/${data.date}/${data.timeframe}`)
            .then(res => {
                // console.log(res.data, data)
                checkStatus(dispatch, res.data.success);
            })
            .catch(err => {
                dispatch(checkFailed(err.response.data.success));
                // console.log(err.response.data, data)

            });
    }
};
