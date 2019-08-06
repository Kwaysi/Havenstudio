import { GETPACKAGES } from "../actions/type";

export default (state = {}, action) => {
  const { type, payload } = action;
  switch (type) {
    case GETPACKAGES: 
      return { ...state, packages: payload };
    default:
      return state;
  }
}