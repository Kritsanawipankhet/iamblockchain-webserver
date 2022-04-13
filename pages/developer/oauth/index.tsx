import React, { useEffect, useState } from "react";
import { DeveloperLayout } from "@/components/layouts/developer";
import Index from "@/styles/dev.oauth.module.css";
import Styles from "@/styles/styles.module.css";
import { LayerIcon, LockIcon } from "@/components/icon";
import { useWeb3React } from "@web3-react/core";
import Link from "next/link";

type Props = {};

export default function Developer({}: Props) {
  const { active, account } = useWeb3React();

  if (active) {
    return (
      <DeveloperLayout>
        <div>
          <div
            className={`${Styles.dFlex} ${Styles.flexItemsCenter} ${Styles.flexJustifyBetween}`}
          >
            <h1 className={Index.TitlePage}>OAuth Apps</h1>
            <Link href="/developer/oauth/create">
              <a>
                <button
                  className={`${Styles.btn} ${Styles.btnPrimary} ${Index.btnCreateOAuth}`}
                >
                  <LayerIcon className={`${Styles.Octicon} ${Styles.mr1}`} />{" "}
                  New OAuth App
                </button>
              </a>
            </Link>
          </div>
          <div className={Index.divider}></div>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque,
          consequuntur eveniet hic harum aliquid quibusdam at tempore ducimus
          aspernatur obcaecati labore, repellendus minima atque architecto
          maiores earum veniam dicta, necessitatibus quisquam natus blanditiis.
          Explicabo, beatae? Atque, est earum ipsam et sint commodi molestias
          quas distinctio eligendi suscipit ducimus maxime voluptatem, mollitia
          reprehenderit expedita nam possimus cupiditate libero. Error beatae
          quibusdam quaerat ab nulla maxime, vero accusamus recusandae eum
          dignissimos dolores hic quia at provident asperiores? Saepe hic omnis,
          earum minus sit ullam fugiat accusamus corporis. Sed unde facilis
          tenetur iusto sint, quisquam accusantium sit recusandae, debitis fuga,
          eaque aliquam? Eum eveniet quibusdam qui non ea adipisci laudantium!
          Illum, aut nisi? Saepe autem asperiores, dolore, tempore architecto
          enim dolorem laboriosam quod ratione delectus non dolor. Neque ipsum
          ut, eos dolorum nihil blanditiis commodi quo ducimus dolor placeat
          aliquid consectetur possimus veritatis fuga a quia. Vero dignissimos
          quis iure, cupiditate sit accusantium, nesciunt excepturi recusandae
          delectus, repellendus modi? Nam quaerat quos, autem distinctio aliquam
          commodi consectetur hic. Quaerat impedit placeat quae sapiente quas
          fugit consectetur quo dolorem, provident natus necessitatibus quia,
          esse quis magnam tenetur ut. Quos voluptate recusandae odio aut animi
          facilis eos praesentium accusamus, veniam fuga unde provident non
          tenetur.
        </div>
      </DeveloperLayout>
    );
  }
  return (
    <DeveloperLayout>
      <div
        className={`${Styles.dFlex} ${Styles.flexColumn} ${Styles.flexItemsCenter} ${Styles.flexJustifyCenter} ${Styles.mxAuto} ${Styles.mt5} ${Styles.textCenter}`}
      >
        <LockIcon
          className={`${Styles.Octicon} ${Styles.colorFgMutes} ${Styles.mb2}`}
          width={32}
          height={32}
        />
        <div className={`${Index.permissionText}`}>
          You do not have permission to access OAuth Apps. <br></br>Please
          connect your wallet account.
        </div>
      </div>
      )
    </DeveloperLayout>
  );
}
