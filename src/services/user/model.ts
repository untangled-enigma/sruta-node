import { Schema, model, models, ObjectId } from "mongoose";
import * as ITF from "./interfaces";
import Plugins from "../../plugins";

const UserSchema = new Schema<ITF.IUser>(
  {
    name: { type: String, },
    email: { type: String, },
    address: { type: String, required: true, index: true, unique: true, },
    nonce: { type: Number, required: true, default: 0 }
  },
  Plugins.Mongo.Normalize()
);

const ItemTxnSchema = new Schema<ITF.IItemTxn>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    hash: { type: String, },
    content: { type: String, },
  }
)

export const UserModel = models?.User ?? model<ITF.IUser>("User", UserSchema);
export const ItemTxnModel = models?.ItemTxn ?? model<ITF.IItemTxn>("ItemTxn", ItemTxnSchema);