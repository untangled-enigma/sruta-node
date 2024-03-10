import { z } from "zod";
import { User } from "../user/interfaces";

export const Token = z.object({
  token: z.string(),
});

export const Nonce = z.object({
  nonce: z.number(),
});

export const InAddress = User.pick({
  address: true,
});

export const InHeaders = z.object({
  authorization: z.string().optional(),
});


export const OutRegister = Token;
export const OutToken = User;
export const OutRefreshToken = Token;
export const OutNonce = Nonce;

export const InLogin = User.partial().omit({
  id: true,
  createdAt : true,
  updatedAt : true,
  nonce: true
}).extend({
  signature : z.string()
}).required({
  address : true,
  signature : true,
})


export type IToken = z.infer<typeof Token>;

export type OutRegister = z.infer<typeof OutRegister>;
export type OutToken = z.infer<typeof OutToken>;
export type OutRefreshToken = z.infer<typeof OutRefreshToken>;
export type OutNonce = z.infer<typeof OutNonce>;
export type InAddress = {
  params: z.infer<typeof InAddress>;
};


export type InLogin = {
  body: z.infer<typeof InLogin>;
};

export type InToken = {
  headers: z.infer<typeof InHeaders>;
};

export type InRefreshToken = {
  headers: z.infer<typeof InHeaders>;
};

export type InLoginV2 = {
  body: z.infer<typeof InLogin>;
};
