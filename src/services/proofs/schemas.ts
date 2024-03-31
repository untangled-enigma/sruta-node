import * as ITF from "./interfaces";
import { InHeaders } from "../auth/interfaces"

export const RequestScoreProof = {
    description: "Request to generate proof of score",
    tags: ["Proofs"],
    summary: "Score Proof Request",
    headers: InHeaders,
    response: {
      200: ITF.OutRequestProof,
    },
  };

export const GetProofDetails = {
    description: "Fetchs proof details for the submitted request",
    tags: ["Proofs"],
    summary: "Get proof details",
    headers: InHeaders,
    response: {
      200: ITF.OutProofDetails,
    },
  };
