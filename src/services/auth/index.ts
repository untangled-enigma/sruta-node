import * as Controller from "./controllers";
import * as Schemas from "./schemas";

import { RouteOptions } from "fastify";

export const Login = {
  method: "POST",
  url: "/api/auth/login",
  handler: Controller.Login,
  schema: Schemas.Login,
} as RouteOptions;

export const Nonce = {
  method: "GET",
  url: "/api/auth/nonce/:address",
  handler: Controller.Nonce,
  schema: Schemas.Nonce,
} as RouteOptions;

export const Token = {
  method: "GET",
  url: "/api/auth/token",
  handler: Controller.Token,
  schema: Schemas.Token,
  onRequest: (f) => f.jwtVerify(),
} as RouteOptions;

export const RefreshToken = {
  method: "GET",
  url: "/api/auth/refreshToken",
  handler: Controller.RefreshToken,
  schema: Schemas.RefreshToken,
  onRequest: (f) => f.jwtVerify(),
} as RouteOptions;
