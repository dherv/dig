import { NextUIProvider } from "@nextui-org/react";
import { supabaseClient } from "@supabase/auth-helpers-nextjs";
import { UserProvider } from "@supabase/auth-helpers-react";
import type { AppProps } from "next/app";
import React from "react";
import { SWRConfig } from "swr";
import { Layout } from "../components/layout/Layout";
import * as SWR from "../services/swr";
import "../styles/globals.css";

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
          fetcher: SWR.fetcher,
          revalidateOnMount: true,
          revalidateOnReconnect: true,
        }}
      >
        <UserProvider supabaseClient={supabaseClient}>
          <NextUIProvider disableBaseline={true}>
            <LayoutComponent>
              <Component {...pageProps} />
            </LayoutComponent>
          </NextUIProvider>
        </UserProvider>
      </SWRConfig>
    </>
  );
}

export default App;
