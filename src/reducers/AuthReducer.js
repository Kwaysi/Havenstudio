import { REGISTER, LOGINSUCCESSFUL } from "../actions/type";

const INITIAL = {
  isLoggedIn: false
}

export default (state = INITIAL, action) => {
  const { type, payload } = action;
  switch (type) {
    case REGISTER:
        return{
          ...state,
          user : payload.user,
          token: payload.token,
          userId: payload.userId,
          isAuth: true
        }
    case LOGINSUCCESSFUL:
      return{
        ...state,
        user: payload.user,
        token: payload.token,
        userId: payload.userId,
        isLoggedIn: true
      }
    default:
      return state
  }
}