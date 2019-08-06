import { EMAILCHANGED, PASSWORDCHANGED, PHONECHANGED } from "./type";
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
}