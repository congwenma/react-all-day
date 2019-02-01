import { UpdateStoreAction } from "../actions/server-fetch";
import { UPDATE_STORE } from "../constants";

export type State = Readonly<{
  value: number[];
}>;

export const initialState: State = {
  value: []
};

export const reducer = (
  state = initialState,
  action: UpdateStoreAction
): State => {
  switch (action.type) {
    case UPDATE_STORE:
      // The following antipattern is not allowed thanks to the Readonly type:
      // state.value += action.payload;
      // return state;
      console.log("action payload");
      return { ...state, value: action.payload };
    default:
      return state;
  }
};
