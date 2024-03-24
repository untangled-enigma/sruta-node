import { Schema, model, models } from "mongoose";
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

const UserActivitySchema = new Schema<ITF.IUserActivity>({
    type : {type :String, required : true },
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    content : {type: String ,  required : true},
},
Plugins.Mongo.Normalize())

export const UserModel = models?.User ?? model<ITF.IUser>("User", UserSchema);
export const UserActivityModel = models?.UserActivityModel ?? model<ITF.IUserActivity>("UserActivity", UserActivitySchema);
