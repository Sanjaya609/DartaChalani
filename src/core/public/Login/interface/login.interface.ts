export interface ILoginPayload {
  username: string
  password: string
  grant_type: string
}

export interface ILoginResponse {
  access_token: string
  token_type: string
  refresh_token: string
  expires_in: number
  scope: string
}
