import { verifyMessage } from "ethers"
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
  const body = req.body;
  const  signature = body.signature
  const userAddress = body.address.toLocaleLowerCase()
  
  let nonce = 0;
  //check if user already present by address
  let user = await User.findOne({ address : userAddress });
  if(user) {
    nonce = user.nonce
  }

  if ( userAddress !== verifyMessage(nonce.toString(),signature).toLowerCase() )
  {
    throw new Error("Invalid signature");
  }
  
  if (!user) {
  await User.create({
        name : body.name,
        email : body.email,
        address : body.address.toLocaleLowerCase(),
        nonce
    });
  }

  //increment nonce of the user
  await User.findOneAndUpdate({ address : userAddress }, {nonce : ++nonce});

  const token = Utils.JWT.Sign(user);

  return { token };
};

export const Nonce:  ICtrl<ITF.OutNonce, ITF.InAddress  > = async (req) => {
  const { address } = req.params;
  let nonce = 0
  const user = await User.findOne({ address: address.toLowerCase() });
  if(user) {
    nonce = user.nonce
  }

  return {nonce}
}