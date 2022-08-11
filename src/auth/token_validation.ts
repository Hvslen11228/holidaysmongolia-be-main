import { Request, Response } from "express";
import jwt from "jsonwebtoken";

export const checkToken = async (req: any, res: Response, next: any) => {
  const token_auth = req.get("authorization");
  const token_cookie = req.cookies.token;
  let token = undefined;
  if (token_auth) {
    token = token_auth;
    token = token.slice(7);
  } else if (token_cookie) {
    token = token_cookie;
  } else {
    return res.status(400).json({
      success: true,
      message: "Нэвтрэх шаардлагатай",
    });
  }
  if (token) {
    jwt.verify(token, process.env.JWT_KEY, (err: any, decoded: any) => {
      if (err) {
        return res.status(400).json({
          success: false,
          message: "Нэвтрэх шаардлагатай",
        });
      } else {
        req.decoded = decoded;
        req._id = req.decoded.result._id;
        req.user_id = req.decoded.result.user_id;
        req.role = req.decoded.result.user_role;
        next();
      }
    });
  } else {
    return res.status(400).json({
      success: false,
      message: "Нэвтрэх шаардлагатай",
    });
  }
};
export const userif = async (req: any, res: Response, next: any) => {
  const token_auth = req.get("authorization");
  const token_cookie = req.cookies.token;
  let token = undefined;
  if (token_auth) {
    token = token_auth;
    token = token.slice(7);
  } else if (token_cookie) {
    token = token_cookie;
  } else {
    return res.status(400).json({
      success: true,
      message: "Нэвтрэх шаардлагатай",
    });
  }
  if (token) {
    jwt.verify(token, process.env.JWT_KEY, (err: any, decoded: any) => {
      if (err) {
        next();
      } else {
        req.decoded = decoded;
        req._id = req.decoded.result._id;
        req.user_id = req.decoded.result.user_id;
        req.role = req.decoded.result.user_role;
        next();
      }
    });
  } else {
    next();
  }
};
export const authorize = (...roles: any) => {
  return (req: any, res: Response, next: any) => {
    if (!roles.includes(req.role)) {
      return res.status(400).json({
        success: false,
        message: "Таны эрх энэ үйлдлийг гүйцэтгэхэд хүрэлцэхгүй!",
      });
    }
    next();
  };
};
