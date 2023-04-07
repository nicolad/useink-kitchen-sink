import Head from 'next/head';

import dynamic from 'next/dynamic';

const HomePage = dynamic(() => import('../components/HomePage'), {
  ssr: false,
});

export default function Index() {
  return (
    <>
      <Head>
        <title>DNS - smart contract</title>
        <meta name="description" content="useink Kitchen Sink" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <HomePage />
    </>
  );
}
