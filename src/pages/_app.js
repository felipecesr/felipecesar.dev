import Head from "next/head";
import { DefaultSeo } from "next-seo";
import Layout from "components/Layout";

import SEO from "../next-seo.config";

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Head>
        <meta name="theme-color" content="#111216" />
      </Head>
      <DefaultSeo {...SEO} />
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
