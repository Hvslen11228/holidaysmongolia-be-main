const mysql = require("../../../functions/mysql");
const express = require("express");
module.exports = {
  pages_media: async (req, res) => {
    const id = req.params.id;
    const checke = await mysql.SELECT_WHERE("media_id", id, "photo_media");
    if (!checke.success) {
      return callBack("Query error");
    }
    const file = `./file/pages_media/${checke.data[0].url}`;
    res.download(file);
  },
  file_upload: async (req, res) => {
    const upload_file = req.files.file;
    if (!upload_file) {
      return res.status(400).json({
        success: false,
        message: "File алга",
      });
    }
    upload_file.name = `uploaded_${upload_file.name}`;
    await upload_file.mv(`./file/uploads/${upload_file.name}`);
    return res.status(200).json({
      success: true,
      message: "Амжилттай",
      url: `https://api.monga.one/uploads/${upload_file.name}`,
    });
  },
};
