import React from "react";
import { DeveloperLayout } from "@/components/layouts/developer";
import Index from "@/styles/dev.oauth.module.css";
import Styles from "@/styles/styles.module.css";

type Props = {};

export default function Developer({}: Props) {
  return (
    <DeveloperLayout>
      <div
        className={`${Styles.dFlex} ${Styles.flexItemsCenter} ${Styles.flexJustifyBetween}`}
      >
        <h1 className={Index.TitlePage}>Introductions</h1>
      </div>
      <div className={Index.divider}></div>
      <div>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio beatae
        obcaecati eligendi maiores nam dolorum odit eveniet magni omnis?
        Maiores, mollitia facilis qui nesciunt beatae tempora laboriosam ea
        laborum temporibus earum corporis ex ipsa, adipisci delectus autem ullam
        natus repudiandae vitae placeat voluptates minus! Deserunt cupiditate
        eaque nobis neque amet magnam dolorem omnis placeat doloribus minus
        consequatur accusantium accusamus cumque dolor explicabo ut libero
        maiores, numquam ad corporis, repellat delectus. Amet, unde animi
        expedita eveniet ipsam eos veritatis dolor officiis commodi ratione
        numquam repellat quisquam vero doloribus enim aperiam eius, aliquam
        magni quia tempora ea. Omnis id sit tenetur soluta quo molestiae
        officia, nesciunt aliquid porro ullam sunt aliquam earum doloremque
        ducimus consequuntur reiciendis laudantium eos, nostrum, fugit natus
        temporibus illo. Maiores asperiores neque quasi pariatur in, sequi
        sapiente minus aperiam earum harum cum nulla maxime reiciendis, ut culpa
        quisquam possimus. Consequatur officiis officia doloribus rerum dolorem
        illo vero hic aliquam totam quo recusandae nobis inventore quibusdam,
        repellat quam? Necessitatibus, ullam eaque, voluptatibus sequi
        repudiandae ut officia, laudantium itaque aspernatur eos error cum
        labore! Magni quia et non dolore temporibus quam unde. Voluptas sed odio
        voluptatum, eum molestias aliquid deleniti iusto cumque quibusdam?
        Nesciunt, sint possimus cupiditate totam eveniet exercitationem.
      </div>
    </DeveloperLayout>
  );
}
