import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  public render() {
    return (
      <Html>
        <Head>
          <meta
            httpEquiv="Content-Security-Policy"
            content="upgrade-insecure-requests"
          />
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/nprogress/0.2.0/nprogress.min.css" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
