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

export interface ICreateClient {
  client_id: string;
  client_secret: string;
  client_name: string;
  client_homepage: string;
  client_description?: string;
  redirect_uri: string;
}
