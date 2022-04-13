import Styles from "@/styles/styles.module.css";
import Index from "./index.module.css";

type Props = {};

export default function NoApplication({}: Props) {
  return (
    <div
      className={`${Styles.dFlex} ${Styles.flexColumn} ${Styles.flexItemsCenter} ${Styles.flexJustifyCenter} ${Styles.mxAuto} ${Styles.mt6} ${Styles.textCenter}`}
    >
      <div className={`${Index.noApplicationText}`}>
        No applications are built on the blockchain.
      </div>
    </div>
  );
}
