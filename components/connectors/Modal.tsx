import React, { useEffect, useState } from "react";
import { InjectedConnector } from "@web3-react/injected-connector";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";
// import { WalletLinkConnector } from "@web3-react/walletlink-connector";
import {
  VStack,
  HStack,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Button,
  Text,
} from "@chakra-ui/react";
import { Image } from "@chakra-ui/react";
import { useWeb3React, UnsupportedChainIdError } from "@web3-react/core";
import { connectors } from ".";
import detectEthereumProvider from "@metamask/detect-provider";

type Props = {
  isOpen: any;
  closeModal: any;
};
interface walletConnectType {
  injected: InjectedConnector;
  walletConnect: WalletConnectConnector;
  // coinbaseWallet: WalletLinkConnector;
}

let provider: keyof walletConnectType;

declare let window: any;
let deactivate: () => void;
export default function SelectWalletModal({ isOpen, closeModal }: Props) {
  const { library, chainId, account, activate, active, error } = useWeb3React();
  deactivate = useWeb3React().deactivate;

  const setProvider = (type: any) => {
    window.localStorage.setItem("provider", type);
  };

  const metamaskConnectWallet = async () => {
    const provider = await detectEthereumProvider();

    try {
      const chainIds = await window.ethereum.request({
        method: "eth_chainId",
      });
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: "0x3" }],
      });

      activate(connectors.injected);
    } catch (switchError: any) {
      if (switchError.code === 4902) {
        try {
          await window.ethereum.request({
            method: "wallet_addEthereumChain",
            params: [
              {
                chainId: "0x3",
                chainName: "Ropsten",
                rpcUrls: [
                  "https://ropsten.infura.io/v3/81a30e2706b04f5489a74021a6a5ff42",
                ],
              },
            ],
          });
          activate(connectors.injected);
        } catch (error: any) {}
      }
    }
  };

  useEffect(() => {
    if (error?.name === "UnsupportedChainIdError") {
      window.localStorage.setItem("provider", undefined);
      deactivate();
      console.log(error?.name);
    }
  }, [error?.name]);
  return (
    <Modal isOpen={isOpen} onClose={closeModal} isCentered>
      <ModalOverlay />
      <ModalContent w="300px">
        <ModalHeader>Select Wallet</ModalHeader>
        <ModalCloseButton
          _focus={{
            boxShadow: "none",
          }}
        />
        <ModalBody paddingBottom="1.5rem">
          <VStack>
            <Button
              variant="outline"
              onClick={() => {
                activate(connectors.walletConnect);
                setProvider("walletConnect");
                closeModal();
              }}
              w="100%"
            >
              <HStack w="100%" justifyContent="center">
                <Image
                  src="/wc.png"
                  alt="Wallet Connect Logo"
                  width={26}
                  height={26}
                  borderRadius="3px"
                />
                <Text>Wallet Connect</Text>
              </HStack>
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                metamaskConnectWallet();
                setProvider("injected");
                closeModal();
              }}
              w="100%"
            >
              <HStack w="100%" justifyContent="center">
                <Image
                  src="/mm.png"
                  alt="Metamask Logo"
                  width={25}
                  height={25}
                  borderRadius="3px"
                />
                <Text>Metamask</Text>
              </HStack>
            </Button>
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
