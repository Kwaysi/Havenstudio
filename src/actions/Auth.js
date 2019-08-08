import { LOGIN, LOGOUT, LOGINFAILED, SIGNUPFAILED } from "./type";
import Axios from "axios";

export const loginSuccess = (user, token) => {
  return {
    type: LOGIN,
    payload: {
      user, token
    }
  }
};
export const conn = Axios.create({
  baseURL: 'http://192.168.8.101:8080/api'
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
          console.log(err.response);
        }
      );
  }
};

export const register = (authData) => {
  console.log(authData)
  return (dispatch) => {
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

export const logout = () => {
  return {
    type: LOGOUT
  }
}
