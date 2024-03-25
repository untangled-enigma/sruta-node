
import { ICtrl } from "../../types/controller";
import Utils from "../../utils";
import * as ITF from "./interfaces";
import { ItemTxnModel as ItemTransactions, UserModel as User, UserPointModel, ScoreTransactionModel } from "../user/model";
import { Types } from "mongoose";
import { InToken } from "../auth/interfaces";

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

let ScoreTree: any;

export const CommitTreasure: ICtrl<ITF.OutMessage, ITF.InCommitItems> = async (req) => {
    //extract user
    const { authorization } = req.headers;
    const { _id } = Utils.JWT.extractJwtDetails(Utils.JWT.Decode(authorization ?? ""))

    const content = req.body.items.join(",");

    await ItemTransactions.create({
        userId: new Types.ObjectId(_id),
        content
    })

    //fetch user points
    const userPointsObj = await UserPointModel.findOne({ userId: new Types.ObjectId(_id) }).populate("userId") as ITF.IUserPoint;
    let userScore = 0;
    if (userPointsObj) {
        userScore = userPointsObj.score
    }
    /**
     * NOTE: For now, each item is worth 100 points
     */

    userScore += req.body.items.length * 100
    await UserPointModel.findOneAndUpdate({ userId: new Types.ObjectId(_id) }, { score: userScore }, { upsert: true })

    if (!ScoreTree) {
        constructTree()
    }
    // Update merkle tree

    //@ts-ignore
    const hash = await updateTree(userPointsObj.userId.tIndex, userScore)
    await ScoreTransactionModel.create(
        { hash }
    )

    return { message: "Item commited successfully" }
}

async function updateTree(tIndex: number, score: number): Promise<string> {
    const o1js = await import("o1js");
    ScoreTree.set(o1js.Field(tIndex), o1js.Field(score))

    return ScoreTree.getRoot().toString();
}


async function constructTree() {
    const o1js = await import("o1js");
    ScoreTree = new o1js.MerkleMap()
    //fetch all the scores
    const allPoints = await UserPointModel.find().populate("userId")
    //construct tree root 
    allPoints.forEach((v) => {
        ScoreTree.set(o1js.Field(v.userId.tIndex), o1js.Field(v.score))
    })

}

export const TreasureMap: ICtrl<ITF.OutTreasureMap, InToken> = async (req) => {
    const { authorization } = req.headers;
    const { _id } = Utils.JWT.extractJwtDetails(Utils.JWT.Decode(authorization ?? ""))

    //fetch the items from db
    const txns = await ItemTransactions.find({ userId: new Types.ObjectId(_id) })

    const ItemKeys = txns.map((x) => x.content)
    let itemArray: string[] = [];

    ItemKeys.forEach(x => {
        itemArray = itemArray.concat(x.split(","))
    })

    const itemSet = new Set(itemArray)
    const points = ITEMS.filter((value) => !itemSet.has(value.key.toString()))

    return { points }
}

