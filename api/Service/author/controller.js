const mysql = require("../../../functions/mysql");
const shortid = require("shortid");
const date = require("date-and-time");
module.exports = {
  all_: async (req, res) => {
    lang = req.get("Accept-Language");
    let response = null;
    if (lang == "en") {
      response = mysql.QUERY("SELECT *  FROM authors ", []);
    } else {
      response = mysql.QUERY("SELECT *  FROM authors ", []);
    }
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
  one_: async (req, res) => {
    const id = req.params.id;
    lang = req.get("Accept-Language");
    let response = null;
    if (lang == "en") {
      response = mysql.QUERY("SELECT *  FROM authors where id =?", [id]);
    } else {
      response = mysql.QUERY("SELECT *  FROM authors where id =?", [id]);
    }
    if (!response.success) {
      return res.status(200).json({
        success: false,
        message: "Query error",
      });
    }
    return res.status(200).json({
      success: true,
      data: response.data[0],
    });
  },
  add_: async (req, res) => {
    const body = req.body;
    const id = shortid.generate();
    let inserts = {
      ...{
        id,
        href: `../author/${id}`,
      },
      ...body,
    };
    const response = await mysql.INSERT(inserts, "authors");
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
  update_: async (req, res) => {
    const body = req.body;
    const id = req.params.id;
    let inserts = {
      ...body,
    };
    const response = await mysql.UPDATE(inserts, "id", id, "authors");
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
  delete_: async (req, res) => {
    const id = req.params.id;
    const response = mysql.DELETE("id", id, "authors");
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
};
