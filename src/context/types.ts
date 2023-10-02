import { Dispatch } from "react";
import { StoreActions, StoreState } from "../store/types";

export type GlobalContextType = {
  state: StoreState;
  dispatch: Dispatch<StoreActions>;
} | null;
