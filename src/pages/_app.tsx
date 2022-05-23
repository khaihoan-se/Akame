import "@/styles/index.css";
import type { AppProps } from "next/app";
import BaseLayouts from "@/components/layouts/BaseLayouts";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <BaseLayouts>
      <Component {...pageProps} />
    </BaseLayouts>
  )
}

export default MyApp;
