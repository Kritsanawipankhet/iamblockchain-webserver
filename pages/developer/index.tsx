import React, { useEffect, useState } from "react";
import { DeveloperLayout } from "@/components/layouts/developer";
import Index from "@/styles/dev.oauth.module.css";
import Styles from "@/styles/styles.module.css";
import { useWeb3React } from "@web3-react/core";

type Props = {};

export default function Developer({}: Props) {
  const { deactivate, activate, active, account } = useWeb3React();

  return (
    <DeveloperLayout>
      <div
        className={`${Styles.dFlex} ${Styles.flexItemsCenter} ${Styles.flexJustifyBetween}`}
      >
        <h1 className={Index.TitlePage}>Introductions</h1>
      </div>
      <div className={Index.divider}></div>
      <div>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque,
        consequuntur eveniet hic harum aliquid quibusdam at tempore ducimus
        aspernatur obcaecati labore, repellendus minima atque architecto maiores
        earum veniam dicta, necessitatibus quisquam natus blanditiis. Explicabo,
        beatae? Atque, est earum ipsam et sint commodi molestias quas distinctio
        eligendi suscipit ducimus maxime voluptatem, mollitia reprehenderit
        expedita nam possimus cupiditate libero. Error beatae quibusdam quaerat
        ab nulla maxime, vero accusamus recusandae eum dignissimos dolores hic
        quia at provident asperiores? Saepe hic omnis, earum minus sit ullam
        fugiat accusamus corporis. Sed unde facilis tenetur iusto sint, quisquam
        accusantium sit recusandae, debitis fuga, eaque aliquam? Eum eveniet
        quibusdam qui non ea adipisci laudantium! Illum, aut nisi? Saepe autem
        asperiores, dolore, tempore architecto enim dolorem laboriosam quod
        ratione delectus non dolor. Neque ipsum ut, eos dolorum nihil blanditiis
        commodi quo ducimus dolor placeat aliquid consectetur possimus veritatis
        fuga a quia. Vero dignissimos quis iure, cupiditate sit accusantium,
        nesciunt excepturi recusandae delectus, repellendus modi? Nam quaerat
        quos, autem distinctio aliquam commodi consectetur hic. Quaerat impedit
        placeat quae sapiente quas fugit consectetur quo dolorem, provident
        natus necessitatibus quia, esse quis magnam tenetur ut. Quos voluptate
        recusandae odio aut animi facilis eos praesentium accusamus, veniam fuga
        unde provident non tenetur. Lorem ipsum dolor, sit amet consectetur
        adipisicing elit. Eum officiis maxime quasi sint, facilis voluptates.
        Illum autem, praesentium voluptas accusantium obcaecati esse rem, sed
        alias veniam repellat dolores. Necessitatibus quisquam corrupti eum nisi
        fugit atque! Iusto et nostrum rem maxime placeat ipsum deleniti
        molestiae incidunt ea quas totam delectus at, nihil doloribus aut
        cupiditate consectetur! Placeat, sed fuga! Aut alias eum veritatis odio
        eos, debitis nobis maxime dolor natus omnis illum impedit sequi at magni
        ad repellat qui explicabo architecto ullam asperiores. Ratione rerum
        dignissimos consequuntur nulla, deserunt non officia vero repellat quasi
        repellendus! Cum, architecto. Minima libero ullam atque at autem illo
        sunt optio dignissimos veritatis earum maxime error adipisci,
        perspiciatis exercitationem deserunt necessitatibus odio? Alias dolores
        cupiditate labore voluptates? Qui ab quaerat quia ex consequuntur
        pariatur voluptatibus dolores laudantium. Dolor corporis rerum assumenda
        minima rem magni a quod! Perferendis cumque quasi molestias tempora
        totam commodi quam ex eveniet quis ratione accusamus maxime officia
        tempore quaerat mollitia, ad, sed pariatur odio reprehenderit
        exercitationem omnis sint iure? Harum ea doloremque possimus laborum.
        Saepe numquam quibusdam fuga earum laudantium, facere dolore accusantium
        magnam illum debitis! Quasi voluptatem eius velit totam, maxime culpa
        exercitationem dolores perferendis doloremque vero dolore optio
        repellendus laborum quibusdam saepe dolorem voluptates unde corporis
        nobis nam repellat. Cum hic vel culpa aut quod quaerat repellat corporis
        tenetur quisquam? Eum nobis rem cum hic, ex minima unde et at, fuga,
        vero ipsam. Assumenda, labore sequi ratione veniam hic adipisci error,
        ipsam vel quisquam quas minus qui fuga alias magnam dolore ex nesciunt?
        Dignissimos facere nesciunt a rerum ipsam eum ab laboriosam id magnam
        tempora suscipit distinctio sequi neque accusamus animi laudantium saepe
        reiciendis recusandae rem, perspiciatis totam officiis? Provident
        facilis temporibus aspernatur sed quia aliquam, enim quaerat itaque modi
        velit sint nemo rem, numquam, aut explicabo cum rerum repellendus?
      </div>
    </DeveloperLayout>
  );
}
