import { Schema,models,model } from "mongoose";
import * as ITF from "./interfaces";
import Plugins from "../../plugins";

const ProofSchema = new Schema<ITF.IProof>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    root: { type: String, required:true },
    fileUrl: { type: String, required: false },
  },
  Plugins.Mongo.Normalize()
);

export const ProofModel = models?.Proof ?? model<ITF.IProof>("Proof", ProofSchema);

