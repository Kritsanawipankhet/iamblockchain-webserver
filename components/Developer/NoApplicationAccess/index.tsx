import Styles from "@/styles/styles.module.css";
import Index from "./index.module.css";

type Props = {};

export default function NoApplicationAccess({}: Props) {
  return (
    <div
      className={`${Styles.dFlex} ${Styles.flexColumn} ${Styles.flexItemsCenter} ${Styles.flexJustifyCenter} ${Styles.mxAuto} ${Styles.mt6} ${Styles.textCenter}`}
    >
      <div className={`${Index.noApplicationText}`}>
        There is no application that grants access permissions.
      </div>
    </div>
  );
}
