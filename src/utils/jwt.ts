
import Fastify from "..";

export const Sign = (payload: object) => Fastify.jwt.sign(payload);

export const Decode = (token: string) =>
  Fastify.jwt.decode(token?.replace("Bearer ", ""), {complete: false});

  
export const extractJwtDetails = ( jwtData:any ) => { return { "_id" :jwtData["_doc"]["_id"] , "address" :jwtData["_doc"]["address"]   } }  ;
