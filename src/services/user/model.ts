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
    content: { type: String, }, /// For now, put item Ids as stringified form like 1,2,3,4....
  }
)

/// User Points
const UserPointSchema = new Schema<ITF.IUserPoint>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    score: { type: Number, default: 0  },
  },
  Plugins.Mongo.Normalize()
)

/// Root Hash transaction
const ScoreTransactionSchema = new Schema<ITF.IScoreTransaction>(
  {
    hash: { type: String,unique: true },
  },
  Plugins.Mongo.Normalize()
)


export const UserModel = models?.User ?? model<ITF.IUser>("User", UserSchema);
export const ItemTxnModel = models?.ItemTxn ?? model<ITF.IItemTxn>("ItemTransaction", ItemTxnSchema);
export const UserPointModel = models?.UserPoint ?? model<ITF.IUserPoint>("UserPoint", UserPointSchema);
export const ScoreTransactionModel = models?.ScoreTransaction ?? model<ITF.IScoreTransaction>("ScoreTransaction", ScoreTransactionSchema);