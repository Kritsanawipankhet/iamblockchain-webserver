import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ThirdwebProvider, ChainId } from "@thirdweb-dev/react";
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThirdwebProvider
      desiredChainId={ChainId.Rinkeby}
      supportedChains={[ChainId.Rinkeby]}
      walletConnectors={["injected", "walletConnect", "walletLink"]}
    >
      <Component {...pageProps} />
    </ThirdwebProvider>
  );
}

export default MyApp;
