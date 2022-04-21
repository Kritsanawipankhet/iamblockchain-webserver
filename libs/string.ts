import { ethers } from "ethers";

export const shortAddressEth = (address?: string): string => {
  if (address) {
    if (ethers.utils.isAddress(address)) {
      return (
        address.substring(0, 5) + "..." + address.substring(address.length - 4)
      );
    }
    throw new Error("Is not address");
  }
  throw new Error("Empty string");
};

export const truncateAddress = (address: string) => {
  if (!address) return "";
  const match = address.match(
    /^(0x[a-zA-Z0-9]{3})[a-zA-Z0-9]+([a-zA-Z0-9]{4})$/
  );
  if (!match) return address;
  return `${match[1]}…${match[2]}`;
};

export const toHex = (num: string) => {
  const val = Number(num);
  return "0x" + val.toString(16);
};

export const makeClientSecret = (length: number): string => {
  let secret = "";
  let characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    secret += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return secret;
};

export const regExpAppname = (_appName: string): boolean => {
  return !/^[a-z0-9\s]+[a-z0-9\s]*$/gi.test(_appName);
};

export const regExpUrl = (url: string): boolean => {
  return !/^https?:\/\/(?:w{1,3}\.)?[^\s.]+(?:\.[a-z]+)*(?::\d+)?((?:\/\w+)|(?:-\w+))*\/?(?![^<]*(?:<\/\w+>|\/?>))/i.test(
    url
  );
};

export const setBg = (): string => {
  const randomColor = Math.floor(Math.random() * 16777215).toString(16);
  return "#" + randomColor;
};
