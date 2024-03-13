
import { ICtrl } from "../../types/controller";
import * as ITF from "./interfaces";


// export const CommitTreasure: ICtrl<ITF.OutMessage, ITF.InCommitItems > = async (req) => {
//     //run the proof with own inputs

//     //store the somewhere


//     return { message: "Item commited successfully" }
// }


export const TreasureMap: ICtrl<ITF.OutTreasureMap> = async (req) => {
    const o1js = await import("o1js");
    const points =  [
        { x: 2000, y: 3000 },
        { x: 2000, y: 3500},
        { x: 2500, y: 3500 },
        { x: 2000, y: 2500 },
        { x: 2000, y: -2000},
        { x: 2000, y: 4000 },
        { x: 1500, y: 3500 },
        { x: 1000, y: 3500 },
        { x: 500, y: 3500},
        { x: 1000, y: 3000 },
        { x: -1000, y: 2000 },
        { x: -1500, y: 2000 },
        { x: -2000, y: 2100 } ,
    ]

    // let leaves = points.map( point => o1js.Poseidon.hash( [o1js.Field(point.x),o1js.Field(point.y)] ).toString()  )
   
    return {  points  }
}