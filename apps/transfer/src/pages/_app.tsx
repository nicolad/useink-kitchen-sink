import { MantineProvider } from '@mantine/core';
import type { AppProps } from 'next/app';
import React from 'react';
import dynamic from 'next/dynamic';
import { InkConfig } from 'useink';

const AlephZeroTestnet = {
  id: 'AlephZeroTestnet',
  name: 'Aleph Zero Testnet',
  ss58Prefix: 42,
  rpcUrls: ['wss://ws.test.azero.dev'],
  explorerUrls: ['https://azero.dev/?rpc=wss%3A%2F%2Fws.test.azero.dev'],
  testnet: true,
  token: {
    symbol: 'ALEPH',
  },
};

const UseInkProvider: React.ComponentType<React.PropsWithChildren<InkConfig>> = dynamic(
  () => import('useink').then(({ UseInkProvider }) => UseInkProvider),
  { ssr: false },
);

function App({ Component, pageProps }: AppProps) {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS theme={{ colorScheme: 'dark' }}>
      <UseInkProvider config={{ dappName: 'Playground', chains: [AlephZeroTestnet as any] }}>
        <Component {...pageProps} />
      </UseInkProvider>
    </MantineProvider>
  );
}

export default App;
