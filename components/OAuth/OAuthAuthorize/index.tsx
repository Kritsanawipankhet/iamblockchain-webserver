import React, { useEffect } from "react";
import Styles from "@/styles/styles.module.css";
import { ethers } from "ethers";
import {
  useChainId,
  useNetwork,
  useAddress,
  useDisconnect,
  useConnect,
  useCoinbaseWallet,
  useMetamask,
  useWalletConnect,
  useNetworkMismatch,
} from "@thirdweb-dev/react";
import detectEthereumProvider from "@metamask/detect-provider";
import { WalletIcon } from "@/components/icon/";

let disconnectWallet: any,
  address: any,
  network: any,
  ethersConnect: any,
  chainId: any;
type Props = {};
declare let window: any;
export default function OAuthAuthorize({}: Props) {
  disconnectWallet = useDisconnect();
  address = useAddress();
  network = useNetwork();
  ethersConnect = useConnect();
  chainId = useChainId();

  const switchEthereumChain = useEffect(() => {
    if (chainId !== 4 && ethersConnect[0].data.connected) {
      (async () => {
        if (typeof window !== "undefined") {
          let ethereum = new ethers.providers.Web3Provider(window.ethereum);
          try {
            await ethereum.send("wallet_switchEthereumChain", [
              { chainId: "0x4" },
            ]);
          } catch (switchError: any) {
            // This error code indicates that the chain has not been added to MetaMask.
            if (switchError.code === 4902) {
              try {
                await ethereum.send("wallet_addEthereumChain", [
                  [
                    {
                      chainId: "0x4",
                      chainName: "Rinkeby",
                      rpcUrls: [
                        "https://rinkeby.infura.io/v3/81a30e2706b04f5489a74021a6a5ff42",
                      ] /* ... */,
                    },
                  ],
                ]);
              } catch (addError) {
                disconnectWallet();
                // handle "add" error
              }
            }
            disconnectWallet();
            // handle other "switch" errors
          }
        }
      })();
    }
  }, [ethersConnect[0].data.connected]);

  try {
    if (typeof window !== "undefined") {
      window.ethereum.on("chainChanged", (_chainId: string) => {
        if (_chainId !== "0x4") {
          disconnectWallet();
        }
      });
    }
  } catch (chainChangeError: any) {
    console.log(chainChangeError);
    if (chainChangeError.code === 4001) {
      disconnectWallet();
    }
  }

  let connectWithCoinbaseWallet = useCoinbaseWallet();
  let connectWithMetamask = useMetamask();
  let connectWithWalletConnect = useWalletConnect();

  if (address) {
    return (
      <>
        <form onSubmit={createAuthorize}>
          <div
            className={`${Styles.dFlex} ${Styles.flexJustifyCenter} ${Styles.flexGap2}`}
          >
            <button
              type="button"
              onClick={() => disconnectWallet()}
              className={`${Styles.btn} ${Styles.btn} ${Styles.widthFull} ${Styles.wsNormal}`}
            >
              Disconnect Wallet
            </button>
            <button
              type="button"
              className={`${Styles.textCenter} ${Styles.btn} ${Styles.btn} ${Styles.btnPrimary} ${Styles.widthFull} ${Styles.wsNormal} ${Styles.textSmall}`}
              onClick={(e) => createAuthorize(e)}
            >
              Authorize
            </button>
          </div>
        </form>
      </>
    );
  }

  return (
    <>
      <div
        className={`${Styles.dFlex} ${Styles.flexJustifyCenter} ${Styles.flexGap2}`}
      >
        <button
          type="button"
          className={`${Styles.btn} ${Styles.btn} ${Styles.widthFull} ${Styles.wsNormal}`}
        >
          Cancel
        </button>
        <button
          type="button"
          className={`${Styles.textCenter} ${Styles.btn} ${Styles.btn} ${Styles.btnPrimary} ${Styles.widthFull} ${Styles.wsNormal} ${Styles.textSmall}`}
          onClick={() => connectWithCoinbaseWallet()}
        >
          <WalletIcon
            className={`${Styles.colorFgOnEmphasis} ${Styles.Octicon}`}
          />{" "}
          Connect Wallet
        </button>
      </div>
    </>
  );
}

const createAuthorize = (e: any) => {
  e.preventDefault();
  console.log(e);
  alert("Authorize");
  console.log("form");
};
