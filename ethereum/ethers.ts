import { ethers } from "ethers";
import IAMContractAbi from "./abi/IAM.json";
import { TClient, TInitializeEthers } from "../models/";
import _default from "next/dist/shared/lib/runtime-config";

let getWallet: ethers.Wallet, wallet: ethers.Wallet;
let getProvider: ethers.providers.BaseProvider;
let provider: ethers.Wallet;
let IAMContract: ethers.Contract;

const ethersConnectNetwork = (): TInitializeEthers => {
  const network = process.env.ETHEREUM_NETWORK || "http://localhost:8545";

  try {
    getWallet = ethers.Wallet.fromMnemonic(process.env.MNEMONIC_PHRASE);
    getProvider = ethers.getDefaultProvider(network);
    provider = getWallet.connect(getProvider);
    IAMContract = new ethers.Contract(
      process.env.IAM_CONTRACT_ADDRESS,
      IAMContractAbi.abi,
      getProvider
    );
  } catch (_e: any) {
    throw new Error(_e);
  }
  return { provider, IAMContract };
};

const ethersGetClientById = async (_clientId?: string | string[]) => {
  const initEthers = ethersConnectNetwork();
  let clientResponse;

  try {
    const getClient = await IAMContract.connect(
      initEthers.provider
    ).getClientPublicJson(_clientId || " ");
    clientResponse = JSON.parse(
      Buffer.from(getClient, "base64").toString("ascii")
    );
  } catch (_e: any) {
    return {
      error: _e.code,
      error_description: _e.reason,
      error_code: errorType(_e.code),
    };
  }
  return clientResponse;
};

const errorType = (error: string): number => {
  if (error === "NETWORK_ERROR") {
    return 500;
  } else if (error === "CALL_EXCEPTION") {
    return 400;
  } else {
    return 500;
  }
};
export { ethersGetClientById };
