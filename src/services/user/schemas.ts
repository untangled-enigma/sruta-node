import * as ITF from "./interfaces";
import { InHeaders } from "../auth/interfaces"


// export const CommitTreasure = {
//     description: "Hero commit recent found treasure",
//     tags: ["User"],
//     summary: "Commit Treasure",
//     headers: InHeaders,
//     body: ITF.InCommitItems ,
//     response: {
//       200: ITF.OutMessage,
//     },
//   };

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

export const UserActivity = {
  summary: "User Activity",
  description: "API to record user game activity",
  tags: ["User"],
  headers: InHeaders,
  body: ITF.InUserActivity,
  response: {
    200: ITF.OutMessage,
  },
}