import { Request, Response } from "express";
import {
  create_service,
  find_service,
  update_service,
  find_service_auhtor,
} from "./service";
import jwt, { sign } from "jsonwebtoken";
import sendMail from "../../functions/mail/nodemail";
import * as bcrypt from "bcrypt";
export const create = async (req: Request, res: Response) => {
  const body = req.body;
  const salt = bcrypt.genSaltSync(10);
  body.password = bcrypt.hashSync(body.password, salt);
  body.user_id = Math.floor(Math.random() * 10000000) + 100000;
  let results: any = null;
  try {
    results = await create_service(body);
  } catch (error) {
    return res.status(200).json({
      success: false,
      message: error,
    });
  }
  results.password = undefined;
  const jsontoken = sign({ result: results }, process.env.JWT_KEY, {
    expiresIn: process.env.JWT_EXPIRESIN,
  });
  const cookieOptions = {
    expires: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
  };
  return res.status(200).cookie("token", jsontoken, cookieOptions).json({
    success: true,
    message: "Бүртгэл үүссэн нэвтэрлээ.",
    token: jsontoken,
    data: results,
  });
};
export const login = async (req: Request, res: Response) => {
  const body = req.body;
  if (!body.email || body.email == null) {
    return res.status(200).json({
      success: false,
      message: "Цахим хаяг хоосон",
    });
  }
  if (!body.password || body.password == null) {
    return res.status(200).json({
      success: false,
      message: "Нууц үг хоосон",
    });
  }
  let results: any = null;
  try {
    results = await find_service(body.email);
  } catch (error) {
    return res.status(200).json({
      success: false,
      message: error,
    });
  }
  const result = await bcrypt.compareSync(body.password, results.password);
  if (result) {
    results.password = undefined;
    const jsontoken = sign({ result: results }, process.env.JWT_KEY, {
      expiresIn: process.env.JWT_EXPIRESIN,
    });
    const cookieOptions = {
      expires: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
    };
    return res.status(200).cookie("token", jsontoken, cookieOptions).json({
      success: true,
      message: "Нэвтэрлээ",
      token: jsontoken,
      data: results,
    });
  } else {
    return res.status(200).json({
      success: false,
      message: "Нууц үг таарсангүй ",
    });
  }
};
export const login_author = async (req: Request, res: Response) => {
  const body = req.body;
  if (!body.email || body.email == null) {
    return res.status(200).json({
      success: false,
      message: "Цахим хаяг хоосон",
    });
  }
  if (!body.password || body.password == null) {
    return res.status(200).json({
      success: false,
      message: "Нууц үг хоосон",
    });
  }
  let results: any = null;
  try {
    results = await find_service_auhtor(body.email);
  } catch (error) {
    return res.status(200).json({
      success: false,
      message: error,
    });
  }
  const result = body.password == results.password ? true : false;
  if (result) {
    results.password = undefined;
    const jsontoken = sign({ result: results }, process.env.JWT_KEY, {
      expiresIn: process.env.JWT_EXPIRESIN,
    });
    const cookieOptions = {
      expires: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
    };
    return res.status(200).cookie("token", jsontoken, cookieOptions).json({
      success: true,
      message: "Нэвтэрлээ",
      token: jsontoken,
      data: results,
    });
  } else {
    return res.status(200).json({
      success: false,
      message: "Нууц үг таарсангүй ",
    });
  }
};
export const forgot_mail = async (req: Request, res: Response) => {
  const body = req.body;
  if (!body.email) {
    return res.status(200).json({
      success: false,
      message: "Цахим хаяг хоосон",
    });
  }
  let results: any = null;
  try {
    results = await find_service(body.email);
  } catch (error) {
    return res.status(200).json({
      success: false,
      message: error,
    });
  }
  const rand = Math.floor(100000 + Math.random() * 900000);
  const user_token = {
    id: results._id,
    email: results.user_email,
    pass: rand,
  };
  const jsontoken = sign(user_token, process.env.JWT_KEY, {
    expiresIn: process.env.JWT_EXPIRESIN,
  });
  const role = "Хэрэглэгч";
  sendMail("validation", "Систем", role, body.email, "Нийц үг сэргээх", {
    code: rand,
    results,
  })
    .then(() => {
      return res.status(200).json({
        success: true,
        message: "Баталгаажуулах имайл илээглээ",
        token: jsontoken,
      });
    })
    .catch((err: any) => {
      console.log(err);
      return res.status(200).json({
        success: false,
        message: "Алдаа гарлаа",
      });
    });
};
export const forgot_code = async (req: Request, res: Response) => {
  const body = req.body;
  const id = body.forgot_token;
  if (!id) {
    return res.status(400).json({
      success: false,
      message: "Token алга байна",
    });
  }
  const code = req.body?.code;
  const decoded: any = await jwt.verify(id, process.env.JWT_KEY);
  if (decoded?.pass == code) {
    return res.status(200).json({
      success: true,
      message: "Амжилттай",
    });
  } else {
    return res.status(200).json({
      success: false,
      message: "Баталгаажуулах код таарсангүй",
    });
  }
};
export const forgot_password = async (req: Request, res: Response) => {
  const body = req.body;
  const id = body.forgot_token;
  if (!id) {
    return res.status(400).json({
      success: false,
      message: "Token алга байна",
    });
  }
  const code = req.body.code;
  const decoded: any = await jwt.verify(id, process.env.JWT_KEY);
  if (decoded.pass == code) {
    let password = body.password;
    const salt = bcrypt.genSaltSync(10);
    password = bcrypt.hashSync(password, salt);
    try {
      const checke = await update_service(decoded.id, password);
      return res.status(200).json({
        success: true,
        message: "Амжилттай нууц үг солигдлоо",
      });
    } catch (error) {
      return res.status(200).json({
        success: false,
        message: "Query error",
      });
    }
  } else {
    return res.status(200).json({
      success: false,
      message: "Баталгаажуулах код таарсангүй",
    });
  }
};
