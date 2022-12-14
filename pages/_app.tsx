import "@fontsource/public-sans";
import CssBaseline from "@mui/joy/CssBaseline";
import { CssVarsProvider, getInitColorSchemeScript } from "@mui/joy/styles";
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { SessionContextProvider } from "@supabase/auth-helpers-react";

import type { AppProps } from "next/app";
import Head from "next/head";
import React, { useState } from "react";
import { SWRConfig } from "swr";
import { Layout } from "../components/layout/Layout";
import { theme } from "../services/material/material.themes";
import * as SWR from "../services/swr";
import "../styles/globals.css";

function App({ Component, pageProps, ...appProps }: AppProps) {
  // prevent loading the layout for the login page
  const isLayoutNeeded = ![`/login`, `/register`].includes(
    appProps.router.pathname
  );
  const LayoutComponent = isLayoutNeeded ? Layout : React.Fragment;

  // Create a new supabase browser client on every first render.
  const [supabaseClient] = useState(() => createBrowserSupabaseClient());

  return (
    <>
      <SWRConfig
        value={{
          fetcher: SWR.fetcher,
          revalidateOnMount: true,
          revalidateOnReconnect: true,
        }}
      >
        <SessionContextProvider
          supabaseClient={supabaseClient}
          initialSession={pageProps.initialSession}
        >
          <CssVarsProvider theme={theme}>
            <CssBaseline />
            <Head>
              <meta charSet="utf-8" />
              <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
              <meta
                name="viewport"
                content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no"
              />
              <meta name="description" content="Description" />
              <meta name="keywords" content="Keywords" />
              <title>Dig!</title>

              <link rel="manifest" href="/manifest.json" />
              <link
                href="/icons/favicon-16x16.png"
                rel="icon"
                type="image/png"
                sizes="16x16"
              />
              <link
                href="/icons/favicon-32x32.png"
                rel="icon"
                type="image/png"
                sizes="32x32"
              />
              <link rel="apple-touch-icon" href="/apple-icon.png"></link>
              <meta name="theme-color" content="#317EFB" />
            </Head>

            {getInitColorSchemeScript()}
            <LayoutComponent>
              <Component {...pageProps} />
            </LayoutComponent>
          </CssVarsProvider>
        </SessionContextProvider>
      </SWRConfig>
    </>
  );
}

export default App;
