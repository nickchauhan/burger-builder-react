import { put } from "redux-saga/effects";
import axios from "../../axios-orders";
import * as actions from "../actions/index";

export function* fetchOrdersSaga(action) {
  yield put(actions.fetchOrdersStart());
  const queryParms =
    "?auth=" + action.token + '&orderBy="userId"&equalTo' + action.userId;
  try {
    const response = yield axios.get("/orders.json" + queryParms);
    const fetchOrders = [];
    for (let key in response.data) {
      fetchOrders.push({
        ...response.data[key],
        id: key
      });
    }
    // Dispatch Fetch Order Success
    yield put(actions.fetchOrdersSuccess(fetchOrders));
  } catch (error) {
    // Dispatch Fetch Order Fail
    yield put(actions.fetchOrdersFail(error));
  }
}

export function* purchaseBurgerSaga(action) {
  yield put(actions.purchaseBurgerStart());
  try {
    const response = yield axios.post(
      "/orders.json?auth=" + action.token,
      action.orderData
    );
    console.log(response);
    yield put(
      actions.purchaseBurgerSuccess(response.data.name, action.orderData)
    );
  } catch (error) {
      console.log(error);
    yield put(actions.purchaseBurgerFail(error));
  }
}
