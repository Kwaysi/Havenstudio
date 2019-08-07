import { EMAILCHANGED, PASSWORDCHANGED, PHONECHANGED, REGISTER } from "./type";
import Axios from "axios";

export const emailChanged = (email) => {
  return {
    type: EMAILCHANGED,
    payload: email
  }
}

export const passChanged = (pass) => {
  return {
    type: PASSWORDCHANGED,
    payload: pass
  }
}

export const phoneChanged = (phone) => {
  return {
    type: PHONECHANGED,
    payload: phone
  }
}
export const registerSuccess = (user) => {
  return{
    type: REGISTER,
    payload: user
  }
}
export const conn = Axios.create({
  baseURL: 'http://localhost:2002/api'
});

export const logIn = (data) => {
  console.log(data);
  return (dispatch) => {
    conn.post('/login', data)
    .then (
      res => {
        console.log(res.data);
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
            localStorage.setItem("userId", userId);
      dispatch(registerSuccess(user, token, userId))
    })
    .catch(err => {
      console.log(err.response)
    })
  }
}