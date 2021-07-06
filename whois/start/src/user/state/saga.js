import { all, call, put, takeEvery, takeLeading } from "redux-saga/effects";
import { callApi } from "../../common/util/api";
import { deleteApiCache, makeFetchSaga } from "../../common/util/fetch";
import { actions, Types } from "./index";

function* fetchUser({ name }) {
  const { isSuccess, data } = yield call(callApi, {
    url: "/user/search",
    params: { keyword: name },
  });

  if (isSuccess && data) {
    const user = data.find((item) => item.name === name);
    yield put(actions.setValue("user", user));
  }
}

function* fetchUpdateUser({ user, key, value }) {
  const oldValue = user[key];
  yield put(actions.setValue("user", { ...user, [key]: value }));
  const { isSuccess, data } = yield call(callApi, {
    url: "/user/update",
    method: "post",
    data: { name: user.name, key, value, oldValue },
  });

  if (isSuccess && data) {
    deleteApiCache();
    yield put(actions.addHistory(data.history));
  } else {
    yield put(actions.setValue("user", user));
  }
}

function* fetchUserHistory({ name, page }) {
  const { isSuccess, data } = yield call(callApi, {
    url: "/history",
    params: { name, page },
  });

  if (isSuccess && data) {
    if (page) {
      yield put(actions.addHistoryPage(data));
    } else {
      yield put(actions.setValue("userHistory", data));
    }
    yield put(actions.setValue("page", page));

    if (!data.length) yield put(actions.setValue("noMoreHistory", true));
  }
}

export default function* () {
  yield all([
    takeEvery(
      Types.FetchUser,
      makeFetchSaga({ fetchSaga: fetchUser, canCache: true })
    ),
    takeLeading(
      Types.FetchUpdateUser,
      makeFetchSaga({ fetchSaga: fetchUpdateUser, canCache: false })
    ),
    takeLeading(
      Types.FetchUserHistory,
      makeFetchSaga({ fetchSaga: fetchUserHistory, canCache: false })
    ),
  ]);
}
