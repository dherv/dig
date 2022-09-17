import Head from "next/head";
import { FC, ReactElement } from "react";
import { Footer } from "./Footer";
import { Nav } from "./Nav";

export const Layout: FC<{ children: ReactElement }> = ({ children }) => {
  return (
    <>
      <Head>
        <title>Dig!</title>
        <meta
          name="description"
          content="Get the latest and upcoming movies"
          key="description"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <header>
          <Nav />
        </header>
        <main className="py-2 ">
          <div className="flex">
            <section className=" overflow-hidden w-full">{children}</section>
            {/* <aside>
            <Sidebar />
          </aside> */}
          </div>
        </main>
      </div>
      <Footer />
    </>
  );
};
