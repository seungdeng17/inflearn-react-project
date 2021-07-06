import {
  createReducer,
  createSetValueAction,
  FETCH_PAGE,
  setValueReducer,
} from "../../common/redux-helper";

export const Types = {
  SetValue: "search/SetValue",
  FetchAutoComplete: "search/FetchAutoComplete",
  FetchAllHistory: "search/FetchAllHistory",
  AddHistory: "search/AddHistory",
  ResetAllHistoryPage: "search/ResetAllHistoryPage",
};

export const actions = {
  setValue: createSetValueAction(Types.SetValue),
  fetchAutoComplete: (keyword) => ({
    type: Types.FetchAutoComplete,
    keyword,
  }),
  fetchAllHistory: ({ page }) => ({
    type: Types.FetchAllHistory,
    page,
    [FETCH_PAGE]: page,
  }),
  addHistory: (history) => ({ type: Types.AddHistory, history }),
};

const INITIAL_STATE = {
  keyword: "",
  autoCompletes: [],
  history: [],
};

const reducer = createReducer(INITIAL_STATE, {
  [Types.SetValue]: setValueReducer,
  [Types.AddHistory]: (state, action) =>
    (state.history = [...state.history, ...action.history]),
});

export default reducer;
