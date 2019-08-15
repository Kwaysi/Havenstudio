import { LOGIN, LOGOUT, LOGINFAILED, SIGNUPFAILED, START, UPDATEUSER } from "./type";
import Axios from "axios";

export const start = () => {
  return {
    type: START,
    payload: {
      isLoading: true
    }
  }
};

export const loginSuccess = (user, token) => {
  return {
    type: LOGIN,
    payload: {
      user, token
    }
  }
};
export const conn = Axios.create({
  baseURL: 'http://192.168.8.105:8080/api'
});

export const logInFailed = (msg) => {
  return {
    type: LOGINFAILED,
    payload: msg.msg
  }
};

export const signupFailed = (msg) => {
  return {
    type: SIGNUPFAILED,
    payload: msg.msg
  }
};

export const logIn = (data) => {
  console.log(data);
  return (dispatch) => {
    dispatch(start())
    conn.post('/login', data)
      .then(
        res => {
          console.log(res.data);
          const { user, token } = res.data;
          localStorage.setItem("token", token);
          localStorage.setItem("user", JSON.stringify(user));
          dispatch(loginSuccess(user, token))
        }
      )
      .catch(
        err => {
          dispatch(logInFailed(err.response.data))
          console.log(err.response.data);
        }
      );
  }
};

export const register = (authData) => {
  console.log(authData)
  return (dispatch) => {
    dispatch(start())
    conn.post("/register", authData)
      .then(res => {
        console.log(res.data)
        const { user, token } = res.data;
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
        dispatch(loginSuccess(user, token))
      })
      .catch(err => {
        dispatch(signupFailed(err.response.data))
        console.log(err.response)
      })
  }
};

export const updateUser = (prevToken) => {
  conn.defaults.headers.common['Authorization'] = `Bearer ${prevToken}`;
  return (dispatch) => {
    conn.get('/user')
      .then(
        res => {
          const { user } = res.data;
          localStorage.setItem("user", JSON.stringify(user));
          dispatch({ type: UPDATEUSER, payload: user })
        }
      )
      .catch(
        error => {
          if (error.response) {
            console.log(error.response);
            dispatch(logout);
          } else if (error.request) {
            console.log(error.response);
          } else {
            console.log(error.response);
          }
        }
      )
  }
}

export const logout = () => {
  return {
    type: LOGOUT
  }
}
