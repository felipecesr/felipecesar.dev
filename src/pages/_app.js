import Head from "next/head";
import { DefaultSeo } from "next-seo";
import { TagManagerHead } from "components/TagManager";
import Layout from "components/Layout";

import SEO from "../next-seo.config";

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Head>
        <meta name="theme-color" content="#111216" />
        <TagManagerHead />
      </Head>
      <DefaultSeo {...SEO} />
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
