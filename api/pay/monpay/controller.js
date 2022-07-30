const mysql = require("../../../functions/mysql");
const date = require("date-and-time");
const uniqid = require("uniqid");
const MONPAY = require("../../../functions/monpay");
const sendMail = require("../../../functions/nodemail");
async function subscription_add(data) {
  let checke = await mysql.SELECT_WHERE(
    "subscription_id",
    data.sub_id,
    "subscription"
  );
  const subscription = checke.data[0];
  checke = await mysql.INSERT(
    {
      bill_id: data.pay_id,
      user_id: data.user_id,
      pay_amount: subscription.subscription_amount,
      pay_date: date.format(new Date(), "YYYY/MM/DD HH:mm:ss"),
      pay_order: data.pay_order,
      pay_order_type: data.pay_order_type,
      pay_type: "monpay",
      title: `${subscription.subscription_name} / ${subscription.subscription_amount}`,
    },
    "pay_log"
  );
  checke = await mysql.SELECT_WHERE("user_id", data.user_id, "users");
  const user = checke.data[0];
  let date_use = await new Date(user.expired_date);
  await date_use.setDate(date_use.getDate() + parseInt(subscription.plus_day));
  let new_date = await date.format(date_use, "YYYY/MM/DD HH:mm:ss");
  await mysql.UPDATE(
    {
      expired_date: new_date,
      user_subscription: data.pay_order,
    },
    "user_id",
    user.user_id,
    "users"
  );
}
module.exports = {
  create: async (req, res) => {
    const id = req.params.id;
    let org = req.body.org;
    if (!org || org == 0 || org == null) {
      org = null;
    }

    if (id == 1) {
      return res.status(200).json({
        success: false,
        message: "FREE !!!",
      });
    }
    const checke = await mysql.SELECT_WHERE(
      "subscription_id",
      id,
      "subscription"
    );
    if (!checke.success) {
      return res.status(200).json({
        success: false,
        message: "Query error",
      });
    }
    if (checke.data.length == 0) {
      return res.status(200).json({
        success: false,
        message: "Бүртгэлгүй ",
      });
    }
    const user_data = req.decoded.result;
    const subscription = checke.data[0];
    const rand_id = uniqid("pay_");
    const data = {
      id: rand_id,
      user_id: user_data.user_id,
      text: subscription.subscription_name,
      amount: parseInt(subscription.subscription_amount),
      displayName: subscription.subscription_name,
      description: subscription.subscription_name,
    };
    const Monpay = await MONPAY.ALL(data);
    if (Monpay.success) {
      const inserts = {
        pay_id: data.id,
        pay_date: null,
        cr_date: date.format(new Date(), "YYYY/MM/DD HH:mm:ss"),
        user_id: user_data.user_id,
        amount: data.amount,
        invoice_id: Monpay.data.deep.id,
        type: 0,
        pay_order: user_data.user_id,
        pay_order_type: "user_pay",
        sub_id: subscription.subscription_id,
        qr_code: Monpay.data.qr.qrcode,
        uuid: Monpay.data.qr.uuid,
      };
      const response = mysql.INSERT(inserts, "monpay_bill");
      if (!response.success) {
        return res.status(200).json({
          success: false,
          message: "Query error",
        });
      }
      return res.status(200).json({
        success: true,
        message: "Амжилттай",
        data: {
          bill_id: data.id,
          deepLinkCode:
            "https://wallet.candy.mn/v2/invoice/" + Monpay.data.deep.id,
          qr_code: Monpay.data.qr.qrcode,
        },
      });
    } else {
      return res.status(200).json({
        success: false,
        message: "Алдаа гарлаа",
      });
    }
  },
  checker: async (req, res) => {
    const id = req.params.id;
    const checke = await mysql.SELECT_WHERE("pay_id", id, "monpay_bill");
    if (!checke.success) {
      return res.status(200).json({
        success: false,
        message: "Query error",
      });
    }
    if (checke.data.length == 0) {
      return res.status(200).json({
        success: false,
        message: "Бүртгэлгүй",
      });
    }
    const bill = checke.data[0];
    if (bill.type != 0) {
      return res.status(200).json({
        success: true,
        message: "Төлөгдсөн байна",
      });
    }
    const QR = await MONPAY.CHECK_QR(bill.invoice_id, bill.uuid);
    const DEEP = await MONPAY.CHECK_DEEP(bill.invoice_id);
    const response = { success: false, qr: {}, deep: {} };
    response.qr = QR;
    response.deep = DEEP;
    if (QR.success) {
      response.success = true;
    }
    if (DEEP.success) {
      response.success = true;
    }
    return res.status(200).json(response);
  },
  callback: async (req, res) => {
    const id = req.params.id;
    const query = req.query;
    const response = {
      success: false,
      uuid: null,
      invoiceId: null,
    };
    if (id == "qr") {
      if (query.status == "SUCCESS") {
        response.success = true;
        response.uuid = query.uuid;
      } else if (query.status == "PAID") {
        response.success = true;
        response.uuid = query.uuid;
      }
    } else if (id == "deep") {
      if (query.status == "SUCCESS") {
        response.success = true;
        response.invoiceId = query.invoiceId;
      } else if (query.status == "PAID") {
        response.success = true;
        response.invoiceId = query.invoiceId;
      }
    }
    if (response.success) {
      let checke = null;
      if (response.uuid) {
        checke = await mysql.SELECT_WHERE("uuid", response.uuid, "monpay_bill");
        if (!checke.success) {
          return res.status(200).json({
            success: false,
            message: "Query error",
          });
        }
        if (checke.data.length == 0) {
          return res.status(200).json({
            success: false,
            message: "Бүртгэлгүй",
          });
        }
        await mysql.UPDATE(
          { type: 1, pay_date: date.format(new Date(), "YYYY/MM/DD HH:mm:ss") },
          "uuid",
          response.uuid,
          "monpay_bill"
        );
      }
      if (response.invoiceId) {
        checke = await mysql.SELECT_WHERE(
          "invoice_id",
          response.invoiceId,
          "monpay_bill"
        );
        if (!checke.success) {
          return res.status(200).json({
            success: false,
            message: "Query error",
          });
        }
        if (checke.data.length == 0) {
          return res.status(200).json({
            success: false,
            message: "Бүртгэлгүй",
          });
        }
        await mysql.UPDATE(
          { type: 1, pay_date: date.format(new Date(), "YYYY/MM/DD HH:mm:ss") },
          "invoice_id",
          response.invoiceId,
          "monpay_bill"
        );
      }
      const bill = checke.data[0];
      await subscription_add(bill);
    }
    return res.status(200).json(response);
  },
};
