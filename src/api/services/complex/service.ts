import complex_model from "../../../models/complex";
import { Types } from "mongoose";
const { ObjectId } = Types;
const where = [
  {
    $lookup: {
      from: "authors",
      localField: "authorId",
      foreignField: "_id",
      as: "author",
    },
  },
  {
    $lookup: {
      from: "complex_categorys",
      localField: "listingCategoryId",
      foreignField: "_id",
      as: "listingCategory",
    },
  },
  {
    $project: {
      authorId: 1,
      date: 1,
      href: 1,
      listingCategoryId: 1,
      title: 1,
      featuredImage: 1,
      galleryImgs: 1,
      commentCount: 1,
      viewCount: 1,
      like: 1,
      address: 1,
      reviewStart: 1,
      reviewCount: 1,
      price: 1,
      maxGuests: 1,
      saleOff: 1,
      isAds: 1,
      map: 1,
      about: 1,
      author: { $arrayElemAt: ["$author", 0] },
      listingCategory: { $arrayElemAt: ["$listingCategory", 0] },
    },
  },
];
const where_ = [
  {
    $project: {
      _id: 1,
      id: "$_id",
      name: "$title",
      href: 1,
    },
  },
];
export const service_find_where = async (body: any, sort: any) => {
  try {
    const res_find = await complex_model.aggregate([...where_]);

    const res = await complex_model.find(body).sort(sort);
    return Promise.resolve(res_find);
  } catch (err) {
    console.log(err);
    return Promise.reject("Query error");
  }
};
export const service_find = async (body: any, sort: any) => {
  try {
    const res_find = await complex_model.aggregate([...where]);

    const res = await complex_model.find(body).sort(sort);
    return Promise.resolve(res_find);
  } catch (err) {
    console.log(err);
    return Promise.reject("Query error");
  }
};
export const service_find_one = async (body: any) => {
  try {
    const res_find = await complex_model.aggregate([
      {
        $match: body,
      },
      ...where,
    ]);
    const res = await complex_model.findOne(body);

    return Promise.resolve(res_find);
  } catch (err) {
    console.log(err);
    return Promise.reject("Query error");
  }
};
export const service_create = async (body: any) => {
  try {
    const res = await complex_model.create(body);
    return Promise.resolve(res);
  } catch (err) {
    console.log(err);
    return Promise.reject("Query error");
  }
};
export const service_update = async (_id: any, body: any) => {
  try {
    const res_find = await complex_model.updateOne(
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
    const res_find = await complex_model.findOneAndDelete({ _id: id });
    return Promise.resolve(res_find);
  } catch (err) {
    console.log(err);
    return Promise.reject("Query error");
  }
};
