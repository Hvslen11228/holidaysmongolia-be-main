const paginate = require("./paginate.js");
const mysql = require("mysql");
module.exports = async function (data) {
  data.page = parseInt(data.page) || 1;
  data.limit = parseInt(data.limit) || 999;
  if (data.select) {
    if (data.select.replace(/\s/g, "") == "") {
      data.select = "*";
    } else {
      data.select = data.select.split(" ");
      let sets = "";
      for (var property in data.select) {
        if (sets != "") {
          sets = sets.concat(`,`);
        }
        sets = sets.concat(`?`);
      }
      data.select = mysql.format(`${sets}`, data.select);
    }
  } else {
    data.select = "*";
  }
  if (data.sort) {
    if (data.sort.charAt(0) === "-") {
      data.sort = [data.sort.substring(1), "DESC"];
    } else {
      data.sort = [data.sort, "ASC"];
    }
  }
  if (data.where) {
    let sets = "WHERE ";
    for (var property in data.where) {
      if (sets != "WHERE ") {
        sets = sets.concat(` AND `);
      }
      sets = sets.concat(`??.\`${property}\`='${data.where[property]}'`);
    }
    data.where = sets;
  } else {
    data.where = "";
  }
  const pagination = await paginate(data.page, data.limit, data.count);
  let query = { offset: pagination.start - 1, limit: data.limit };
  if (data.sort) {
    data.sort = mysql.format(
      `ORDER BY ??.\`${[data.sort[0]]}\` ${data.sort[1]}`,
      []
    );
  } else {
    data.sort = "";
  }
  if (query) {
    query = `LIMIT ${query["offset"]},${query["limit"]}`;
  } else {
    query = "";
  }
  let sql = `SELECT ${data.select} FROM %% ${data.where} ${data.sort} ${query} `;
  return { query: sql, pagination };
};
