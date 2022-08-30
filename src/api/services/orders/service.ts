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
const where_complex = [
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
      from: "complexes",
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
    const res_find: any = await tour_model.aggregate([...where]);
    for (let index = 0; index < res_find.length; index++) {
      const element = res_find[index];
      if (!element.tour) {
        const res_find2 = await tour_model.aggregate([
          {
            $match: {
              _id: new Types.ObjectId(element._id),
            },
          },
          ...where_complex,
        ]);
        res_find[index] = res_find2[0];
      }
    }
    return Promise.resolve(res_find);
  } catch (err) {
    return Promise.reject("Query error");
  }
};
export const service_find_body = async (body: any, sort: any) => {
  try {
    const res_find: any = await tour_model.aggregate([
      {
        $match: body,
      },
      ...where,
    ]);
    for (let index = 0; index < res_find.length; index++) {
      const element = res_find[index];
      if (!element.tour) {
        const res_find2 = await tour_model.aggregate([
          {
            $match: {
              _id: new Types.ObjectId(element._id),
            },
          },
          ...where_complex,
        ]);
        res_find[index] = res_find2[0];
      }
    }
    return Promise.resolve(res_find);
  } catch (err) {
    return Promise.reject("Query error");
  }
};
export const service_find_one = async (body: any) => {
  try {
    const res_find: any = await tour_model.aggregate([
      {
        $match: body,
      },
      ...where,
    ]);
    if (!res_find[0].tour) {
      const res_find2 = await tour_model.aggregate([
        {
          $match: body,
        },
        ...where_complex,
      ]);
      return Promise.resolve(res_find2);
    } else {
      return Promise.resolve(res_find);
    }
  } catch (err) {
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
