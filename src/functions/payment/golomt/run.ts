import { create_golomt_simple, golomt_checking } from "./service";
import { Types } from "mongoose";
import crypto from "crypto";
const hmac256 = async (key: any, message: any) => {
  const hash = crypto.createHmac("sha256", key).update(message);
  return hash.digest("hex");
};
export const create = async (body: any) => {
  try {
    const data = {
      amount: body.amount,
      callback: process.env.GOLOMT_CALLBACK + body.id,
      checksum: "",
      genToken: "Y",
      returnType: "GET",
      transactionId: new Types.ObjectId().toString(),
    };
    data.checksum = await hmac256(
      process.env.GOLOMT_KEY,
      `${data.transactionId}${data.amount}${data.returnType}${data.callback}`
    );
    const list = await create_golomt_simple(data);
    return Promise.resolve(list);
  } catch (error) {
    return Promise.reject(error);
  }
};
export const checking = async (transactionId: string) => {
  try {
    const data = {
      checksum: "",
      transactionId: transactionId,
    };
    data.checksum = await hmac256(
      process.env.GOLOMT_KEY,
      `${data.transactionId}${data.transactionId}`
    );
    const list = await golomt_checking(data);
    return Promise.resolve(list);
  } catch (error) {
    return Promise.reject(error);
  }
};
export default { create, checking };
