const path = require("path");
require("dotenv").config();

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    HOSTNAME: process.env.HOSTNAME,
    ETHEREUM_NETWORK: process.env.ETHEREUM_NETWORK,
    MNEMONIC_PHRASE: process.env.MNEMONIC_PHRASE,
    IAM_CONTRACT_ADDRESS: process.env.IAM_CONTRACT_ADDRESS,
    TZ: process.env.TZ,
  },
  images: {
    domains: ["avatars.githubusercontent.com"],
  },
};

module.exports = nextConfig;
