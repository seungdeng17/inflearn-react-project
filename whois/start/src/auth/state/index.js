import { AuthStatus } from "../../common/constant";
import {
  createReducer,
  createSetValueAction,
  setValueReducer,
} from "../../common/redux-helper";

export const Types = {
  SetValue: "auth/SetValue",
  FetchLogin: "auth/fetchLogin",
  SetUser: "auth/SetUser",
  FetchSignup: "auth/FetchSignup",
  FetchUser: "auth/FetchUser",
  FetchLogout: "auth/FetchLogout",
};

export const actions = {
  setValue: createSetValueAction(Types.SetValue),
  fetchLogin: (name, password) => ({ type: Types.FetchLogin, name, password }),
  setUser: (name) => ({ type: Types.SetUser, name }),
  fetchSignup: (email) => ({ type: Types.FetchSignup, email }),
  fetctUser: () => ({ type: Types.FetchUser }),
  fetchLogout: () => ({ type: Types.FetchLogout }),
};

const INITIAL_STATE = {
  name: "",
  status: undefined,
};

const reducer = createReducer(INITIAL_STATE, {
  [Types.SetValue]: setValueReducer,
  [Types.SetUser]: (state, action) => {
    state.name = action.name;
    state.status = action.name ? AuthStatus.Login : AuthStatus.NotLogin;
  },
});

export default reducer;
