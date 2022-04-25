import React from "react";
import { DeveloperLayout } from "@/components/layouts/developer";
import Index from "@/styles/dev.oauth.module.css";
import Styles from "@/styles/styles.module.css";
import Link from "next/link";
import Image from "next/image";
import {
  NoApplicationAccess,
  RemoveAccessModalConfirm,
} from "@/components/Developer/";
import { Flex, Spacer, Button, Divider, useDisclosure } from "@chakra-ui/react";

type Props = {};

export default function Account({}: Props) {
  const {
    isOpen: isRemoveOpen,
    onOpen: onRemoveOpen,
    onClose: onRemoveClose,
  } = useDisclosure();

  return (
    <DeveloperLayout>
      <div className={`${Styles.dFlex} ${Styles.flexColumn}`}>
        <h1 className={Index.TitlePage}>Account Management</h1>
        <p className={Index.SubTitlePage}>
          Apps that have access to your account
        </p>
      </div>
      <div className={Index.divider}></div>
      <div className={`${Index.ClientListAccess}`}>
        <ul>
          <li className={``}>
            <div
              className={`${Styles.dFlex} ${Styles.flexItemsStart} ${Styles.flexGap3}`}
            >
              <div
                className={`${Index.CircleBadgeMedium} ${Styles.overflowHidden}`}
              >
                <Link href={`/developer/oauth/client/`}>
                  <a>
                    <Image
                      src="/iam.svg"
                      alt="IAM"
                      width={64}
                      height={64}
                      className={`${Index.AvatarUser} `}
                    />
                  </a>
                </Link>
              </div>

              <div className={`${Styles.widthFull}`}>
                <Flex align="center">
                  <div>
                    <Link href={`/developer/oauth/client/`}>
                      <a className={`${Index.ClientName}`}>{"IAM To do"}</a>
                    </Link>
                    <p className={`${Index.ClientDescription}`}>
                      {"Has access to: Basic account info"}
                    </p>
                    <p className={`${Index.ClientDescription}`}>
                      {`Homepage:`}
                      <span> https://iamtodo.vercel.app</span>
                    </p>
                    <p
                      className={`${Index.ClientGrantAccessTime}`}
                    >{`Access given on: Yesterday, 12:26 PM`}</p>
                  </div>
                  <Spacer />
                  <Button
                    onClick={onRemoveOpen}
                    size="sm"
                    variant="outline"
                    colorScheme="blue"
                  >
                    REMOVE ACCESS
                  </Button>
                </Flex>
              </div>
            </div>
          </li>
          <li className={``}>
            <div
              className={`${Styles.dFlex} ${Styles.flexItemsStart} ${Styles.flexGap3}`}
            >
              <div
                className={`${Index.CircleBadgeMedium} ${Styles.overflowHidden}`}
              >
                <Link href={`/developer/oauth/client/`}>
                  <a>
                    <Image
                      src="/eth.png"
                      alt="Etheruem"
                      width={64}
                      height={64}
                      className={`${Index.AvatarUser} `}
                    />
                  </a>
                </Link>
              </div>

              <div className={`${Styles.widthFull}`}>
                <Flex align="center">
                  <div>
                    <Link href={`/developer/oauth/client/`}>
                      <a className={`${Index.ClientName}`}>
                        {"Sample Application"}
                      </a>
                    </Link>
                    <p className={`${Index.ClientDescription}`}>
                      {"Has access to: Basic account info"}
                    </p>
                    <p className={`${Index.ClientDescription}`}>
                      {`Homepage:`}
                      <span> https://sample.app</span>
                    </p>
                    <p
                      className={`${Index.ClientGrantAccessTime}`}
                    >{`Access given on: April 21, 12:07 PM`}</p>
                  </div>
                  <Spacer />
                  <Button size="sm" variant="outline" colorScheme="blue">
                    REMOVE ACCESS
                  </Button>
                </Flex>
              </div>
            </div>
          </li>
          {/* <NoApplicationAccess></NoApplicationAccess> */}
        </ul>
      </div>
      <RemoveAccessModalConfirm isOpen={isRemoveOpen} onClose={onRemoveClose} />
    </DeveloperLayout>
  );
}
