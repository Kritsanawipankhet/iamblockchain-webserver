import React, { useEffect, useState } from "react";
import { DeveloperLayout } from "@/components/layouts/developer";
import { useWeb3React } from "@web3-react/core";
import Index from "@/styles/dev.oauth.module.css";
import Styles from "@/styles/styles.module.css";
import { ICreateClient } from "@/models/.";
import crypto from "crypto";
import { v4 as uuid } from "uuid";
import { Formik } from "formik";

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
import PermissionDenied from "@/components/Developer/PermissionDenied";

type Props = {};

export default function OAuthCreate({}: Props) {
  const { active, account } = useWeb3React();

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
                  <FormControl mb={3}>
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
                      colorScheme="blue"
                      type="submit"
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
  const seed = crypto.randomBytes(256);
  const code = crypto.createHash("sha1").update(seed).digest("hex");

  const credentialsClient: ICreateClient = {
    client_id: uuid(),
    client_secret: makeClientSecret(32),
    client_name: _values.applicationName,
    client_homepage: _values.homepageUrl,
    client_description: _values.applicationDescription,
    redirect_uri: _values.applicationCallbackUrl,
  };

  console.log(credentialsClient);
  alert(JSON.stringify(credentialsClient, null, 2));
};

const makeClientSecret = (length: number): string => {
  let secret = "";
  let characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    secret += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return secret;
};

const regExpAppname = (_appName: string): boolean => {
  return !/^[a-z0-9\s]+[a-z0-9\s]*$/gi.test(_appName);
};
const regExpUrl = (url: string): boolean => {
  return !/^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,}))\.?)(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(
    url
  );
};
