import { conn } from "./Auth";
import { START, SUBSCRIPTIONSUCCESS, SUBSCRIPTIONFAILED, UPDATESUBSCRIPTION } from "./type";


export const start = () => {
    return {
        type: START,
        payload: {
            isSubmitting: true
        }
    }
};

export const subscriptionSuccess = (data) => {
    return {
        type: SUBSCRIPTIONSUCCESS,
        payload: data
    }
};

export const subscriptionFailed = (data) => {
    return {
        type: SUBSCRIPTIONFAILED,
        payload: data
    }
};

export const updateSubscriptionSuccess = (data) => {
    return {
        type: UPDATESUBSCRIPTION,
        payload: data
    }
};


export const subscribe = (data) => {
    return (dispatch) => {
        dispatch(start())
        conn.post('/subscription/create', data)
            .then(res => {
                // dispatch(subscriptionSuccess(res.data))
                return res.data;
            }
            )
            .catch(err => {
                dispatch(subscriptionFailed(err.response.data))
            }
            );
    }
};

export const getSubscription = (id) => {
    return (dispatch) => {
        dispatch(start())
        conn.get(`/subscription/${id}`)
            .then(res => {

                // dispatch(subscriptionSuccess(res.data))
                // console.log(res.data);
            }
            )
            .catch(err => {
                // dispatch(subscriptionFailed(err.response.data))
                console.log(err.response.data);
            }
            );
    }
};

export const updateSubscription = data => (dispatch, getState) => {
    const token = getState().Auth.token;

    // Headers
    const config = {
        headers: {}
    };

    if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
    }

    conn.post('/update/subscription', { subscription: data }, config)
        .then(res => {
            updateSubscriptionSuccess(dispatch, data);
        })
        .catch(err =>
            dispatch(subscriptionFailed(err))
        );
};

export const updateUserSubscriptionRecord = (data) => {
    return (dispatch, getState) => {
        const token = getState().Auth.token;

        // Headers
        const config = {
            headers: {}
        };

        if (token) {
            config.headers["Authorization"] = `Bearer ${token}`;
        }

        conn.post(`/user/subscription/${data.id}`, data, config)
            .then(res => {

                dispatch(updateSubscriptionSuccess(res.data))
                // console.log(res.data);
            }
            )
            .catch(err => {
                dispatch(subscriptionFailed(err.response.data))
                // console.log(err.response.data);
            }
            );
    }
};
