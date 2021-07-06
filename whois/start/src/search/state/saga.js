import { all, call, put, takeEvery, takeLeading } from "redux-saga/effects";
import { actions, Types } from "./index";
import { callApi } from "../../common/util/api";
import { makeFetchSaga } from "../../common/util/fetch";

function* fetchAutoComplete({ keyword }) {
  const { isSuccess, data } = yield call(callApi, {
    url: "/user/search",
    params: { keyword },
  });

  if (isSuccess && data) {
    yield put(actions.setValue("autoCompletes", data));
  }
}

function* fetchAllHistory({ page }) {
  const { isSuccess, data } = yield call(callApi, {
    url: "/history",
    params: {
      page,
    },
  });

  if (isSuccess && data) {
    if (page) {
      yield put(actions.addHistory(data));
      yield put(actions.setValue("page", page));
    } else {
      yield put(actions.setValue("history", data));
      yield put(actions.setValue("page", page));
    }
  }
}

export default function* () {
  yield all([
    takeEvery(
      Types.FetchAutoComplete,
      makeFetchSaga({ fetchSaga: fetchAutoComplete, canCache: true })
    ),
    takeLeading(
      Types.FetchAllHistory,
      makeFetchSaga({ fetchSaga: fetchAllHistory, canCache: false })
    ),
  ]);
}
