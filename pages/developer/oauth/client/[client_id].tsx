import React, { useState, useEffect, useMemo } from "react";
import { DeveloperLayout } from "@/components/layouts/developer";
import { GetServerSideProps } from "next";
import Index from "@/styles/dev.oauth.module.css";
import Styles from "@/styles/styles.module.css";
import { useRouter } from "next/router";
import { useWeb3React } from "@web3-react/core";
import Abi from "@/ethereum/abi/IAM.json";
import { ethers } from "ethers";
import { InvalidApplication } from "@/components/Developer/";
import { walletConnectType } from "@/models/.";
import { connectors } from "@/components/connectors";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  Textarea,
  Button,
  ButtonGroup,
  Tooltip,
} from "@chakra-ui/react";
import Jazzicon, { jsNumberForAddress } from "react-jazzicon";
import { Formik } from "formik";
import { ChevronRightIcon } from "@chakra-ui/icons";
import Link from "next/link";
import { regExpAppname, regExpUrl, truncateAddress } from "@/libs/string";

type Props = {
  client_id: string;
};
let provider: keyof walletConnectType;
declare let window: any;
let activate: any;
let active: boolean;
let library: any;
let account: string | null | undefined;
let IAMContract: ethers.Contract;
let signer: any | undefined;

export default function Client({ client_id }: Props) {
  library = useWeb3React().library;
  activate = useWeb3React().activate;
  active = useWeb3React().active;
  account = useWeb3React().account;
  const [client, setClient] = useState<any>();
  IAMContract = new ethers.Contract(
    process.env.IAM_CONTRACT_ADDRESS,
    Abi.abi,
    library
  );

  useEffect(() => {
    const getClient = async () => {
      if (account) {
        signer = library.getSigner();
        try {
          let _client = await IAMContract.connect(signer).getClientByOwner(
            client_id
          );
          setClient(_client);
          //console.log(_client);
        } catch (_error: any) {
          setClient(null);
        }
      }
    };

    getClient().catch(console.error);
  }, [account]);

  useEffect(() => {
    provider = window.localStorage.getItem("provider");

    if (provider) {
      activate(connectors[provider]);
    }
  }, []);

  if (active && client) {
    return (
      <DeveloperLayout>
        <div
          className={`${Styles.dFlex} ${Styles.flexItemsCenter} ${Styles.flexJustifyBetween}`}
        >
          <h1 className={Index.TitleAppPage}>{client?.client_name}</h1>
        </div>
        <div className={Index.divider}></div>
        <Breadcrumb
          spacing="8px"
          separator={<ChevronRightIcon color="gray.500" />}
        >
          <BreadcrumbItem>
            <Link href={`/developer/oauth/`} passHref>
              <BreadcrumbLink>OAuth Apps</BreadcrumbLink>
            </Link>
          </BreadcrumbItem>

          <BreadcrumbItem>
            <Link href={`/developer/oauth/client/${client.client_id}`} passHref>
              <BreadcrumbLink color="#007bff">
                {client.client_name}
              </BreadcrumbLink>
            </Link>
          </BreadcrumbItem>
        </Breadcrumb>

        <div className={Index.divider}></div>
        <div className={`${Styles.dFlex} ${Styles.flexItemsCenter}`}>
          <div className={`${Styles.mr2} ${Styles.mt1}`}>
            <Jazzicon
              diameter={32}
              seed={jsNumberForAddress(client.client_owner)}
            />
          </div>
          <span
            className={`${Styles.colorTheme} ${Styles.mr1} ${Styles.cPointer}`}
          >
            <Link
              href={`https://ropsten.etherscan.io/address/${client.client_owner}`}
              passHref
            >
              <a target="_blank">
                <Tooltip
                  label={ethers.utils.getAddress(client.client_owner)}
                  placement="right"
                >
                  {truncateAddress(
                    ethers.utils.getAddress(client.client_owner)
                  )}
                </Tooltip>
              </a>
            </Link>
          </span>
          owns this application
        </div>
        <div className={Index.divider}></div>
        <div
          className={`${Styles.dFlex} ${Styles.flexJustifyBetween} ${Styles.flexItemsCenter}`}
        >
          <span className={`${Index.countUserText}`}>0 User</span>
          <Button color="#cf222e">Revoke all user tokens</Button>
        </div>
        <div className={Index.divider}></div>
        <div className={Styles.my3}>
          <p className={Index.clientIdTitle}>Client ID</p>
          <p className={`${Index.clientIdText} ${Styles.cPointer}`}>
            {client.client_id}
          </p>
        </div>
        <div>
          <div
            className={`${Styles.dFlex} ${Styles.flexItemsCenter} ${Styles.flexJustifyBetween}`}
          >
            <p className={Index.clientSecretTitle}>Client Secrets</p>
            <Button size="sm" variant="solid">
              Renew client secret
            </Button>
          </div>
          <div className={`${Index.clientSecretContent} ${Styles.mt3}`}>
            <p className={`${Index.clientSecretText}`}>
              {client.client_secret}
            </p>
          </div>
        </div>
        <div>
          <Formik
            initialValues={{
              applicationName: client.client_name,
              homepageUrl: client.client_homepage,
              applicationDescription: client.client_description,
              applicationCallbackUrl: client.redirect_uri,
            }}
            validate={(values) => {
              const errors: any = {};
              if (regExpAppname(values.applicationName)) {
                errors.applicationName =
                  "Sorry, only letters (a-z,A-Z) and numbers (0-9), are allowed.";
              }
              if (regExpUrl(values.homepageUrl)) {
                errors.homepageUrl = "Url must be a valid URL";
              }
              if (regExpUrl(values.applicationCallbackUrl)) {
                errors.applicationCallbackUrl =
                  "Callback url must be a valid URL";
              }
              return errors;
            }}
            onSubmit={(values, { setSubmitting }) => {
              setTimeout(() => {
                setSubmitting(false);
              }, 400);
            }}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
            }) => (
              <form onSubmit={handleSubmit}>
                <FormControl
                  mt={6}
                  mb={3}
                  isRequired
                  isInvalid={
                    errors.applicationName &&
                    touched.applicationName &&
                    errors.applicationName
                      ? true
                      : false
                  }
                >
                  <FormLabel htmlFor="applicationNname">
                    Application name
                  </FormLabel>
                  <Input
                    id="applicationName"
                    name="applicationName"
                    type="text"
                    placeholder="Application name"
                    autoComplete="off"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.applicationName}
                  />

                  {errors.applicationName &&
                  touched.applicationName &&
                  errors.applicationName ? (
                    <FormErrorMessage>
                      {errors.applicationName}
                    </FormErrorMessage>
                  ) : (
                    <FormHelperText>
                      Something users will recognize and trust.
                    </FormHelperText>
                  )}
                </FormControl>
                <FormControl
                  mb={3}
                  isRequired
                  isInvalid={
                    errors.homepageUrl &&
                    touched.homepageUrl &&
                    errors.homepageUrl
                      ? true
                      : false
                  }
                >
                  <FormLabel htmlFor="homepageUrl">Homepage URL</FormLabel>
                  <Input
                    id="homepageUrl"
                    name="homepageUrl"
                    type="text"
                    placeholder="Homepage URL"
                    autoComplete="off"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.homepageUrl}
                  />
                  {errors.homepageUrl &&
                  touched.homepageUrl &&
                  errors.homepageUrl ? (
                    <FormErrorMessage>{errors.homepageUrl}</FormErrorMessage>
                  ) : (
                    <FormHelperText>
                      The full URL to your application homepage.
                    </FormHelperText>
                  )}
                </FormControl>
                <FormControl mb={3} isRequired>
                  <FormLabel htmlFor="applicationDescription">
                    Application description
                  </FormLabel>
                  <Textarea
                    id="applicationDescription"
                    name="applicationDescription"
                    placeholder="Application description is optional"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.applicationDescription}
                  />
                  <FormHelperText>
                    This is displayed to all users of your application.
                  </FormHelperText>
                </FormControl>
                <FormControl
                  mb={6}
                  isRequired
                  isInvalid={
                    errors.applicationCallbackUrl &&
                    touched.applicationCallbackUrl &&
                    errors.applicationCallbackUrl
                      ? true
                      : false
                  }
                >
                  <FormLabel htmlFor="applicationCallbackUrl">
                    Authorization callback URL
                  </FormLabel>
                  <Input
                    id="applicationCallbackUrl"
                    name="applicationCallbackUrl"
                    type="text"
                    placeholder="Authorization callback URL"
                    autoComplete="off"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.applicationCallbackUrl}
                  />
                  {errors.applicationCallbackUrl &&
                  touched.applicationCallbackUrl &&
                  errors.applicationCallbackUrl ? (
                    <FormErrorMessage>
                      {errors.applicationCallbackUrl}
                    </FormErrorMessage>
                  ) : (
                    <FormHelperText>
                      Your application’s callback URL. Read our OAuth
                      documentation for more information.
                    </FormHelperText>
                  )}
                </FormControl>
                <ButtonGroup spacing="4">
                  <Button
                    backgroundColor="#007bff"
                    color="#ffffff"
                    type="submit"
                    _hover={{ backgroundColor: "#0069d9" }}
                    disabled={isSubmitting}
                  >
                    Update Application
                  </Button>
                  <Link href="/developer/oauth" passHref>
                    <Button>Back</Button>
                  </Link>
                </ButtonGroup>
              </form>
            )}
          </Formik>
        </div>
      </DeveloperLayout>
    );
  }
  return (
    <DeveloperLayout>
      <InvalidApplication></InvalidApplication>
    </DeveloperLayout>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const queryParams = context.query;
  return { props: { client_id: queryParams.client_id } };
};
