import { createContext } from "react";
import { GlobalContextType } from "./types";

export const GlobalContext = createContext<GlobalContextType>(null);