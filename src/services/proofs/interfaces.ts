import { z } from "zod";
import { Schema } from "mongoose";

export const StatusEnum = z.enum(["IN-PROGRESS", "DONE"])

export const Proof = z.object({
    userId:  z.instanceof(Schema.Types.ObjectId),
    root : z.string(),
    status: StatusEnum,
    fileUrl: z.string().optional(),
    createdAt: z.string().optional(),
    updatedAt: z.string().optional(),
})
export type IProof = z.infer<typeof Proof>;


export const OutRequestProof = z.object({
    "message" : z.string()
})
export type OutRequestProof = z.infer<typeof OutRequestProof>;



export const OutProofDetails = z.object({
    createdAt: z.string().optional(),
    updatedAt: z.string().optional(),
})