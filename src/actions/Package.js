import { conn } from "./Auth";
import { GETPACKAGES, SETSELECTEDPACKAGE } from "./type";

export const getPackages = ()  => {
  return (dispatch) => {
    conn.get('/package')
      .then (
        res => {
          console.log(res.data);
          dispatch({type: GETPACKAGES, payload: res.data.data});
        }
      )
    .catch (
      error => {
        if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else  {
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        }
      }
    )
  }
}

export const setPackage = (pack, type, plan) => {
  return {
    type: SETSELECTEDPACKAGE,
    payload: {
      pack, type, plan
    }
  }
}