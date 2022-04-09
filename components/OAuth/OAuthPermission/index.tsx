import React, { useState } from "react";
import Index from "./index.module.css";
import Styles from "@/styles/styles.module.css";
import { GlobeIcon, TaskIcon, QuestionIcon } from "@/components/icon/";
import { permissionType, Permission } from "@/models/.";
import Link from "next/link";

type Props = {
  type?: permissionType;
};

const permissions: Permission[] = [
  {
    permission: permissionType.NoScope,
    title: "Public data only",
    icon: (
      <GlobeIcon
        className={`${Styles.Octicon} ${Styles.colorFgMutes}`}
        width={32}
        height={32}
      ></GlobeIcon>
    ),
    description: <>Limited access ty your public data</>,
    subDescription: (
      <>
        This application will be able to identify you and read public
        information.
      </>
    ),
    listAccess: ["Read"],
    link: "",
  },
  {
    permission: permissionType.Task,
    title: "Task",
    icon: (
      <TaskIcon
        className={`${Styles.Octicon} ${Styles.colorFgMutes}`}
        width={32}
        height={32}
      ></TaskIcon>
    ),
    description: (
      <>
        Public and <em className={Index.highlight}>{"private"}</em>
      </>
    ),
    subDescription: (
      <>
        This application will be able to{" "}
        <b>read and write all public and private task data.</b> This includes
        the following:
      </>
    ),
    listAccess: ["Read", "Write", "Share"],
    link: "",
  },
];

export default function OAuthPermission({
  type = permissionType.NoScope,
}: Props) {
  const [show, setShow] = useState(false);
  let permission = permissions.find((e) => e.permission === type) as Permission;
  function handleClick() {
    setShow(!show);
  }
  return (
    <div
      className={`${Styles.px0} ${Styles.borderBottom0} ${Index.oauthPermissionsDetails} ${Index.oauthPublicDataOnly}`}
    >
      <div
        className={`${Index.permissionSummary} ${Styles.dFlex} ${Styles.flexGap3}`}
      >
        {permission.icon}
        <div>
          <strong className={Index.permissionTitle}>{permission.title}</strong>
          <small className={Index.accessDetails}>
            {permission.description}
            <span
              className={`${Index.hiddenTextExpander} ${Styles.ml1} ${Styles.dInline}`}
            >
              <button className={Index.ellipsisExpander} onClick={handleClick}>
                ...
              </button>
            </span>
          </small>
          <div className={show ? Styles.dBlock : Styles.dNone}>
            <div className={Index.permissionHelp}>
              <p className={Styles.mb10p}>{permission.subDescription}</p>
              <ul>
                {permission.listAccess.map((list, index) => (
                  <li key={index}>{list}</li>
                ))}
              </ul>
              <Link href={permission.link || "#"}>
                <a>
                  <QuestionIcon
                    className={`${Styles.Octicon} ${Styles.mr1} ${Styles.colorFgMutes}`}
                  ></QuestionIcon>
                  Learn more
                </a>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
