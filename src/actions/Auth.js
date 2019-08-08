import { LOGIN, LOGOUT } from "./type";
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
          console.log(err);
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
        console.log(err.response)
      })
  }
}

export const logout = () => {
  return {
    type: LOGOUT
  }
}
