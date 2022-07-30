const mysql = require("../../../functions/mysql");
const shortid = require("shortid");
const date = require("date-and-time");
module.exports = {
  page: async (req, res) => {
    let response = await mysql.QUERY("SELECT * FROM cat_tour", []);
    const data = [];
    await response.data.forEach(async (el) => {
      data.push(el.title);
    });
    res.status(200).json(data);
  },
};
