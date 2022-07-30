const mysql = require("../../functions/mysql");
const shortid = require("shortid");
const date = require("date-and-time");
module.exports = {
  add: (req, res) => {
    const id = req.params.id;
    const user_id = req.decoded.result.user_id;
    const body = req.body;
    const data = {
      user_id,
      created_date: date.format(new Date(), "YYYY/MM/DD HH:mm:ss"),
      amount: body.amount,
      travelers: body.traveler.toString(),
      _date: body.date,
      income_amount: body.income_amount,
      tour_id: id,
    };
    const response = mysql.INSERT(data, "orders");
    if (!response.success) {
      return res.status(200).json({
        success: false,
        message: "Query error",
      });
    }
    return res.status(200).json({
      success: true,
      data: response.data.data.rows.insertId,
    });
  },
  show: (req, res) => {
    const id = req.params.id;
    const user_id = req.decoded.result.user_id;
    const response = mysql.QUERY(`SELECT * FROM orders  where order_id=? `, id);
    const response2 = mysql.QUERY(
      `SELECT * FROM tour  where id=? `,
      response.data[0].tour_id
    );
    if (!response.success) {
      res.status(200).json({
        success: false,
        message: "Query error",
      });
    }
    response.data[0].tour = response2.data[0];
    res.status(200).json({
      success: true,
      data: response.data[0],
    });
  },
  show: (req, res) => {
    const id = req.params.id;
    const user_id = req.decoded.result.user_id;
    const response = mysql.QUERY(`SELECT * FROM orders  where order_id=? `, id);
    const response2 = mysql.QUERY(
      `SELECT * FROM tour  where id=? `,
      response.data[0].tour_id
    );
    if (!response.success) {
      res.status(200).json({
        success: false,
        message: "Query error",
      });
    }
    response.data[0].tour = response2.data[0];
    res.status(200).json({
      success: true,
      data: response.data[0],
    });
  },
  updateUser: (req, res) => {
    const user_id = req.decoded.result.user_id;
    const body = req.body;
    const response = mysql.UPDATE(body, "user_id", user_id, "users");
    if (!response.success) {
      res.status(200).json({
        success: false,
        message: "Query error",
      });
    }
    res.status(200).json({
      success: true,
      data: response.data,
    });
  },
};
