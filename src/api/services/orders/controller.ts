import { Request, Response } from "express";
import {
  service_find,
  service_find_body,
  service_find_one,
  service_create,
  service_remove,
  service_update,
  service_create_xanadu,
  service_find_one_xanadu,
  service_find_body_xanadu,
} from "./service";
import { Types } from "mongoose";
import bodyParser from "body-parser";

export const getall = async (req: any, res: Response) => {
  const { _id } = req;
  try {
    const results = await service_find_body(
      {
        type: true,
      },
      {}
    );
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
export const getall_xanadu = async (req: any, res: Response) => {
  const { _id } = req;
  try {
    const results = await service_find_body_xanadu(
      {
        type: true,
      },
      {}
    );
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
export const getall_my = async (req: any, res: Response) => {
  const { _id } = req;
  try {
    console.log({
      user_id: new Types.ObjectId(_id),
    });
    const results = await service_find_body(
      {
        user_id: new Types.ObjectId(_id),
      },
      {}
    );
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
export const one = async (req: any, res: Response) => {
  const { id } = req.params;
  try {
    const results = await service_find_one({ _id: new Types.ObjectId(id) });
    return res.status(200).json({
      success: true,
      message: "Амжилттай",
      data: results[0],
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
export const createXanadu = async (req: any, res: Response) => {
  const { _id } = req;
  const { body } = req;
  try {
    const results = await service_create_xanadu(body);
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
export const onexanadu = async (req: any, res: Response) => {
  const { id } = req.params;
  try {
    const results = await service_find_one_xanadu({
      _id: new Types.ObjectId(id),
    });
    return res.status(200).json({
      success: true,
      message: "Амжилттай",
      data: results[0],
    });
  } catch (error) {
    return res.status(200).json({
      success: false,
      message: error,
    });
  }
};
