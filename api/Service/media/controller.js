const { create, show_table } = require("./service");
const mysql = require("../../../functions/mysql");
const shortid = require("shortid");
const date = require("date-and-time");
module.exports = {
  create: async (req, res) => {
    const upload_file = req.files.file;
    const d1 = new Date().getTime();
    if (!upload_file) {
      return res.status(400).json({
        success: false,
        message: "File алга",
      });
    }
    upload_file.name = `_${d1}_${upload_file.name}`;
    await upload_file.mv(`./file/pages_media/${upload_file.name}`);
    return res.status(200).json({
      success: true,
      message: "Амжилттай",
      url: "https://api.holidaysmongolia.com/image/" + upload_file.name,
    });
  },
  create_all: async (req, res) => {
    const _id = req.params.id;
    const body = req.body;
    //  const user_id = req.decoded.result.user_id;
    const upload_file = req.files.photos;
    const d1 = new Date().getTime();
    if (!upload_file) {
      return res.status(400).json({
        success: false,
        message: "File алга",
      });
    }

    let datas = [];
    if (!upload_file.length) {
      const media_id = shortid.generate();
      const element = upload_file;
      element.name = `${_id}_${d1}_${element.name}`;
      await element.mv(`./file/pages_media/${element.name}`);
      let inserts = {
        id: media_id,
        galleryImgs_id: _id,
        galleryImgs_urls:
          "https://api.holidaysmongolia.com/image/" + element.name,
      };
      const response = await mysql.INSERT(inserts, "galleryImgs");
      if (response.success) {
        datas.push("https://api.holidaysmongolia.com/image/" + element.name);
      }
    } else {
      for (let index = 0; index < upload_file.length; index++) {
        const media_id = shortid.generate();
        const element = upload_file[index];
        element.name = `_${d1}_${element.name}`;
        await element.mv(`./file/pages_media/${element.name}`);
        let inserts = {
          id: media_id,
          galleryImgs_id: _id,
          galleryImgs_urls:
            "https://api.holidaysmongolia.com/image/" + element.name,
        };
        const response = await mysql.INSERT(inserts, "galleryImgs");
        if (response.success) {
          datas.push("https://api.holidaysmongolia.com/image/" + element.name);
        }
      }
    }

    return res.status(200).json({
      success: true,
      message: "Амжилттай",
      urls: datas,
    });
  },
  page: async (req, res) => {
    const id = req.params.id;
    const checke = await mysql.SELECT_WHERE(
      "galleryImgs_id",
      id,
      "galleryImgs"
    );
    if (!checke.success) {
      return res.status(400).json({
        success: false,
        message: "File алга",
      });
    }
    return res.status(200).json({
      success: true,
      data: checke.data,
    });
  },
  update: async (req, res) => {
    const body = req.body;
    const id = req.params.id;
    const response = mysql.UPDATE(body, "media_id", id, "photo_media");
    if (!response.success) {
      return res.status(200).json({
        success: false,
        message: "Query error",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Done",
      data: response.data,
    });
  },
  remove: async (req, res) => {
    const id = req.params.id;
    const checke = await mysql.SELECT_WHERE("id", id, "galleryImgs");
    if (!checke.success) {
      return res.status(400).json({
        success: false,
        message: "File алга",
      });
    } else if (checke.data.length == 0) {
      return res.status(400).json({
        success: false,
        message: "File алга",
      });
    }
    const file = `./file/pages_media/${checke.data[0].url}`;

    var fs = require("fs");
    await mysql.DELETE("id", id, "galleryImgs");
    return res.status(200).json({
      success: true,
      message: "File устлаа",
    });
    fs.unlink(file, function (err) {
      if (err) {
        return res.status(400).json({
          success: false,
          message: "File алга",
        });
      }

      return res.status(200).json({
        success: true,
        message: "File устлаа",
      });
    });
  },
};
