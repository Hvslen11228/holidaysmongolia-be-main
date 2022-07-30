const { create, show_table } = require("./service");
const mysql = require("../../../functions/mysql");
const shortid = require("shortid");
const date = require("date-and-time");

module.exports = {
  all: async (req, res) => {
    const id = req.params.id;

    const response = mysql.QUERY("SELECT *  FROM icons ", []);
    if (!response.success) {
      return res.status(200).json({
        success: false,
        message: "Query error",
      });
    }
    return res.status(200).json({
      success: true,
      data: response.data,
    });
  },
  one: async (req, res) => {
    const id = req.params.id;
    const response_0 = await mysql.SELECT_WHERE("tour_id", id, "tour_icon");
    if (response_0.data.length == 0) {
      await mysql.INSERT({ tour_id: id, icons: "" }, "tour_icon");
    }
    const response_1 = mysql.QUERY("SELECT *  FROM tour_icon where tour_id=?", [
      id,
    ]);
    if (!response_1.success) {
      return res.status(200).json({
        success: false,
        message: "Query error",
      });
    }
    const response = mysql.QUERY(
      "SELECT *  FROM icons where id in (" + response_1.data[0].icons + ")",
      []
    );
    if (!response.success) {
      return res.status(200).json({
        success: false,
        message: "Query error",
      });
    }
    return res.status(200).json({
      success: true,
      data: response.data,
    });
  },
  update: async (req, res) => {
    const id = req.params.id;
    const response_0 = await mysql.SELECT_WHERE("tour_id", id, "tour_icon");
    if (response_0.data.length == 0) {
      await mysql.INSERT({ tour_id: id, icons: "" }, "tour_icon");
    }
    const body = req.body;
    let inserts = {
      icons: body.ids.toString(),
    };
    const response = await mysql.UPDATE(inserts, "tour_id", id, "tour_icon");
    if (!response.success) {
      return res.status(200).json({
        success: false,
        message: "Query error",
      });
    }
    return res.status(200).json({
      success: true,
      data: id,
    });
  },
};
