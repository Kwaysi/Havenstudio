import { LOGIN, LOGOUT } from "../actions/type";

const token = localStorage.getItem('token');
const checkToken = token != null ? true : false;

console.log(checkToken);

const INITIAL = {
  token,
  isLoggedIn: checkToken,
  user: JSON.parse(localStorage.getItem('user')),
  userId: localStorage.getItem('userId')
}

export default (state = INITIAL, action) => {
  const { type, payload } = action;
  switch (type) {
    case LOGIN:
      return {
        ...state,
        user: payload.user,
        token: payload.token,
        userId: payload.userId,
        isLoggedIn: true
      }
    case LOGOUT:
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      localStorage.removeItem('userId')
      return {
        ...state,
        isLoggedIn: false
      }
    default:
      return state
  }
}
