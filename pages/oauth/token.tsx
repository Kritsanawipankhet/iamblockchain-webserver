import React from "react";
import { GetServerSideProps } from "next";

type Props = {};

export default function Token({}: Props) {
  return (
    <div>
      <form method="post" action="http://iamtodo.vercel.app/">
        <button type="submit" value="submit">
          POST
        </button>
      </form>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const queryParams = context.query;
  console.log(queryParams);
  // if (queryParams.redirect_uri) {
  //   if (queryParams.redirect_uri != client.redirect_uri) {
  //     client.error_code = 400;
  //     client.error_description =
  //       "The redirect_uri must match the registered callback URL for this application";
  //     return { props: { error: client } };
  //   }
  // }
  return { props: {} };
};
