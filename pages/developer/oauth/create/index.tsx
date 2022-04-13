import React, { useEffect, useState } from "react";
import { DeveloperLayout } from "@/components/layouts/developer";
import { useWeb3React } from "@web3-react/core";
import Index from "@/styles/dev.oauth.module.css";
import Styles from "@/styles/styles.module.css";
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
  const [application, setApplication] = useState("");
  const [homeUrl, setHomeUrl] = useState("");
  const [applicationDescription, setApplicationDescription] = useState("");
  const [authorizationCallback, setAuthorizationCallback] = useState("");

  const handleSubmit = (event: any) => {
    event.preventDefault();
    alert("Comming Soon");
    console.log(event);
  };
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
            <form onSubmit={handleSubmit}>
              <FormControl mt={6} mb={3} isRequired={true} isInvalid={false}>
                <FormLabel htmlFor="application-name">
                  Application name
                </FormLabel>
                <Input
                  id="application-name"
                  placeholder="Application name"
                  autoComplete="off"
                  onChange={(event) =>
                    setApplication(event.currentTarget.value)
                  }
                />
                <FormHelperText>
                  Something users will recognize and trust.
                </FormHelperText>
              </FormControl>
              <FormControl mb={3} isRequired>
                <FormLabel htmlFor="homepage-url">Homepage URL</FormLabel>
                <Input
                  id="homepage-url"
                  placeholder="Homepage URL"
                  autoComplete="off"
                  onChange={(event) => setHomeUrl(event.currentTarget.value)}
                />
                <FormHelperText>
                  The full URL to your application homepage.
                </FormHelperText>
              </FormControl>
              <FormControl mb={3}>
                <FormLabel htmlFor="application-description">
                  Application description
                </FormLabel>
                <Textarea
                  id="application-description"
                  placeholder="Application description is optional"
                  onChange={(event) =>
                    setApplicationDescription(event.currentTarget.value)
                  }
                />
                <FormHelperText>
                  This is displayed to all users of your application.
                </FormHelperText>
              </FormControl>
              <FormControl mb={6} isRequired>
                <FormLabel htmlFor="authorization-callback-url">
                  Authorization callback URL
                </FormLabel>
                <Input
                  id="authorization-callback-url"
                  placeholder="Authorization callback URL"
                  autoComplete="off"
                  onChange={(event) =>
                    setAuthorizationCallback(event.currentTarget.value)
                  }
                />
                <FormHelperText>
                  Your application’s callback URL. Read our OAuth documentation
                  for more information.
                </FormHelperText>
              </FormControl>
              <ButtonGroup spacing="4">
                <Button colorScheme="blue" type="submit">
                  Register Application
                </Button>
                <Link href="/developer/oauth" passHref>
                  <Button>Cancel</Button>
                </Link>
              </ButtonGroup>
            </form>
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
