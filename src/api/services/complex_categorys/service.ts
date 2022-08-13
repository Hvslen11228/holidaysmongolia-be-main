import complex_category_model from "../../../models/complex_cat";
import { Types } from "mongoose";
const { ObjectId } = Types;
const where = [
  {
    $lookup: {
      from: "tours",
      localField: "_id",
      foreignField: "listingCategoryId",
      as: "items",
      pipeline: [
        {
          $project: {
            _id: 1,
            id: "$_id",
            href: "$href",
            name: "$title",
          },
        },
      ],
    },
  },
  {
    $project: {
      _id: 1,
      id: "$_id",
      image: "$thumbnail",
      title: "$name",
      items: 1,
    },
  },
];
export const service_find_where = async (body: any, sort: any) => {
  try {
    const res_find = await complex_category_model.aggregate([...where]);
    // const res = await complex_category_model.find(body).sort(sort);
    return Promise.resolve(res_find);
  } catch (err) {
    console.log(err);
    return Promise.reject("Query error");
  }
};
export const service_find = async (body: any, sort: any) => {
  try {
    const res = await complex_category_model.find(body).sort(sort);
    return Promise.resolve(res);
  } catch (err) {
    console.log(err);
    return Promise.reject("Query error");
  }
};
export const service_find_one = async (body: any) => {
  try {
    const res = await complex_category_model.findOne(body);
    return Promise.resolve(res);
  } catch (err) {
    console.log(err);
    return Promise.reject("Query error");
  }
};
export const service_create = async (body: any) => {
  try {
    const res = await complex_category_model.create(body);
    return Promise.resolve(res);
  } catch (err) {
    console.log(err);
    return Promise.reject("Query error");
  }
};
export const service_update = async (_id: any, body: any) => {
  try {
    const res_find = await complex_category_model.updateOne(
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
    const res_find = await complex_category_model.findOneAndDelete({ _id: id });
    return Promise.resolve(res_find);
  } catch (err) {
    console.log(err);
    return Promise.reject("Query error");
  }
};
