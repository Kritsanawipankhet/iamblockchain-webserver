const path = require("path");
const TerserPlugin = require("terser-webpack-plugin");
require("dotenv").config();

/** @type {import('next').NextConfig} */
const nextConfig = {
  mode: "production",
  optimization: {
    minimizer: [
      new TerserPlugin({
        /* additional options here */
      }),
    ],
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: { and: [/\.(js|ts|md)x?$/] },
      use: [
        {
          loader: "@svgr/webpack",
          options: {
            prettier: false,
            svgo: true,
            svgoConfig: { plugins: [{ removeViewBox: false }] },
            titleProp: true,
          },
        },
      ],
    });
    return config;
  },
  async redirects() {
    return [
      {
        source: "/",
        destination: "/developer",
        permanent: false,
      },
      {
        source: "/api/oauth/token",
        destination: "/api/oauth/token",
        permanent: false,
      },
    ];
  },
  webpack5: true,
  reactStrictMode: true,
  env: {
    HOSTNAME: process.env.HOSTNAME,
    ETHEREUM_NETWORK: process.env.ETHEREUM_NETWORK,
    MNEMONIC_PHRASE: process.env.MNEMONIC_PHRASE,
    IAM_CONTRACT_ADDRESS: process.env.IAM_CONTRACT_ADDRESS,
    TZ: process.env.TZ,
    SUPPORT_CHAIN_ID: process.env.SUPPORT_CHAIN_ID,
    CHAIN_NAME: process.env.CHAIN_NAME,
  },
  // images: {
  //   domains: ["avatars.githubusercontent.com"],
  // },
};

module.exports = nextConfig;
