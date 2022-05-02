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
        permanent: true,
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
    CLIENT_OP: process.env.CLIENT_OP,
  },
  async headers() {
    return [
      {
        // matching all API routes
        source: "/:path*",
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          { key: "Access-Control-Allow-Origin", value: "*" },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET,OPTIONS,PATCH,DELETE,POST,PUT",
          },
          {
            key: "Access-Control-Allow-Headers",
            value:
              "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
          },
        ],
      },
    ];
  },
  // images: {
  //   domains: ["avatars.githubusercontent.com"],
  // },
};

module.exports = nextConfig;
