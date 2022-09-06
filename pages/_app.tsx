import { supabaseClient } from "@supabase/auth-helpers-nextjs";
import { UserProvider } from "@supabase/auth-helpers-react";
import type { AppProps } from "next/app";
import { SWRConfig } from "swr";
import { Layout } from "../components/layout/Layout";
import "../styles/globals.css";
import * as SWR from "../utils/swr";

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <SWRConfig
        value={{
          refreshInterval: 10000,
          fetcher: SWR.fetcher,
        }}
      >
        <UserProvider supabaseClient={supabaseClient}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </UserProvider>
      </SWRConfig>
    </>
  );
}

export default App;
