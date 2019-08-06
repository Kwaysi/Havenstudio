import { EMAILCHANGED, PASSWORDCHANGED, PHONECHANGED } from "../actions/type";

export default (state = {}, action) => {
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