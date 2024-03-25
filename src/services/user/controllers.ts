
import { ICtrl } from "../../types/controller";
import Utils from "../../utils";
import * as ITF from "./interfaces";
import { ItemTxnModel as ItemTransactions, UserModel as User, UserPointModel  } from "../user/model";
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

export const CommitTreasure: ICtrl<ITF.OutMessage, ITF.InCommitItems> = async (req) => {
    //extract user
    const { authorization } = req.headers;
    const {_id} =  Utils.JWT.extractJwtDetails(Utils.JWT.Decode(authorization ?? ""))

    const content = req.body.items.join(",");

    await ItemTransactions.create({
        userId: new Types.ObjectId(_id),
        content
    })

    //fetch user points
    const userPointsObj = await UserPointModel.findById({_id}) as ITF.IUserPoint;
    let userScore = 0;
    if(userPointsObj)
    {
        userScore = userPointsObj.score
    }
    /**
     * NOTE: For now, each item is worth 100 points
     */

    userScore += req.body.items.length * 100
    await UserPointModel.findOneAndUpdate({_id}, { score:userScore }, {upsert:true})
    
    return { message: "Item commited successfully" }
}


export const TreasureMap: ICtrl<ITF.OutTreasureMap, InToken > = async (req) => {
    const { authorization } = req.headers;
    const {_id} =  Utils.JWT.extractJwtDetails(Utils.JWT.Decode(authorization ?? ""))
   
    //fetch the items from db
    const txns = await ItemTransactions.find({ userId : new Types.ObjectId(_id) })

    const ItemKeys = txns.map((x)=> x.content)
    let itemArray:string[] = [];

    ItemKeys.forEach(x => {
        itemArray = itemArray.concat(x.split(",") ) 
    })

    const itemSet = new Set(itemArray)
    const points = ITEMS.filter((value)=> !itemSet.has(value.key.toString()) )

    return { points }
}

