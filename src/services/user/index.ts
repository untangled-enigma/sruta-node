import * as Controller from "./controllers";
import * as Schemas from "./schemas";

import { RouteOptions } from "fastify";

// export const CommitTreasure = {
//     method: "POST",
//     url: "/api/user/commit",
//     handler: Controller.CommitTreasure,
//     schema: Schemas.CommitTreasure ,
//   } as RouteOptions;


export const TreasureMap = {
    method: "GET",
    url: "/api/map",
    handler: Controller.TreasureMap,
    onRequest: (f) => f.jwtVerify(),
    schema: Schemas.TreasureMap ,
  } as RouteOptions;

