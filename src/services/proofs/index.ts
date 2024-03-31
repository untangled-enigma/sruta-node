import * as Controller from "./controllers";
import * as Schemas from "./schemas";

import { RouteOptions } from "fastify";

export const RequestProof = {
    method: "GET",
    url: "/api/request-proof",
    handler: Controller.RequestScoreProof,
    schema: Schemas.RequestScoreProof ,
    onRequest: (f) => f.jwtVerify(),
  } as RouteOptions;

export const GetProof = {
    method: "GET",
    url: "/api/get-proofs",
    handler: Controller.GetScoreProof,
    schema: Schemas.GetProofDetails ,
    onRequest: (f) => f.jwtVerify(),
  } as RouteOptions;