import { combineReducers } from "redux";
import { reducer as async, State as AsyncState } from "./async";
import { reducer as breadcrumb, State as BreadcrumbState } from "./breadcrumb";
import { reducer as counter, State as CounterState } from "./counter";

export interface RootState {
  async: AsyncState;
  counter: CounterState;
  breadcrumb: BreadcrumbState;
}

export const rootReducer = combineReducers<RootState>({
  async,
  counter,
  breadcrumb
});
