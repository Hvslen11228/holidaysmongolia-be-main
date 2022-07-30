const mysql = require("../../../functions/mysql");
const date = require("date-and-time");
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
      pay_type: "Bank",
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
  checke = await mysql.INSERT(
    {
      bill_id: data.pay_id,
      user_id: data.user_id,
      pay_amount: 10000,
      pay_date: date.format(new Date(), "YYYY/MM/DD HH:mm:ss"),
      pay_order: data.pay_order,
      pay_order_type: data.pay_order_type,
      pay_type: "Bank",
      title: `Хуудас үүсгэх төлбөр`,
    },
    "pay_log"
  );
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
module.exports = {
  checking_page: async (req, res) => {
    const user_id = req.decoded.result.user_id;
    const id = req.params.id;
    const checke = await mysql.SELECT_WHERE("page_id", id, "pages");
    if (!checke.success) {
      return res.status(200).json({
        success: false,
        message: "Query error",
      });
    }
    if (checke.data.length == 0) {
      return res.status(200).json({
        success: false,
        message: "Ийм хуудас алга",
      });
    }
    const page = checke.data[0];
    const BANK = require("../../../functions/khaanbank");
    const data = await BANK.getTransactionList();
    const filtered = await data.filter(({ description }) =>
      description.toLowerCase().includes(id.toLowerCase())
    );
    if (filtered.length != 0) {
      let count = 0;
      let amount = 0;
      await filtered.forEach(async (el) => {
        amount = amount + el.incomeBalance;
        const checke2 = await mysql.SELECT_WHERE("bill_id", el.id, "pay_log");
        if (!checke2.success) {
          return res.status(200).json({
            success: false,
            message: "Query error",
          });
        }
        if (checke2.data.length == 0) {
          if (amount >= 10000) {
            await page_change({
              pay_id: el.id,
              user_id: user_id,
              pay_order_type: "page_pay",
              pay_order: id,
            });
            return res.status(200).json({
              success: true,
              message: "Төлөгдсөн",
            });
          }
        }
        count++;
      });
      if (filtered.length == count) {
        return res.status(200).json({
          success: false,
          message: "Төлөгдөөгүй",
        });
      }
    } else {
      return res.status(200).json({
        success: false,
        message: "Төлөгдөөгүй",
      });
    }
  },
  checking_user: async (req, res) => {
    const id = req.params.id;
    const checke = await mysql.SELECT_WHERE("user_id", id, "users");
    if (!checke.success) {
      return res.status(200).json({
        success: false,
        message: "Query error",
      });
    }
    if (checke.data.length == 0) {
      return res.status(200).json({
        success: false,
        message: "Ийм хэрэглэгч алга",
      });
    }
    const user = checke.data[0];
    //   const BANK = require("../../../functions/khaanbank");
    //   const data = await BANK.getTransactionList();
    const data = [
      {
        date: "2022-04-07 22:48:00",
        accountNumber: "5064271721",
        transactionType: "Credit",
        expenseBalance: 0,
        incomeBalance: 5500,
        beginBalance: 0,
        endBalance: 5500,
        description: "PsMtx1rid",
        id: "log_1649342880000_5064271721",
      },
    ];
    const filtered = await data.filter(({ description }) =>
      description.toLowerCase().includes(id.toLowerCase())
    );
    if (filtered.length != 0) {
      let count = 0;
      let amount = 0;
      await filtered.forEach(async (el) => {
        amount = amount + el.incomeBalance;
        const checke2 = await mysql.SELECT_WHERE("bill_id", el.id, "pay_log");
        if (!checke2.success) {
          return res.status(200).json({
            success: false,
            message: "Query error",
          });
        }
        if (checke2.data.length == 0) {
          if (amount >= 5500) {
            await subscription_add({
              pay_id: el.id,
              user_id: id,
              pay_order_type: "user_pay",
              pay_order: id,
              sub_id: 2,
            });
            return res.status(200).json({
              success: true,
              message: "Төлөгдсөн",
            });
          }
        }
        count++;
      });
      if (filtered.length == count) {
        return res.status(200).json({
          success: false,
          message: "Төлөгдөөгүй",
        });
      }
    } else {
      return res.status(200).json({
        success: false,
        message: "Төлөгдөөгүй",
      });
    }
  },
};
