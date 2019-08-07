import { REGISTER, LOGINSUCCESSFUL } from "./type";
import Axios from "axios";


export const registerSuccess = (user, userId) => {
  return{
    type: REGISTER,
    payload: {
      user, userId
    }
  }
};
export const loginSuccess = (user, userId) => {
  return{
    type: LOGINSUCCESSFUL,
    payload: {
      user, userId
    }
  }
};
export const conn = Axios.create({
  baseURL: 'http://192.168.8.102:8080/api'
});

export const logIn = (data) => {
  console.log(data);
  return (dispatch) => {
    conn.post('/login', data)
    .then (
      res => {
        console.log(res.data);
        const { user, token } = res.data;
            const userId = user.id;
            localStorage.setItem("token", token);
            localStorage.setItem("userId", userId);
      dispatch(loginSuccess(user, token, userId))
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
            const userId = user.id;
            localStorage.setItem("token", token);
            localStorage.setItem("user", user);
      dispatch(registerSuccess(user, token))
    })
    .catch(err => {
      console.log(err.response)
    })
  }
}