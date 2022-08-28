import { Request, Response } from "express";
import {
  service_find,
  service_find_one,
  service_create,
  service_remove,
  service_update,
} from "./service";
import { Types } from "mongoose";
import bodyParser from "body-parser";

export const getall = async (req: any, res: Response) => {
  const { _id } = req;
  try {
    const results: any = await service_find(_id, {});
    const data: any = [];
    await results.forEach((el: any, index: any) => {
      el._doc.index = index + 1;
      el._doc.author = {
        _id: "6301c41c518a99d43c578593",
        firstName: "Admin",
        lastName: "Admin",
        displayName: "Admin",
        email: "admin@admin.mn",
        gender: "men",
        avatar: "/uploads/holidays/image/png/6301c3be16519840a7da4d2f.png",
        bgImage: "/uploads/holidays/image/jpeg/6301c3c7a025846fe4e8c114.jpg",
        count: 40,
        href: "/author",
        desc: "Site superAdmin",
        jobName: "Admin",
        type: "admin",
        password: "1",
        createdAt: "2022-08-21T05:35:24.518Z",
        updatedAt: "2022-08-21T05:35:24.518Z",
        __v: 0,
      };
      el._doc.categories = [
        {
          id: 3,
          name: "Blog and news",
          href: "/",
          thumbnail:
            "/uploads/holidays/image/jpeg/630ae4d38dbce38de00b1450.jpg",
          count: 15,
          color: "yellow",
          taxonomy: "category",
        },
      ];
      data.push(el);
    });
    return res.status(200).json({
      success: true,
      message: "Амжилттай",
      data: data,
    });
  } catch (error) {
    return res.status(200).json({
      success: false,
      message: error,
    });
  }
};
export const one = async (req: any, res: Response) => {
  const { id } = req.params;
  try {
    const results: any = await service_find_one({ _id: id });
    results._doc.author = {
      _id: "6301c41c518a99d43c578593",
      firstName: "Admin",
      lastName: "Admin",
      displayName: "Admin",
      email: "admin@admin.mn",
      gender: "men",
      avatar: "/uploads/holidays/image/png/6301c3be16519840a7da4d2f.png",
      bgImage: "/uploads/holidays/image/jpeg/6301c3c7a025846fe4e8c114.jpg",
      count: 40,
      href: "/author",
      desc: "Site superAdmin",
      jobName: "Admin",
      type: "admin",
      password: "1",
      createdAt: "2022-08-21T05:35:24.518Z",
      updatedAt: "2022-08-21T05:35:24.518Z",
      __v: 0,
    };
    results._doc.categories = [
      {
        id: 3,
        name: "Blog and news",
        href: "/",
        thumbnail: "/uploads/holidays/image/jpeg/630ae4d38dbce38de00b1450.jpg",
        count: 15,
        color: "yellow",
        taxonomy: "category",
      },
    ];
    return res.status(200).json({
      success: true,
      message: "Амжилттай",
      data: results,
    });
  } catch (error) {
    return res.status(200).json({
      success: false,
      message: error,
    });
  }
};
export const create = async (req: any, res: Response) => {
  const { _id } = req;
  const { body } = req;
  try {
    const results = await service_create(body);
    return res.status(200).json({
      success: true,
      message: "Амжилттай",
      data: results,
    });
  } catch (error) {
    return res.status(200).json({
      success: false,
      message: error,
    });
  }
};
export const remove = async (req: any, res: Response) => {
  const { _id } = req;
  const { id } = req.params;
  try {
    const results = await service_remove(id);
    return res.status(200).json({
      success: true,
      message: "Амжилттай",
      data: results,
    });
  } catch (error) {
    return res.status(200).json({
      success: false,
      message: error,
    });
  }
};
export const update = async (req: any, res: Response) => {
  const { _id } = req;
  const { body } = req;
  const { id } = req.params;
  try {
    const results = await service_update(id, { ...body });
    return res.status(200).json({
      success: true,
      message: "Амжилттай",
      data: results,
    });
  } catch (error) {
    return res.status(200).json({
      success: false,
      message: error,
    });
  }
};
