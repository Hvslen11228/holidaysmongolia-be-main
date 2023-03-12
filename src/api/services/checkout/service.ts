import golomtModel from "../../../models/golomt";
import tour_model from "../../../models/orders";
import xanaduorders from "../../../models/xanaduorders";
import { Types } from "mongoose";
import axiosRequest from "../../../functions/axios";
export const service_one = async (body: any) => {
  try {
    console.log(body);
    const queryRes = await golomtModel.findOne(body);
    return Promise.resolve(queryRes);
  } catch (err) {
    return Promise.reject("Query error");
  }
};
export const service_create = async (body: any) => {
  try {
    const queryRes = await golomtModel.create(body);
    return Promise.resolve(queryRes);
  } catch (err) {
    console.log(err);
    return Promise.reject("Query error");
  }
};
export const service_remove = async (find: any) => {
  try {
    const queryRes = await golomtModel.findOneAndDelete(find);
    // const queryRes = await golomtModel.updateOne(find, {
    //   $set: { delFlg: true },
    // });
    return Promise.resolve(queryRes);
  } catch (err) {
    return Promise.reject("Query error");
  }
};
export const service_update = async (find: any, body: any) => {
  try {
    await golomtModel.updateOne({ ...find }, { $set: { ...body } });
    const queryRes = await golomtModel.findOne(find);
    return Promise.resolve(queryRes);
  } catch (err) {
    return Promise.reject("Query error");
  }
};
export const service_order_callback = async (id: any, data: any) => {
  try {
    await tour_model.updateOne(
      { _id: id },
      { $set: { type: true, pay_type: "paid" } }
    );
    const queryRes = await golomtModel.findOne({ _id: id });
    return Promise.resolve(queryRes);
  } catch (err) {
    return Promise.reject("Query error");
  }
};
export const service_xanadu_order_callback = async (id: any, data: any) => {
  try {
    await xanaduorders.updateOne(
      { _id: id },
      { $set: { type: true, pay_type: "paid" } }
    );
    const queryRes = await golomtModel.findOne({ _id: id });
    return Promise.resolve(queryRes);
  } catch (err) {
    return Promise.reject("Query error");
  }
};
