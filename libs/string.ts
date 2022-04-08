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

export const urlDomainFormat = (url: string): string => {
  return url.slice(0, url.lastIndexOf("/"));
};
