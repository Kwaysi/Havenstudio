import { LOGIN, LOGOUT, LOGINFAILED, SIGNUPFAILED} from "../actions/type";

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
      case LOGINFAILED:
          return{
            ...state,
            msg: payload
          }
      case SIGNUPFAILED:
          return{
            ...state,
            msg: payload
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
