import {
  createReducer,
  createSetValueAction,
  FETCH_KEY,
  FETCH_PAGE,
  NOT_IMMUTABLE,
  setValueReducer,
} from "../../common/redux-helper";

export const Types = {
  SetValue: "user/SetValue",
  FetchUser: "user/FetchUser",
  FetchUpdateUser: "user/FetchUpateUser",
  FetchUserHistory: "user/FetchUserHistory",
  AddHistory: "user/AddHistory",
  Initialize: "user/Initialize",
  AddHistoryPage: "user/AddHistoryPage",
};

export const actions = {
  setValue: createSetValueAction(Types.SetValue),
  fetchUser: (name) => ({
    type: Types.FetchUser,
    name,
  }),
  fetchUpdateUser: ({ user, key, value, fetchKey }) => ({
    type: Types.FetchUpdateUser,
    user,
    key,
    value,
    [FETCH_KEY]: fetchKey,
  }),
  fetchUserHistory: ({ name, page }) => ({
    type: Types.FetchUserHistory,
    name,
    page,
    [FETCH_PAGE]: page,
  }),
  addHistory: (history) => ({
    type: Types.AddHistory,
    history,
  }),
  initialize: () => ({
    type: Types.Initialize,
    [NOT_IMMUTABLE]: true,
  }),
  addHistoryPage: (history) => ({
    type: Types.AddHistoryPage,
    history,
  }),
};

const INITIAL_STATE = {
  user: undefined,
  userHistory: [],
};

const reducer = createReducer(INITIAL_STATE, {
  [Types.SetValue]: setValueReducer,
  [Types.AddHistory]: (state, action) =>
    (state.userHistory = [action.history, ...state.userHistory]),
  [Types.Initialize]: () => INITIAL_STATE,
  [Types.AddHistoryPage]: (state, action) => {
    state.userHistory = [...state.userHistory, ...action.history];
  },
});

export default reducer;
