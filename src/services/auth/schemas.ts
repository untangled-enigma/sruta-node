import * as ITF from "./interfaces";

export const Token = {
  description: "This is the method token to Auth endpoint",
  tags: ["Auth"],
  summary: "Token Method",
  headers: ITF.InHeaders,
  response: {
    200: ITF.OutToken,
  },
};

export const RefreshToken = {
  description: "This is the method refresh token to Auth endpoint",
  tags: ["Auth"],
  summary: "Refresh Token Method",
  headers: ITF.InHeaders,
  response: {
    200: ITF.OutRefreshToken,
  },
};

export const Login = {
  description: "This is the method to Login via ECDSA Signature",
  tags: ["Auth"],
  summary: "ECDSA Signature Login",
  body: ITF.InLogin,
  response: {
    200: ITF.OutRegister,
  },
};

export const Nonce = {
  description: "This is the method to return nonce of user for signature",
  tags: ["Auth"],
  summary: "Signature Nonce",
  params: ITF.InAddress,
  response: {
    200: ITF.OutNonce,
  },
};

