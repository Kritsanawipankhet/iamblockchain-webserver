import React, { useEffect, useState } from "react";
import { DeveloperLayout } from "@/components/layouts/developer";
import Index from "@/styles/dev.oauth.module.css";
import Styles from "@/styles/styles.module.css";
import { useWeb3React } from "@web3-react/core";
import Image from "next/image";

type Props = {};

export default function Developer({}: Props) {
  return (
    <DeveloperLayout>
      <div>
        <div>
          <h1
            className={`${Styles.textCenter} ${Index.projectNameTitle} ${Styles.my3}`}
          >
            Identity and Access Management Distributed Application on Blockchain
          </h1>
        </div>
        <div className={`${Styles.textCenter} ${Styles.mb6}`}>
          Blockchain technology is a technology known in the form of
          Cryptocurrencies Blockchain technology is currently being used to
          create new applications that have never been seen before. Nowadays,
          digital identity management is too dependent on service providers,
          resulting in service providers having to maintain user data on their
          own. causing high costs and resulting in a large amount of redundant
          data from different service providers. Blockchain-based decentralized
          application access management system It is a service that helps for
          managing digital identity on Blockchain to deal with data security.
          Prevent forgery Reduce dependency on multiple service providers.
          Decentralize identity management for users. Saves users from having to
          remember a lot of their credentials. Same as other service providers.
        </div>
        <div className={`${Styles.textCenter} ${Styles.mt6}`}>
          <h1 className={` ${Index.projectNameTitle}`}>Project Team</h1>
          <div className={`${Styles.mt3}`}>
            <ul className={`${Index.projectTeamUl}`}>
              <li>
                <div>
                  <Image
                    src="/SVG/Asset-2.svg"
                    width="100"
                    height="100"
                    alt="Dr. Parinya Ekparinya"
                  />
                  <p className={`${Index.projectTeamName}`}>
                    Dr. Parinya Ekparinya
                  </p>
                  <p className={`${Index.projectTeamRole}`}>Advisor</p>
                </div>
              </li>
              <li>
                <div>
                  <Image
                    src="/SVG/Asset-6.svg"
                    width="100"
                    height="100"
                    alt="Mr. Phongpak Pudsorn"
                  />
                  <p className={`${Index.projectTeamName}`}>
                    Mr. Phongpak Pudsorn
                  </p>
                  <p className={`${Index.projectTeamRole}`}>Student</p>
                </div>
              </li>
              <li>
                <div>
                  <Image
                    src="/SVG/Asset-1.svg"
                    width="100"
                    height="100"
                    alt="Acting Sub Lt. Kritsana Wipankhet"
                  />
                  <p className={`${Index.projectTeamName}`}>
                    Acting Sub Lt. Kritsana Wipankhet
                  </p>
                  <p className={`${Index.projectTeamRole}`}>Student</p>
                </div>
              </li>
              <li>
                <div>
                  <Image
                    src="/SVG/Asset-5.svg"
                    width="100"
                    height="100"
                    alt="Mr. Chatchai Nopplang"
                  />
                  <p className={`${Index.projectTeamName}`}>
                    Mr. Chatchai Nopplang
                  </p>
                  <p className={`${Index.projectTeamRole}`}>Student</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </DeveloperLayout>
  );
}
