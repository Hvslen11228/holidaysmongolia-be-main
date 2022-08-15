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
        id: "62f9ef73cbe2f0e82ab78615",
        _id: "62f9ef73cbe2f0e82ab78615",
        firstName: "Admin",
        lastName: "Admin",
        displayName: "Admin",
        email: "admin@admin.mn",
        gender: "men",
        avatar: "/uploads/holidays/image/png/62f9ef566818fb894eb44e61.png",
        bgImage: "/uploads/holidays/image/jpeg/62f9bd396e9f2bfb9d27a30d.jpg",
        count: 40,
        href: "",
        desc: "I am admin",
        jobName: "Admin",
        password: "1",
        createdAt: "2022-08-15T07:02:11.674Z",
        updatedAt: "2022-08-15T07:02:11.674Z",
        __v: 0,
      };
      el._doc.categories = [
        {
          id: 3,
          name: "Blog and news",
          href: "/",
          thumbnail:
            "/uploads/holidays/image/jpeg/62f9e08f111f997c84a54aef.jpg",
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
    const results = await service_find_one({ _id: id });
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
