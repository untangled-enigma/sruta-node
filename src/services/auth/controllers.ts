import { ICtrl } from "../../types/controller";
import * as ITF from "./interfaces";
import User from "../user/model";
import Utils from "../../utils";
import { IUser } from "../user/interfaces";


export const Token: ICtrl<ITF.OutToken, ITF.InToken> = async (req) => {
  const { authorization } = req.headers;

  const user = Utils.JWT.Decode(authorization ?? "") as IUser;

  return user;
};

export const RefreshToken: ICtrl<
  ITF.OutRefreshToken,
  ITF.InRefreshToken
> = async (req) => {
  const { authorization } = req.headers;

  const user = Utils.JWT.Decode(authorization ?? "") as IUser;

  const getUser = await User.findById(user.id);
  if (!getUser) throw new Error("User not found");

  const token = Utils.JWT.Sign(getUser.toJSON());

  return { token };
};

export const Login: ICtrl<ITF.OutRegister, ITF.InLogin> = async (req) => {
  const minaSigner = await import("mina-signer");
  const body = req.body;
  var signerClient = new minaSigner.Client({ network: "mainnet" });
  const publicKey = body.address

  let nonce = 0;
  //check if user already present by address
  let user = await User.findOne({ address : publicKey });
  if(user) {
    nonce = user.nonce
  }

  const verifyBody = {
    data: nonce.toString(), 
    publicKey , 
    signature: body.signature
  };

  const verifyResult = signerClient.verifyMessage(verifyBody);

  if(!verifyResult) {
    throw new Error("Invalid signature");
  }
  
  if (!user) {
  await User.create({
        name : body.name,
        email : body.email,
        address : body.address,
        nonce
    });
  }

  //increment nonce of the user
  await User.findOneAndUpdate({ address : body.address }, {nonce : ++nonce});

  const token = Utils.JWT.Sign(user);

  return { token };

};

export const Nonce: ICtrl<ITF.OutNonce, ITF.InAddress> = async (req) => {
  const { address } = req.params;
  let nonce = 0
  const user = await User.findOne({ address: address });
  if (user) {
    nonce = user.nonce
  }

  return { nonce }
}