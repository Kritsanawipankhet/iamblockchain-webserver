import { ethers } from "ethers";

export type TInitializeEthers = {
  provider: ethers.Wallet;
  IAMContract: ethers.Contract;
};
