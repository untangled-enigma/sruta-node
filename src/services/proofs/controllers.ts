import { ICtrl } from "../../types/controller";
import Utils from "../../utils";
import { InToken } from "../auth/interfaces";
import * as ITF from "./interfaces";
import { Types } from "mongoose";
import { ProofModel } from "./model"

import { ScoreTree, constructTree } from "../user/controllers"

export const RequestScoreProof: ICtrl<ITF.OutRequestProof, InToken> = async (req) => {
    //extract user
    const { authorization } = req.headers;
    const { _id } = Utils.JWT.extractJwtDetails(Utils.JWT.Decode(authorization ?? ""))

    //fetch latest root
    if (!ScoreTree) {
        await constructTree()
    }

    const root = ScoreTree.getRoot().toString();
    //check if request is already submitted
     const doc = await ProofModel.findOne({ userId: new Types.ObjectId(_id), root }).sort({ _id: -1 }) as ITF.IProof
     if(doc){
        return { message: `Request already submmited for ${doc.root} on ${doc.createdAt} Status: ${doc.status}` }
     }
     //create an entry to the table
     const newReq = await ProofModel.create({
        root,
        userId: new Types.ObjectId(_id), 
        status : ITF.StatusEnum.enum["IN-PROGRESS"]
     })
    //start async proof generation

    return { message: `Request submmited sucessfuly of score proof at ${root}` }
}
