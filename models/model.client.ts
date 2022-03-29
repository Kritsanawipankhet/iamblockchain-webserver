export type TClient = {
  client_name: string;
  client_secret: string;
  clieet_logo: string;
  client_description: string;
  client_homepage: string;
  redirect_uri: string;
  client_owner: string;
  update_date: number;
  create_date: number;
  error?: string;
  error_description?: string;
  error_code?: number;
};

// export type TErrorClient = {
//   state: string;
//   error: string;
//   error_description: string;
//   error_code?: number;
//   error_uri?: string;
// };
