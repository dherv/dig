import Head from 'next/head';
import { FC, ReactElement } from 'react';
import { Footer } from './Footer';
import { Nav } from './Nav';

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
      <div className="container mx-auto py-2 px-2">
        <header>
          <Nav />
        </header>
        <main>{children}</main>
        <Footer />
      </div>
    </>
  );
};
