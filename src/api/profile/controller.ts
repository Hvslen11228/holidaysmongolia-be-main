import { Request, Response } from "express";
import { one, Update, remove } from "./service";

export const getone = async (req: any, res: Response) => {
  const id = req._id;
  try {
    const results = await one(id, {});
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
  const body = req.body;
  const id = req._id;
  try {
    const results = await Update(id, body);
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
export const remove_ = async (req: any, res: Response) => {
  const id = req._id;
  try {
    const results = await remove(id);
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
