const mysql = require("../../../functions/mysql");
const shortid = require("shortid");
const date = require("date-and-time");
module.exports = {
  all_: async (req, res) => {
    lang = req.get("Accept-Language");

    const response = await mysql.QUERY("SELECT *  FROM news ", []);
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
  all_cat: async (req, res) => {
    const id = req.params.id;
    lang = req.get("Accept-Language");
    if (lang == "en") {
      const response = await mysql.QUERY("SELECT *  FROM tour where cat_id=?", [
        id,
      ]);
      if (!response.success) {
        return res.status(200).json({
          success: false,
          message: "Query error",
        });
      }
      const datas = [];
      for (let i = 0; i < response.data.length; i++) {
        const el = response.data[i];
        let ress = await mysql.QUERY(
          "SELECT *  FROM galleryImgs where galleryImgs_id =? ",
          [el.id]
        );
        el.map = JSON.parse(el.map);
        el.galleryImgs = [];
        el.author = [];
        el.listingCategory = [];
        for (let e = 0; e < ress.data.length; e++) {
          const element = ress.data[e];
          await el.galleryImgs.push(element.galleryImgs_urls);
        }
        ress = await mysql.QUERY("SELECT *  FROM authors where id =? ", [
          el.authorId,
        ]);
        el.author = ress.data[0];
        ress = await mysql.QUERY(
          "SELECT id,href,title_en as 'name', title_en as 'name_en',image as 'thumbnail',	FLOOR(RAND()*(30-20+1))+20 AS 'count' ,'category' as'taxonomy', 'listingType' as 'stay'  FROM cat_tour where id = ?",
          [el.listingCategoryId]
        );
        el.listingCategory = ress.data[0];
        await datas.push(el);
      }
      return res.status(200).json({
        success: true,
        data: datas,
      });
    } else {
      const response = await mysql.QUERY("SELECT *  FROM tour where cat_id=?", [
        id,
      ]);
      if (!response.success) {
        return res.status(200).json({
          success: false,
          message: "Query error",
        });
      }
      const datas = [];
      for (let i = 0; i < response.data.length; i++) {
        const el = response.data[i];
        let ress = await mysql.QUERY(
          "SELECT *  FROM galleryImgs where galleryImgs_id =? ",
          [el.id]
        );
        el.map = JSON.parse(el.map);
        el.galleryImgs = [];
        el.author = [];
        el.listingCategory = [];
        for (let e = 0; e < ress.data.length; e++) {
          const element = ress.data[e];
          await el.galleryImgs.push(element.galleryImgs_urls);
        }
        ress = await mysql.QUERY("SELECT *  FROM authors where id =? ", [
          el.authorId,
        ]);
        el.author = ress.data[0];
        ress = await mysql.QUERY(
          "SELECT id,href,title as 'name', title_en as 'name_en',image as 'thumbnail',	FLOOR(RAND()*(30-20+1))+20 AS 'count' ,'category' as'taxonomy', 'listingType' as 'stay'  FROM cat_tour where id = ?",
          [el.listingCategoryId]
        );
        el.listingCategory = ress.data[0];
        await datas.push(el);
      }
      return res.status(200).json({
        success: true,
        data: datas,
      });
    }
  },
  one_: async (req, res) => {
    const id = req.params.id;
    const response = await mysql.QUERY(
      "SELECT *  FROM news where news_id =?  ",
      [id]
    );
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
    let body = req.body;
    let inserts = {
      ...{},
      ...body,
    };
    const response = await mysql.INSERT(inserts, "news");
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
  update_: async (req, res) => {
    const body = req.body;
    const id = req.params.id;
    let inserts = {
      ...body,
    };
    const response = await mysql.UPDATE(inserts, "news_id", id, "news");
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
    const response = mysql.DELETE("news_id", id, "news");
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
