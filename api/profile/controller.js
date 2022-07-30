const mysql = require("../../functions/mysql");
const shortid = require("shortid");
const date = require("date-and-time");
module.exports = {
  getUser: (req, res) => {
    const user_id = req.decoded.result.user_id;
    const response = mysql.QUERY(
      `SELECT * FROM users  where user_id=? `,
      user_id
    );
    if (!response.success) {
      res.status(200).json({
        success: false,
        message: "Query error",
      });
    }
    response.data[0].password = undefined;
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
