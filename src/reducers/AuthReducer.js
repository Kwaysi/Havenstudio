import { EMAILCHANGED, PASSWORDCHANGED, PHONECHANGED } from "../actions/type";

const INITIAL = {
  isLoggedIn: false
}

export default (state = INITIAL, action) => {
  const { type, payload } = action;
  switch (type) {
    case EMAILCHANGED:
      return { ...state, email: payload };
    case PASSWORDCHANGED:
      return { ...state, password: payload };
    case PHONECHANGED:
      return { ...state, phone: payload };
    default:
      return state
  }
}