import { supabaseClient } from "@supabase/auth-helpers-nextjs";
import { UserProvider } from "@supabase/auth-helpers-react";
import type { AppProps } from "next/app";
import React from "react";
import { SWRConfig } from "swr";
import { Layout } from "../components/layout/Layout";
import "../styles/globals.css";
import * as SWR from "../utils/swr";

function App({ Component, pageProps, ...appProps }: AppProps) {
  // prevent loading the layout for the login page
  const isLayoutNeeded = ![`/login`, `/register`].includes(
    appProps.router.pathname
  );
  const LayoutComponent = isLayoutNeeded ? Layout : React.Fragment;

  return (
    <>
      <SWRConfig
        value={{
          refreshInterval: 10000,
          fetcher: SWR.fetcher,
        }}
      >
        <UserProvider supabaseClient={supabaseClient}>
          <LayoutComponent>
            <Component {...pageProps} />
          </LayoutComponent>
        </UserProvider>
      </SWRConfig>
    </>
  );
}

export default App;
