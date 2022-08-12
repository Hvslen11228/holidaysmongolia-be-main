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
        id: 3,
        firstName: "Nathanil",
        lastName: "Foulcher",
        displayName: "Foulcher Nathanil",
        email: "nfoulcher2@google.com.br",
        gender: "Bigender",
        avatar: "/static/media/Image-3.f257bc3c2ce5ae3a57db.png",
        count: 43,
        href: "/author",
        desc: "There’s no stopping the tech giant. Apple now opens its 100th store in China.There’s no stopping the tech giant.",
        jobName: "Author Job",
        bgImage:
          "https://images.pexels.com/photos/1001990/pexels-photo-1001990.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
      };
      el._doc.categories = [
        {
          id: 3,
          name: "Industrial",
          href: "/",
          thumbnail:
            "https://images.pexels.com/photos/1858406/pexels-photo-1858406.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
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
    const results = await service_update(id, { auto_pay: body.auto_pay });
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
