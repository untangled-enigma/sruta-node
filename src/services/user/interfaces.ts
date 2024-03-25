import { Schema } from "mongoose";
import { z } from "zod";

import { InHeaders } from "../auth/interfaces";

export const User = z.object({
  id: z.string(),
  name: z.string().default(""),
  email: z.string().email().default(""),
  nonce: z.number().default(0),
  address: z.string(),
  tIndex: z.number().optional(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
});

export const ItemTxn = z.object({
  id: z.string(),
  userId: z.instanceof(Schema.Types.ObjectId),
  content: z.string(),
});

export const Item = z.object({
  x : z.number(),
  y : z.number(),
  key : z.number(),
})

export type IUser = z.infer<typeof User>;
export type IItemTxn = z.infer<typeof ItemTxn>;
export type IItem = z.infer<typeof Item>;

export const Message = z.object({
  message: z.string(),
});


export const InItemtxn = ItemTxn.omit({
  id:true,
  userId: true
})

export const OutMessage = Message;

export type OutMessage = z.infer<typeof OutMessage>;
export type InItemtxn = z.infer<typeof InItemtxn>;

/**
 * Treasure Map
 * x : x-cordinate
 * y : y-cordinate
 * key: Item key
 * */

export const Point = z.object({
  x : z.number(),
  y : z.number(),
  key : z.number()
})

export const OutTreasureMap = z.object({
  points: z.array(Point),
})

export type OutTreasureMap = z.infer<typeof OutTreasureMap>;

export const CommitItems = z.object({
  items: z.array(z.string()),
})

export type InCommitItems = {
  body: z.infer<typeof CommitItems>,
  headers: z.infer<typeof InHeaders>;
};

export const UserToken = z.object({
  "_id": z.string(),
  "address" : z.string()
})
export type IUserToken = z.infer<typeof UserToken>;

//~~~~~~ User Score ~~~~~
export const UserPoint = z.object({
  userId: z.instanceof(Schema.Types.ObjectId),
  score : z.number(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
});
export type IUserPoint = z.infer<typeof UserPoint>;


// Type to store root hashes
export const ScoreTransaction = z.object({
  hash : z.string(),
  createdAt: z.string().optional(),
});
export type IScoreTransaction = z.infer<typeof ScoreTransaction>;
