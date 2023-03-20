import { Request, Response } from "express";
import {
  service_create,
  service_one,
  service_update,
  service_order_callback,
  service_xanadu_order_callback,
  monxansh,
} from "./service";
import { GolomtPay } from "./../../../functions/payment/index";
import { Types } from "mongoose";
import date from "date-and-time";

export const callback = async (req: Request, res: Response) => {
  console.log(req.params);
  console.log(req.query);
  const { id }: any = req.params;
  if (!id) {
    return res.status(200).json({
      success: false,
      message: "Хандалтын алдаа",
    });
  }
  try {
    const invoice = await service_one({
      _id: id,
    });
    if (invoice.pay) {
      return res.status(200).json({
        success: true,
        message: "Аль хэдийн төлөгдсөн ",
      });
    } else {
      const Golomt = await GolomtPay.checking(invoice.invoice_transaction_id);
      console.log(Golomt);
      const result = await service_update(
        { _id: invoice._id },
        {
          pay: true,
          date: date.format(new Date(), "YYYY/MM/DD HH:mm:ss"),
        }
      );
      if (invoice.order_type == "order") {
        await service_order_callback(invoice.wallet_id, invoice);
      } else {
        await service_xanadu_order_callback(invoice.wallet_id, invoice);
      }
      res.status(200).json({
        success: true,
        message: "Амжилттай",
        data: result,
      });
    }
  } catch (error) {
    return res.status(200).json({
      success: false,
      message: error,
    });
  }
};
export const create = async (req: any, res: Response) => {
  const { order_id, amount, description, callback, order_type } = req.body;
  const monamount = await monxansh();
  // const newamount = parseFloat(amount) * Math.round(monamount);
  const newamount = parseFloat(amount);
  try {
    const insert = {
      _id: new Types.ObjectId(),
      wallet_id: order_id,
      amount: newamount,
      order_type: order_type,
      description: description || `Golomt bank ${order_id}=>${newamount}`,
      invoice_id: "",
      invoice_transaction_id: "",
      callback: callback || null,
      pay: false,
    };
    console.log(insert);
    const results = await GolomtPay.create({
      id: insert._id,
      amount: insert.amount,
    });
    insert.invoice_transaction_id = results.transactionId;
    insert.invoice_id = results.invoice;
    await service_create(insert);
    return res.status(200).json({
      success: true,
      message: "Амжилттай",
      bill_id: insert._id,
      data: {
        url: `${process.env.GOLOMT_BACKEND_URL}/payment/mn/${results.invoice}`,
      },
    });
  } catch (error) {
    return res.status(200).json({
      success: false,
      message: error,
    });
  }
};
export const checker = async (req: Request, res: Response) => {
  const { id }: any = req.params;
  if (!id) {
    return res.status(200).json({
      success: false,
      message: "Хандалтын алдаа",
    });
  }
  try {
    const invoice = await service_one({
      _id: id,
    });
    if (!invoice.pay) {
      return res.status(200).json({
        success: true,
        message: "Аль хэдийн төлөгдсөн ",
      });
    } else {
      const Golomt = await GolomtPay.checking(invoice.invoice_transaction_id);
      const result = await service_update(
        { _id: invoice._id },
        {
          pay: true,
          date: date.format(new Date(), "YYYY/MM/DD HH:mm:ss"),
        }
      );
      if (invoice.order_type == "order") {
        await service_order_callback(invoice.wallet_id, invoice);
      } else {
        await service_xanadu_order_callback(invoice.wallet_id, invoice);
      }
      res.status(200).json({
        success: true,
        message: "Амжилттай",
        data: result,
      });
    }
  } catch (error) {
    return res.status(200).json({
      success: false,
      message: error,
    });
  }
};
export const notification = async (req: Request, res: Response) => {
  const h = {
    bankCode: "159999",
    amount: "202",
    bank: "Голомт банк",
    errorDesc: "",
    checksum:
      "38d0a34b1d9c41f4acf554108ef9b64f5f291c04aa042c82350b7433431e2157",
    errorCode: "000",
    cardHolder: "buyantogtokh",
    transactionId: "640d73a39424ed30f5dd65ef",
    cardNumber: "515023******0125",
    token: "",
  };
  const { body } = req;
  if (body.errorCode != "000") {
    console.log(body);
    return res.status(200).json({
      success: false,
      message: "Амжилттай",
    });
  }
  console.log("success", body);
  try {
    const invoice = await service_one({
      invoice_transaction_id: body.transactionId,
    });
    if (invoice.pay) {
      return res.status(200).json({
        success: true,
        message: "Аль хэдийн төлөгдсөн ",
      });
    } else {
      const Golomt = await GolomtPay.checking(invoice.invoice_transaction_id);
      const result = await service_update(
        { _id: invoice._id },
        {
          pay: true,
          date: date.format(new Date(), "YYYY/MM/DD HH:mm:ss"),
        }
      );
      if (invoice.order_type == "order") {
        await service_order_callback(invoice.wallet_id, invoice);
      } else {
        await service_xanadu_order_callback(invoice.wallet_id, invoice);
      }
      res.status(200).json({
        success: true,
        message: "Амжилттай",
        data: result,
      });
    }
  } catch (error) {
    return res.status(200).json({
      success: false,
      message: error,
    });
  }
};
