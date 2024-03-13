import { Schema } from "mongoose";
import { z } from "zod";

export const User = z.object({
  id: z.string(),
  name: z.string().default(""),
  email: z.string().email().default(""),
  nonce: z.number().default(0),
  address: z.string(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
});

export const ItemTxn = z.object({
  id: z.string(),
  userId: z.instanceof(Schema.Types.ObjectId),
  hash: z.string(),
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
 * 
 * */

export const Point = z.object({
  x : z.number(),
  y : z.number(),
})

export const OutTreasureMap = z.object({
  points: z.array(Point),
  // leaves: z.array(z.string())
})

export type OutTreasureMap = z.infer<typeof OutTreasureMap>;
