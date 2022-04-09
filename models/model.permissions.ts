export const enum permissionType {
  NoScope = "",
  Task = "Task",
  TaskRead = "Task:read",
  TaskWrite = "Task:write",
}

export type Permission = {
  permission: permissionType;
  title: string;
  icon: JSX.Element;
  description: JSX.Element;
  subDescription: JSX.Element;
  listAccess: string[];
  link: string;
};
