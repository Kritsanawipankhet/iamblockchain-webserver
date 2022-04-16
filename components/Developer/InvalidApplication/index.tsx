import Styles from "@/styles/styles.module.css";
import Index from "./index.module.css";

type Props = {};

export default function InvalidApplication({}: Props) {
  return (
    <div
      className={`${Styles.dFlex} ${Styles.flexColumn} ${Styles.flexItemsCenter} ${Styles.flexJustifyCenter} ${Styles.mxAuto} ${Styles.mt6} ${Styles.textCenter}`}
    >
      <div className={`${Index.invalidText} ${Styles.mt6} ${Styles.dFlex}`}>
        <p>
          You do not have permission to access oauth apps or invalid
          applicaiton.
        </p>
      </div>
    </div>
  );
}
