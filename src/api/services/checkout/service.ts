import golomtModel from "../../../models/golomt";
import tour_model from "../../../models/orders";
import xanaduorders from "../../../models/xanaduorders";
import { Types } from "mongoose";
import axiosRequest from "../../../functions/axios";
import sendMail from "../../../functions/mail/nodemail";
import { service_find_one_xanadu } from "../orders/service";
export const service_one = async (body: any) => {
  try {
    console.log(body);
    const queryRes = await golomtModel.findOne(body);
    return Promise.resolve(queryRes);
  } catch (err) {
    return Promise.reject("Query error");
  }
};
export const service_create = async (body: any) => {
  try {
    const queryRes = await golomtModel.create(body);
    return Promise.resolve(queryRes);
  } catch (err) {
    console.log(err);
    return Promise.reject("Query error");
  }
};
export const service_remove = async (find: any) => {
  try {
    const queryRes = await golomtModel.findOneAndDelete(find);
    // const queryRes = await golomtModel.updateOne(find, {
    //   $set: { delFlg: true },
    // });
    return Promise.resolve(queryRes);
  } catch (err) {
    return Promise.reject("Query error");
  }
};
export const service_update = async (find: any, body: any) => {
  try {
    await golomtModel.updateOne({ ...find }, { $set: { ...body } });
    const queryRes = await golomtModel.findOne(find);
    return Promise.resolve(queryRes);
  } catch (err) {
    return Promise.reject("Query error");
  }
};
export const service_order_callback = async (id: any, data: any) => {
  try {
    await tour_model.updateOne(
      { _id: id },
      { $set: { type: true, pay_type: "paid" } }
    );
    const queryRes = await golomtModel.findOne({ _id: id });
    return Promise.resolve(queryRes);
  } catch (err) {
    return Promise.reject("Query error");
  }
};
export const service_xanadu_order_callback = async (id: any, data: any) => {
  try {
    console.log(id);
    await xanaduorders.updateOne(
      { _id: id },
      { $set: { type: true, pay_type: "paid" } }
    );
    const order = await service_find_one_xanadu({ _id: data.wallet_id });
    await sendMail(
      "notf",
      "Систем",
      "Xanadu festival",
      order[0].user.user_email,
      "You’re booked! Pack your bags – see you on [Jun 10 2023]",
      `
      <pHi  ${order[0].user.first_name},></pHi>
      <p>It’s confirmed, we’ll see you on [Jun 10 2023]! Thank you for booking Xanadu festival with us on Ulaanbaatar, Mongolia. You’ll find details of your reservation and payment details enclosed below.
      <br>
      If you need to get in touch, you can email or phone us directly. We look forward to welcoming you soon!
      </p>
      <p>inbound@genco-tour.mn, phone number +97690711900 </p>
     `
    );
    const queryRes = await xanaduorders.findOne({ _id: id });
    return Promise.resolve(queryRes);
  } catch (err) {
    return Promise.reject("Query error");
  }
};
export const monxansh = async () => {
  try {
    const result = await axiosRequest("monxansh", false, {
      method: "GET",
      url: encodeURI("https://monxansh.appspot.com/xansh.json?currency=USD"),
      headers: {
        "Content-Type": "application/json",
      },
    });

    return Promise.resolve(result[0].rate_float);
  } catch (error) {
    return Promise.reject(error);
  }
};
