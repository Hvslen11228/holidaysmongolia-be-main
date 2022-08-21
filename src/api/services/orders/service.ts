import tour_model from "../../../models/orders";
import { Types } from "mongoose";
const { ObjectId } = Types;
const where = [
  {
    $lookup: {
      from: "users",
      localField: "user_id",
      foreignField: "_id",
      as: "user",
    },
  },
  {
    $lookup: {
      from: "tours",
      localField: "tour_id",
      foreignField: "_id",
      as: "tour",
    },
  },
  {
    $project: {
      user_id: 1,
      amount: 1,
      travelers: 1,
      type: 1,
      income_amount: 1,
      tour_id: 1,
      pay_type: 1,
      date: 1,
      user: { $arrayElemAt: ["$user", 0] },
      tour: { $arrayElemAt: ["$tour", 0] },
    },
  },
];
export const service_find = async (body: any, sort: any) => {
  try {
    const res_find = await tour_model.aggregate([...where]);

    return Promise.resolve(res_find);
  } catch (err) {
    console.log(err);
    return Promise.reject("Query error");
  }
};
export const service_find_one = async (body: any) => {
  try {
    const res_find = await tour_model.aggregate([
      {
        $match: body,
      },
      ...where,
    ]);
    return Promise.resolve(res_find);
  } catch (err) {
    console.log(err);
    return Promise.reject("Query error");
  }
};
export const service_create = async (body: any) => {
  try {
    const res = await tour_model.create(body);
    return Promise.resolve(res);
  } catch (err) {
    console.log(err);
    return Promise.reject("Query error");
  }
};
export const service_update = async (_id: any, body: any) => {
  try {
    const res_find = await tour_model.updateOne({ _id }, { $set: { ...body } });
    return Promise.resolve(res_find);
  } catch (err) {
    console.log(err);
    return Promise.reject("Query error");
  }
};
export const service_remove = async (id: any) => {
  try {
    const res_find = await tour_model.findOneAndDelete({ _id: id });
    return Promise.resolve(res_find);
  } catch (err) {
    console.log(err);
    return Promise.reject("Query error");
  }
};
