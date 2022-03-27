import { ethers } from "ethers";
import IAMContractAbi from "./abi/IAM.json";
import { TClient, TClientError } from "../models/";

const ethersConnectNetwork = (_useDefaultProvider?: string) => {
  const network = _useDefaultProvider || "http://localhost:8545";

  const networkConfig = {
    ropsten: {
      projectId: "81a30e2706b04f5489a74021a6a5ff42",
      projectSecret: "33cc2553291b4176bd307e6f9eab3233",
    },
  };

  const provider: ethers.providers.BaseProvider = ethers.getDefaultProvider(
    network,
    networkConfig
  );
  const getWallet = ethers.Wallet.fromMnemonic(process.env.MNEMONIC_PHRASE);
  const wallet = getWallet.connect(provider);

  const IAMContract = new ethers.Contract(
    process.env.IAM_CONTRACT_ADDRESS,
    IAMContractAbi.abi,
    provider
  );

  return { provider, wallet, IAMContract };
};

const ethersGetClientById = async (_clientId?: string | string[]) => {
  const { wallet, IAMContract } = ethersConnectNetwork();

  try {
    const client = await IAMContract.connect(wallet).getClientPublicJson(
      _clientId
    );
    //console.log(client);
    const client_data: TClient = JSON.parse(
      Buffer.from(client, "base64").toString("ascii")
    );

    return client_data;
  } catch (e: any) {
    const error: TClientError = {
      error: "bad_verification_client",
      error_description: JSON.parse(e.error.body).error.message,
    };
    return error;
  }
};

export { ethersGetClientById };
