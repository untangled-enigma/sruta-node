import * as ITF from "./interfaces";
import { InHeaders } from "../auth/interfaces"


export const CommitTreasure = {
    description: "Hero commit recent found treasure",
    tags: ["User"],
    summary: "Commit Treasure",
    headers: InHeaders,
    body: ITF.CommitItems ,
    response: {
      200: ITF.OutCommitItems,
    },
  };

//TODO: Add mapId as param for specific MAP
export const TreasureMap = {
  description: "Fetchs Treasure Map for UI",
  tags: ["Map"],
  summary: "Treasure Map",
  headers: InHeaders,
  response: {
    200: ITF.OutTreasureMap,
  },
}  