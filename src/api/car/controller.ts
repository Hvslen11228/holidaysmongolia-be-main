import { Request, Response } from "express";
import {
  service_all,
  service_create,
  service_ckecker,
  service_remove,
  service_update,
} from "./service";
import { Types } from "mongoose";
import bodyParser from "body-parser";

export const getall = async (req: any, res: Response) => {
  const { _id } = req;
  try {
    const results = await service_all(_id, {});
    const unsave = await results.filter(
      ({ car_save }: any) => car_save == false
    );
    return res.status(200).json({
      success: true,
      message: "Амжилттай",
      data: {
        postsave: await results.filter(({ car_save }: any) => car_save == true),
        unsave: await unsave.filter(
          ({ save_type }: any) => save_type == "unsave"
        ),
        save: await unsave.filter(({ save_type }: any) => save_type == "save"),
      },
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
    const data = {
      car_number: body.number,
      car_string: body.string,
      save_type: body.car_save ? "postsave" : "unsave",
      user_id: _id,
      auto_pay: false,
      car_save: body.car_save,
    };
    const checker = await service_ckecker(data);
    if (checker.success || !body.car_save) {
      const results = await service_create(data);
      return res.status(200).json({
        success: true,
        message: "Амжилттай",
        data: results,
      });
    } else {
      return res.status(200).json(checker);
    }
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
    const results = await service_remove({ user_id: _id, _id: id });
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
