import { GETPACKAGES, SETSELECTEDPACKAGE } from "../actions/type";

export default (state = {}, action) => {
  const { type, payload } = action;
  switch (type) {
    case GETPACKAGES:
      return { ...state, packages: payload };
    case SETSELECTEDPACKAGE:
      return { ...state, selectedPackage: payload }
    default:
      return state;
  }
}
