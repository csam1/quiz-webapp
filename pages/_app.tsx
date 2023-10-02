import type { AppProps } from "next/app";
import { useReducer } from "react";
import reducer, { initialState } from "../src/store";
import { GlobalContext } from "../src/context";
import '../styles/_global.scss';

export default function App({ Component, pageProps }: AppProps) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <GlobalContext.Provider value={{ dispatch, state }}>
      <Component {...pageProps} />
    </GlobalContext.Provider>
  );
}
