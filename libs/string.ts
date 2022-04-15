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
