import media_model from "../../../models/media";
import { Types } from "mongoose";
const { ObjectId } = Types;
export const service_find = async (body: any, sort: any) => {
  try {
    const res = await media_model.find(body).sort(sort);
    return Promise.resolve(res);
  } catch (err) {
    console.log(err);
    return Promise.reject("Query error");
  }
};
export const service_find_one = async (body: any) => {
  try {
    const res = await media_model.findOne(body);
    return Promise.resolve(res);
  } catch (err) {
    console.log(err);
    return Promise.reject("Query error");
  }
};
export const service_create = async (body: any) => {
  try {
    const res = await media_model.create(body);
    return Promise.resolve(res);
  } catch (err) {
    console.log(err);
    return Promise.reject("Query error");
  }
};
export const service_update = async (_id: any, body: any) => {
  try {
    const res_find = await media_model.updateOne(
      { _id },
      { $set: { ...body } }
    );
    return Promise.resolve(res_find);
  } catch (err) {
    console.log(err);
    return Promise.reject("Query error");
  }
};
export const service_remove = async (id: any) => {
  try {
    const res_find = await media_model.findOneAndDelete({ _id: id });
    return Promise.resolve(res_find);
  } catch (err) {
    console.log(err);
    return Promise.reject("Query error");
  }
};
