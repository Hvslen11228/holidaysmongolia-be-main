const mysql = require("../../../functions/mysql");
const shortid = require("shortid");
const date = require("date-and-time");
module.exports = {
  all_: async (req, res) => {
    lang = req.get("Accept-Language");
    let response = null;
    if (lang == "en") {
      response = mysql.QUERY(
        "SELECT id,href,title_en as 'name', title_en as 'name_en',image as 'thumbnail',	FLOOR(RAND()*(30-20+1))+20 AS 'count' ,'category' as'taxonomy'  FROM cat_tour ",
        []
      );
    } else {
      response = mysql.QUERY(
        "SELECT id,href,title as 'name', title_en as 'name_en',image as 'thumbnail',	FLOOR(RAND()*(30-20+1))+20 AS 'count' ,'category' as'taxonomy'  FROM cat_tour ",
        []
      );
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
      response = mysql.QUERY(
        "SELECT id,href,title_en as 'name', title_en as 'name_en',image as 'thumbnail',	FLOOR(RAND()*(30-20+1))+20 AS 'count' ,'category' as'taxonomy'  FROM cat_tour where id =?",
        [id]
      );
    } else {
      response = mysql.QUERY(
        "SELECT id,href,title as 'name', title_en as 'name_en',image as 'thumbnail',	FLOOR(RAND()*(30-20+1))+20 AS 'count' ,'category' as'taxonomy'  FROM cat_tour where id =?",
        [id]
      );
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
        href: `../listing/${id}`,
      },
      ...body,
    };
    const response = await mysql.INSERT(inserts, "cat_tour");
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
    const response = await mysql.UPDATE(inserts, "id", id, "cat_tour");
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
    const response = mysql.DELETE("id", id, "cat_tour");
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
