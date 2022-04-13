import React, { useState } from "react";
import Styles from "@/styles/styles.module.css";

import * as loadingData from "./loading.json";
import FadeIn from "react-fade-in";
import Lottie from "lottie-react";

const defaultOptions = {
  loop: true,
  autoplay: true,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};
type Props = {
  Loading?: boolean;
};

export default function LoadingOverlay({ Loading }: Props) {
  if (Loading) {
    return (
      <div className={`${Styles.overlay}`}>
        <div>
          <Lottie options={defaultOptions} animationData={loadingData} />
        </div>
      </div>
    );
  }
  return <div></div>;
}
