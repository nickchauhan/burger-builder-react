import { put } from "redux-saga/effects";
import * as actions from "../actions/index";
import axios from "../../axios-orders";

export function* fetchIngredientsSaga() {
  try {
    const response = yield axios.get("/ingredients.json");
    yield put(actions.setIngredient(response.data));
  } catch (error) {
    yield put(actions.fetchIngredientFailed());
  }
}
