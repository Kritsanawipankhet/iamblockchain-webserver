import React from "react";
import { DeveloperLayout } from "@/components/layouts/developer";
import Index from "@/styles/dev.oauth.module.css";
import Styles from "@/styles/styles.module.css";

type Props = {};

export default function Docs({}: Props) {
  return (
    <DeveloperLayout>
      <div
        className={`${Styles.dFlex} ${Styles.flexItemsCenter} ${Styles.flexJustifyBetween}`}
      >
        <h1 className={Index.TitlePage}>Docs</h1>
      </div>
      <div className={Index.divider}></div>
      <div>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsam
        nesciunt, suscipit nostrum deserunt, nemo iure ullam at ab quidem
        aliquam facilis eaque? Adipisci consequuntur dolore nesciunt repellat
        voluptatem voluptates eveniet fugiat accusantium a error, placeat,
        explicabo eaque non animi impedit neque tenetur asperiores quibusdam
        molestiae labore! Magnam sint mollitia eius?
      </div>
    </DeveloperLayout>
  );
}
