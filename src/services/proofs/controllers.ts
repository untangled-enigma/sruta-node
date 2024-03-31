import { ICtrl } from "../../types/controller";
import Utils from "../../utils";
import { InToken } from "../auth/interfaces";
import * as ITF from "./interfaces";
import { Types } from "mongoose";
import { ProofModel } from "./model"

import { ScoreTree, constructTree } from "../user/controllers"
import { scoreEngine } from "../..";
import { IUser } from "../user/interfaces";
import { UserModel } from "../user/model";

export const RequestScoreProof: ICtrl<ITF.OutRequestProof, InToken> = async (req) => {

    //extract user
    const { authorization } = req.headers;
    const { _id } = Utils.JWT.extractJwtDetails(Utils.JWT.Decode(authorization ?? ""))

    //fetch latest root
    if (!ScoreTree) {
        await constructTree()
    }

    const user = await UserModel.findById({ _id: new Types.ObjectId(_id) }) as IUser
    if (!user) {
        throw new Error("User not found")
    }

    const root = ScoreTree.getRoot().toString();
    //check if request is already submitted
    const doc = await ProofModel.findOne({ userId: new Types.ObjectId(_id), root }).sort({ _id: -1 }).populate("userId") as ITF.IProof
    if (doc) {
        return { message: `Request already submmited for ${doc.root} on ${doc.createdAt} Status: ${doc.status}` }
    }

    //create an entry to the table
    const newReq = await ProofModel.create({
        root,
        userId: new Types.ObjectId(_id),
        status: ITF.StatusEnum.enum["IN-PROGRESS"]
    })

    {
        const o1js = await import("o1js")
        const zkcollector = await import("zkcollector-contract")
        //@ts-ignore
        const userField = o1js.Field(user.tIndex)
        //@ts-ignore
        const sInput = new zkcollector.ScoreInput({
            userId: userField,
            //@ts-ignore
            score: ScoreTree.get(userField),
            root: ScoreTree.getRoot()
        })

        scoreEngine.checkScore(sInput, ScoreTree.getWitness(userField)).then((proof: any) => {
            //@ts-ignore 
            uploadToStorage(proof, newReq._id, root, user.tIndex?.toString())
        })

    }


    return { message: `Request submmited sucessfuly of score proof at ${root}` }
}


function uploadToStorage(fileData: any, docId: any, root: string, tIndex: string) {

    const formData = new FormData();

    // Stringify your JSON object // Replace with your actual JSON object
    const jsonString = JSON.stringify(fileData);
    const blob = new Blob([jsonString], { type: 'application/json' });

    formData.append("file", blob, `proof-${tIndex}}-${root}`);
    formData.append("folderId", "d37509cb-9613-4883-8011-fba1694be444");

    fetch('https://store1.gofile.io/contents/uploadfile', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${process.env.GOFILE_APIKEY}`
        },
        body: formData
    })
        .then(response => response.json())
        .then(async (data) => {
            await ProofModel.findOneAndUpdate({ "_id": new Types.ObjectId(docId) }, {
                fileUrl: data.data.downloadPage,
                status: ITF.StatusEnum.enum["DONE"]
            })

        })
        .catch(error => console.error(error));

}


export const GetScoreProof: ICtrl<ITF.OutProofDetails, InToken> = async (req) => {
    const { authorization } = req.headers;
    const { _id } = Utils.JWT.extractJwtDetails(Utils.JWT.Decode(authorization ?? ""))

    let result = await ProofModel.find({ userId: new Types.ObjectId(_id) }).select("-userId -_id")

    const proofs = []

    for (var i = 0; i < result.length; i++) {
        proofs.push({
            root: result[i].root,
            status: result[i].status,
            fileUrl: result[i].fileUrl,
            createdAt: result[i].createdAt.toDateString(),
            updatedAt: result[i].updatedAt.toDateString(),
        })
    }

    return { proofs }
}