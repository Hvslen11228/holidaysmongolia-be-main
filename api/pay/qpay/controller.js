const mysql = require("../../../functions/mysql");
const date = require("date-and-time");
const uniqid = require("uniqid");
const QPAY = require("../../../functions/qpay");
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
      pay_type: "qpay",
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
async function page_change(data) {
  await mysql.UPDATE(
    {
      active: "true",
      page_type: "true",
    },
    "page_id",
    data.pay_order,
    "pages"
  );
}
async function ebarimt(data, pay) {
  let org = "CITIZEN";
  if (data.if_llc) {
    org = "ORGANIZATION";
  }
  const code = await QPAY.EBARIMT({
    id: pay.rows[0].payment_id,
    type: org,
  });
  let role = "Хэрэглэгч";
  await sendMail(
    "ebarimt",
    "Систем",
    role,
    data.email,
    "Forms.mn E-BARIMT",
    code.data
  );
}
module.exports = {
  create_simple: async (req, res) => {
    const id = req.params.id;
    let org = req.body.org;
    if (!org || org == 0 || org == null) {
      org = null;
    }
    const checke = await mysql.SELECT_WHERE("order_id", id, "orders");
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
    const order = checke.data[0];
    const rand_id = uniqid("pay_");
    const data = {
      id: rand_id,
      user_id: order.user_id,
      text: "Аялалын төлбөр",
      amount: parseInt(order.income_amount),
      user: {
        id: order.user_id,
        name: order.user_id,
        email: order.user_id,
        phone: "",
      },
    };
    const qpay = await QPAY.CREATE_SIMPLE(data);
    if (qpay.success) {
      const inserts = {
        pay_id: data.id,
        pay_date: null,
        cr_date: date.format(new Date(), "YYYY/MM/DD HH:mm:ss"),
        user_id: order.user_id,
        amount: data.amount,
        invoice_id: qpay.data.invoice_id,
        type: 0,
        pay_order: order.order_id,
        pay_order_type: "user_pay",
        sub_id: order.order_id,
      };
      const response = mysql.INSERT(inserts, "qpay_bill");
      if (!response.success) {
        return res.status(200).json({
          success: false,
          message: "Query error",
        });
      }
      return res.status(200).json({
        success: true,
        message: "Qpay үүслээ",
        bill_id: rand_id,
        data: qpay.data,
      });
    } else {
      return res.status(200).json({
        success: false,
        message: "Qpay үүсгэхэд алдаа гарлаа",
      });
    }
  },
  checke: async (req, res) => {
    const id = req.params.id;
    const checke = await mysql.SELECT_WHERE("pay_id", id, "qpay_bill");
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
    console.log(bill);
    if (bill.type != 0) {
      return res.status(200).json({
        success: true,
        message: "Төлөгдсөн байна",
      });
    }
    const qpay = await QPAY.CHECK(bill.invoice_id);
    if (qpay.success) {
      if (qpay.paymented) {
        const checke = await mysql.UPDATE(
          { type: 1, pay_date: date.format(new Date(), "YYYY/MM/DD HH:mm:ss") },
          "pay_id",
          id,
          "qpay_bill"
        );
        await mysql.UPDATE(
          { type: "true" },
          "order_id",
          bill.pay_order,
          "orders"
        );
        if (!checke.success) {
          return res.status(200).json({
            success: false,
            message: "Query error",
          });
        }
        // if (bill.pay_order_type == "page_pay") {
        //   await page_change(bill);
        // } else if (bill.pay_order_type == "user_pay") {
        //   await subscription_add(bill);
        // }
        // await ebarimt(bill, qpay.data);
        return res.status(200).json({
          success: true,
          message: "Төлөгдсөн",
        });
      } else {
        return res.status(200).json({
          success: false,
          message: "Төбөр хүлээгдэж байна",
        });
      }
    } else {
      return res.status(200).json({
        success: false,
        message: "Алдаа",
      });
    }
  },
};
