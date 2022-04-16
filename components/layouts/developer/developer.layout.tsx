import React, { useEffect, useState, useRef } from "react";
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
import { truncateAddress } from "@/libs/string";

type Props = {
  children?: React.ReactNode;
};

declare let window: any;
let route: NextRouter;

let provider: keyof walletConnectType;
let activate: any;
let deactivate: any;
let ref: any;
export default function DeveloperLayout({ children }: Props) {
  route = useRouter();
  console.log(route);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { active, account } = useWeb3React();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [network, setNetwork] = useState(undefined);
  deactivate = useWeb3React().deactivate;
  activate = useWeb3React().activate;

  ref = useRef();

  useEffect(() => {
    const checkIfClickedOutside = (e: any) => {
      if (sidebarOpen && ref.current && !ref.current.contains(e.target)) {
        setSidebarOpen(false);
      }
    };

    document.addEventListener("mousedown", checkIfClickedOutside);

    return () => {
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [sidebarOpen]);

  const refreshState = () => {
    window.localStorage.setItem("provider", undefined);
    setNetwork(undefined);
  };

  const disconnect = () => {
    refreshState();
    deactivate();
  };

  const sidebar = () => {
    setSidebarOpen(!sidebarOpen);
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
      <div className={`${Index.body} `}>
        <div className={`${Index.Navbar}`} ref={ref}>
          <div
            className={`${Index.Header} ${Styles.mxAuto} ${Styles.px3} ${Styles.pxMd4} ${Styles.pxLg5} ${Styles.flexWrap} ${Styles.flexMdNowrap}`}
            role="banner"
          >
            <div
              className={`${Styles.HeaderItem} ${Styles.dFlex} ${Styles.dMdNone}`}
            >
              <button onClick={sidebar}>
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
                  <Image
                    src="/iam.svg"
                    width="48"
                    height="48"
                    alt="IAMBlockchain"
                  />
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
                    route.pathname === "/developer/oauth/create" ||
                    route.pathname === "/developer/oauth/client/[client_id]"
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
              <Link href="/developer/docs">
                <a
                  className={`${Index.HeaderLink} ${
                    route.pathname === "/developer/docs" ? Index.active : ""
                  }`}
                >
                  Docs
                </a>
              </Link>
            </div>
            <div
              className={`${Index.HeaderItem} ${Styles.mtN1} ${Styles.mbN1} ${Styles.dMdNone} ${Styles.dFlex}`}
            ></div>
            <div className={`${Index.HeaderItemFull}`}>
              <div className={`${Styles.dBlock} ${Styles.dMdNone} `}>
                <Link href="/developer">
                  <a className={`${Index.HeaderLink} `}>
                    <Image
                      src="/iam.svg"
                      width="48"
                      height="48"
                      alt="IAMBlockchain"
                    />
                  </a>
                </Link>
              </div>
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
                    </MenuGroup>
                    <MenuDivider />
                    <MenuItem onClick={disconnect}>
                      <RightFromBracketIcon
                        className={`${Styles.Octicon} ${Styles.colorFgMutes} ${Styles.mr1}`}
                      ></RightFromBracketIcon>{" "}
                      Disconnect Wallet
                    </MenuItem>
                  </MenuList>
                </Menu>
              )}
            </div>
          </div>
          <div
            className={`${Index.Sidebar} ${sidebarOpen ? Index.active : ""} ${
              Styles.dBlock
            } ${Styles.dMdNone}`}
          >
            <ul>
              <Link href="/developer">
                <a
                  onClick={() => {
                    setSidebarOpen(false);
                  }}
                >
                  <li
                    className={
                      route.pathname === "/developer" ? Index.active : ""
                    }
                  >
                    Home
                  </li>
                </a>
              </Link>
              <Link href="/developer/oauth">
                <a
                  onClick={() => {
                    setSidebarOpen(false);
                  }}
                >
                  <li
                    className={
                      route.pathname === "/developer/oauth" ||
                      route.pathname === "/developer/oauth/create" ||
                      route.pathname === "/developer/oauth/client/[client_id]"
                        ? Index.active
                        : ""
                    }
                  >
                    OAuth App
                  </li>
                </a>
              </Link>
              <Link href="/developer/docs">
                <a
                  onClick={() => {
                    setSidebarOpen(false);
                  }}
                >
                  <li
                    className={
                      route.pathname === "/developer/docs" ? Index.active : ""
                    }
                  >
                    Docs
                  </li>
                </a>
              </Link>
            </ul>
          </div>
        </div>

        <div
          className={`${Index.Container} ${Styles.pResponsive} ${Styles.clearfix}`}
        >
          {children}
        </div>
        <div className={`${Index.Footer} ${Styles.clearfix}`}>
          <div className={`${Index.Space}`}></div>
          <div className={`${Index.FooterContent} ${Styles.pResponsive}`}>
            © 2022 IAMBlockchain, KMITL.
          </div>
        </div>

        <SelectWalletModal isOpen={isOpen} closeModal={onClose} />
      </div>
    </>
  );
}
