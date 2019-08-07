import { EMAILCHANGED, PASSWORDCHANGED, PHONECHANGED, REGISTER } from "../actions/type";

export default (state = {}, action) => {
  const { type, payload } = action;
  switch (type) {
    case EMAILCHANGED:
      return { ...state, email: payload };
    case PASSWORDCHANGED:
      return { ...state, password: payload };
    case PHONECHANGED:
      return { ...state, phone: payload };
      case REGISTER:
        return{
          ...state,
          user : payload
        }
    default:
      return state
  }
}