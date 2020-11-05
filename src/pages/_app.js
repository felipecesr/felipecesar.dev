import Head from "next/head";
import Router from "next/router";
import { useEffect } from "react";
import { DefaultSeo } from "next-seo";

import SEO from "next-seo.config";
import Layout from "components/Layout";
import { GTMPageView } from "utils/gtm";

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    const handleRouteChange = (url) => GTMPageView(url);
    Router.events.on("routeChangeComplete", handleRouteChange);

    return () => {
      Router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, []);

  return (
    <Layout>
      <Head>
        <meta name="theme-color" content="#111216" />
        <link
          rel="alternate"
          type="application/rss+xml"
          title="RSS feed for blog posts"
          href="https://felipecesar.dev/rss.xml"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','${process.env.NEXT_PUBLIC_GTM}');
            `,
          }}
        />
      </Head>
      <DefaultSeo {...SEO} />
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
