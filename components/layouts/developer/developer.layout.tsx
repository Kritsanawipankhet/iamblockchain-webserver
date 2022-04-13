import React, { useEffect, useState } from "react";
import { walletConnectType } from "@/models/.";
import { ethers } from "ethers";
import Index from "./developer.layout.module.css";
import Styles from "@/styles/styles.module.css";
import Image from "next/image";
import Head from "next/head";
import Link from "next/link";
import {
  useDisclosure,
  Menu,
  Button,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  WalletIcon,
  RightFromBracketIcon,
  HambergurIcon,
} from "@/components/icon/";
import { useWeb3React } from "@web3-react/core";
import { connectors } from "@/components/connectors";
import { useRouter, type NextRouter } from "next/router";
import SelectWalletModal from "@/components/connectors/Modal";
import { toHex, truncateAddress } from "@/libs/string";
import Jazzicon, { jsNumberForAddress } from "react-jazzicon";

type Props = {
  children?: React.ReactNode;
};

let provider: keyof walletConnectType;
declare let window: any;
let activate: any;
let active: boolean;
let library: any;
let account: string | undefined | null;
let route: NextRouter;

export default function DeveloperLayout({ children }: Props) {
  route = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { chainId, deactivate, error } = useWeb3React();
  const [sidebar, setSidebar] = useState(false);
  library = useWeb3React().library;
  activate = useWeb3React().activate;
  active = useWeb3React().active;
  account = useWeb3React().account;

  const [network, setNetwork] = useState(undefined);

  const refreshState = () => {
    window.localStorage.setItem("provider", undefined);
    setNetwork(undefined);
  };

  const disconnect = () => {
    refreshState();
    deactivate();
  };

  useEffect(() => {
    provider = window.localStorage.getItem("provider");
    if (provider) {
      activate(connectors[provider]);
    }
  }, []);
  return (
    <>
      <Head>
        <title>Developer application - IAMBLOCKCHAIN</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className={`${Index.body} ${Index.sidebarOpen}`}>
        <div className={`${Index.Navbar}`}>
          <div
            className={`${Index.Header} ${Styles.mxAuto} ${Styles.px3} ${Styles.pxMd4} ${Styles.pxLg5} ${Styles.flexWrap} ${Styles.flexMdNowrap}`}
            role="banner"
          >
            <div
              className={`${Styles.HeaderItem} ${Styles.dFlex} ${Styles.dMdNone}`}
            >
              <button>
                <HambergurIcon
                  className={`${Styles.Octicon}`}
                  width={24}
                  height={24}
                ></HambergurIcon>
              </button>
            </div>
            <div
              className={`${Index.HeaderItem} ${Styles.mtN1} ${Styles.mbN1} ${Styles.dMdFlex} ${Styles.dNone}`}
            >
              <Link href="/developer">
                <a
                  className={`${Index.HeaderLink} ${Styles.dFlex} ${Styles.flexJustifyCenter} ${Styles.flexItemsCenter} ${Styles.flexGap3} ${Styles.mr2}`}
                >
                  <Image src="/iam.svg" width="48" height="48" />
                  <span className={`${Index.BannerText} `}>
                    IAMBLOCKCHAIN Developer
                  </span>
                </a>
              </Link>
            </div>
            <div
              className={`${Index.HeaderItem} ${Styles.mtN1} ${Styles.mbN1} ${Styles.dMdFlex} ${Styles.dNone}  ${Styles.mx2}`}
            >
              <Link href="/developer/">
                <a
                  className={`${Index.HeaderLink} ${
                    route.pathname === "/developer" ? Index.active : ""
                  } `}
                >
                  Home
                </a>
              </Link>
            </div>
            <div
              className={`${Index.HeaderItem} ${Styles.mtN1} ${Styles.mbN1} ${Styles.dMdFlex} ${Styles.dNone}  ${Styles.mx2}`}
            >
              <Link href="/developer/oauth">
                <a
                  className={`${Index.HeaderLink} ${
                    route.pathname === "/developer/oauth" ||
                    route.pathname === "/developer/oauth/create"
                      ? Index.active
                      : ""
                  }`}
                >
                  OAuth App
                </a>
              </Link>
            </div>
            <div
              className={`${Index.HeaderItem} ${Styles.mtN1} ${Styles.mbN1} ${Styles.dMdFlex} ${Styles.dNone}  ${Styles.mx2}`}
            >
              <a className={`${Index.HeaderLink}`}>Docs</a>
            </div>
            <div
              className={`${Index.HeaderItem} ${Styles.mtN1} ${Styles.mbN1} ${Styles.dMdNone} ${Styles.dFlex}`}
            ></div>
            <div className={`${Index.HeaderItemFull}`}>
              <Link href="#">
                <a
                  className={`${Index.HeaderLink} ${Styles.dFlex} ${Styles.dMdNone} ${Styles.flexItemsCenter} ${Styles.flexGap3}`}
                >
                  <Image src="/iam.svg" width="48" height="48" />
                </a>
              </Link>
            </div>
            <div
              className={`${Index.HeaderItem} ${Styles.positionRelative} ${Styles.mr0} ${Styles.dMdFlex}`}
            >
              {!active ? (
                <button
                  type="button"
                  className={`${Styles.textCenter} ${Styles.btn} ${Styles.btn} ${Styles.btnPrimary} ${Styles.widthFull} ${Styles.wsNormal} ${Styles.btnRounded}`}
                  style={Styles}
                  onClick={onOpen}
                >
                  <WalletIcon
                    className={`${Styles.colorFgOnEmphasis} ${Styles.Octicon}`}
                  />{" "}
                  Connect Wallet
                </button>
              ) : (
                <Menu>
                  <MenuButton
                    rounded={"full"}
                    as={Button}
                    rightIcon={<ChevronDownIcon />}
                  >
                    <div
                      className={`${Styles.dFlex} ${Styles.flexItemsCenter} ${Styles.flexJustifyCenter} ${Styles.flexGap2}`}
                    >
                      <WalletIcon
                        className={`${Styles.colorFgMutes}`}
                      ></WalletIcon>
                      <span>
                        {truncateAddress(
                          ethers.utils.getAddress(account || "")
                        )}
                      </span>
                    </div>
                  </MenuButton>
                  <MenuList>
                    <MenuGroup title="Profile">
                      <MenuItem>My Account</MenuItem>
                    </MenuGroup>
                    <MenuDivider />
                    <MenuGroup title="Help">
                      <MenuItem>Docs</MenuItem>
                      <MenuItem>FAQ</MenuItem>
                    </MenuGroup>
                    <MenuDivider />
                    <MenuItem onClick={disconnect}>
                      <RightFromBracketIcon
                        className={`${Styles.colorFgMutes} ${Styles.mr1}`}
                      ></RightFromBracketIcon>{" "}
                      Disconnect Wallet
                    </MenuItem>
                  </MenuList>
                </Menu>
              )}
            </div>
          </div>
        </div>
        <div
          className={`${Index.Container} ${Styles.pResponsive} ${Styles.clearfix}`}
        >
          {children}
        </div>

        <SelectWalletModal isOpen={isOpen} closeModal={onClose} />
      </div>
    </>
  );
}
