import "@/styles/index.css";
import type { AppProps } from "next/app";
import BaseLayouts from "@/components/layouts/BaseLayouts";
import { Provider } from "react-redux";
import store from "@/redux";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <BaseLayouts>
        <Component {...pageProps} />
      </BaseLayouts>
    </Provider>
  )
}

export default MyApp;
