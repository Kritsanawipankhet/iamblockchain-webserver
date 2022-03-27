export type TAuthorize = {
  client_id: string | string[];
  redirect_uri: string | string[];
  login?: string | string[];
  scope?: string | string[];
  state?: string | string[];
  allow_sigup?: string | string[];
};

export type TAuthorizationCode = {
  authorization_code: string;
  expires_at: number;
  redirect_uri: string;
  client_id: string;
  user: string;
};
