import * as Bluebird from "bluebird";
import { Server } from "../../Server";
import { UPDATE_STORE } from "../constants";
import { actionCreators as asyncActions } from "./async";
import { PayloadAction, ThunkAction } from "./interfaces";

export interface UpdateStoreAction extends PayloadAction<number[]> {
  type: typeof UPDATE_STORE;
}

export const actionCreators = {
  updateStore(values: number[]): UpdateStoreAction {
    return { payload: values, type: UPDATE_STORE };
  },
  fetchFromServer(): ThunkAction<Bluebird<void>> {
    return dispatch => {
      return dispatch(
        asyncActions.startAsync(
          () =>
            Server.getStuff().then((payload: number[]) => {
              const result = actionCreators.updateStore(
                payload.filter(n => n < 0.5)
              );
              dispatch(result);
            }),
          "fetch-from-server"
        )
      );
    };
  }
};
