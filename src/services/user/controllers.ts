
import { ICtrl } from "../../types/controller";
import Utils from "../../utils";
import * as ITF from "./interfaces";
import { ItemTxnModel as ItemTransactions } from "../user/model";
import { Types } from "mongoose";

const ITEMS = [
    { x: 2000, y: 3000, key: 1 },
    { x: 2000, y: 3500, key: 2 },
    { x: 2500, y: 3500, key: 3 },
    { x: 2000, y: 2500, key: 4 },
    { x: 2000, y: -2000, key: 5 },
    { x: 2000, y: 4000, key: 6 },
    { x: 1500, y: 3500, key: 7 },
    { x: 1000, y: 3500, key: 8 },
    { x: 500, y: 3500, key: 9 },
    { x: 1000, y: 3000, key: 10 },
    { x: -1000, y: 2000, key: 11 },
    { x: -1500, y: 2000, key: 12 },
    { x: -2000, y: 2100, key: 13 },
]

export const CommitTreasure: ICtrl<ITF.OutMessage, ITF.InCommitItems> = async (req) => {
    //extract user
    const { authorization } = req.headers;

    const user = Utils.JWT.Decode(authorization ?? "") as ITF.IUser;

    // user.id

    const body = req.body;

    const content = body.items.join(",");

    await ItemTransactions.create({
        userId: new Types.ObjectId(user.id),
        content
    })

    /// Check if 

    return { message: "Item commited successfully" }
}


export const TreasureMap: ICtrl<ITF.OutTreasureMap> = async (req) => {
    const points = [
        { x: 2000, y: 3000 },
        { x: 2000, y: 3500 },
        { x: 2500, y: 3500 },
        { x: 2000, y: 2500 },
        { x: 2000, y: -2000 },
        { x: 2000, y: 4000 },
        { x: 1500, y: 3500 },
        { x: 1000, y: 3500 },
        { x: 500, y: 3500 },
        { x: 1000, y: 3000 },
        { x: -1000, y: 2000 },
        { x: -1500, y: 2000 },
        { x: -2000, y: 2100 },
    ]

    return { points }
}

