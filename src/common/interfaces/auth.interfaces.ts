export interface AuthInput {
  username: string;
  password: string;
}

export interface AuthResult {
  accessToken: string;
  user: SignInData;
}

export interface SignInData {
  id: number;
  username: string;
}

