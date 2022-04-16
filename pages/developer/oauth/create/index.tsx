import React, { useEffect, useState } from "react";
import { DeveloperLayout } from "@/components/layouts/developer";
import { useWeb3React } from "@web3-react/core";
import Index from "@/styles/dev.oauth.module.css";
import Styles from "@/styles/styles.module.css";
import { ICreateClient } from "@/models/.";
import crypto from "crypto";
import { v4 as uuid } from "uuid";
import { Formik } from "formik";
import { toSvg } from "jdenticon";
import { ethers } from "ethers";
import Abi from "@/ethereum/abi/IAM.json";
import {
  makeClientSecret,
  setBg,
  regExpAppname,
  regExpUrl,
} from "@/libs/string";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  Textarea,
  Button,
  ButtonGroup,
} from "@chakra-ui/react";
import Link from "next/link";
import { PermissionDenied } from "@/components/Developer/";

type Props = {};
declare let window: any;
let activate: any;
let active: boolean;
let library: any;
let account: string | undefined | null;

export default function OAuthCreate({}: Props) {
  const { chainId, deactivate, error } = useWeb3React();
  const [color, setColor] = useState("#000000ff");
  library = useWeb3React().library;
  activate = useWeb3React().activate;
  active = useWeb3React().active;
  account = useWeb3React().account;
  useEffect(() => setColor(setBg()), []);

  if (active) {
    return (
      <DeveloperLayout>
        <div>
          <div
            className={`${Styles.dFlex} ${Styles.flexItemsCenter} ${Styles.flexJustifyBetween}`}
          >
            <h1 className={Index.TitlePageMedium}>
              Register a new OAuth Application
            </h1>
          </div>
          <div className={Index.divider}></div>
          <div>
            <Formik
              initialValues={{
                applicationName: "",
                homepageUrl: "",
                applicationDescription: "",
                applicationCallbackUrl: "",
                logoBgColor: color,
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
                  createClientSubmit(values);
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
                      Register Application
                    </Button>
                    <Link href="/developer/oauth" passHref>
                      <Button>Cancel</Button>
                    </Link>
                  </ButtonGroup>
                </form>
              )}
            </Formik>
          </div>
        </div>
      </DeveloperLayout>
    );
  }
  return (
    <DeveloperLayout>
      <PermissionDenied></PermissionDenied>
    </DeveloperLayout>
  );
}

const createClientSubmit = async (_values: any) => {
  const clientId = uuid();
  const clientLogo = toSvg(clientId, 100, {
    lightness: {
      color: [1.0, 1.0],
      grayscale: [1.0, 1.0],
    },
    saturation: {
      color: 1.0,
      grayscale: 0.0,
    },
    backColor: _values.logoBgColor,
  });

  const credentialsClient: ICreateClient = {
    client_id: clientId,
    client_secret: makeClientSecret(32),
    client_name: _values.applicationName,
    client_logo: Buffer.from(
      `data:image/svg+xml;base64,${Buffer.from(clientLogo).toString("base64")}`
    ).toString("base64"),
    client_homepage: _values.homepageUrl,
    client_description: _values.applicationDescription,
    redirect_uri: _values.applicationCallbackUrl,
  };

  if (active) {
    const IAMContract: ethers.Contract = new ethers.Contract(
      process.env.IAM_CONTRACT_ADDRESS,
      Abi.abi,
      library
    );
    const signer = library.getSigner();
    try {
      const createClientTx = await IAMContract.connect(signer).createClient(
        credentialsClient.client_id,
        credentialsClient.client_secret,
        credentialsClient.client_name,
        credentialsClient.client_logo,
        credentialsClient.client_description,
        credentialsClient.client_homepage.toLowerCase(),
        credentialsClient.redirect_uri.toLowerCase()
      );
      console.log(`Data Transfer : ${JSON.stringify(credentialsClient)}`);
      console.log("Tx : ", createClientTx);
      const receipt = await createClientTx.wait();
      console.log("Receipt : ", receipt);
    } catch (_e: any) {
      console.log(_e);
    }
    // console.log(library);
    // console.log(IAMContract);
  }
  // console.log(credentialsClient);
  // alert(JSON.stringify(credentialsClient, null, 2));
};
