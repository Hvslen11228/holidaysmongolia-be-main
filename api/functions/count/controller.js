const mysql = require("../../../functions/mysql");
const shortid = require("shortid");
const date = require("date-and-time");
module.exports = {
  page: (req, res) => {
    const id = req.params.id;
    let result = { projects: 0, chapters: 0, photos: 0 };
    let response = mysql.QUERY(
      "SELECT COUNT(*) as 'count' FROM monga.projects where page_id= ?",
      [id]
    );
    result.projects = response.data[0].count;
    response = mysql.QUERY(
      `SELECT COUNT(*) as 'count' FROM monga.chapters 
    JOIN projects
              ON chapters.project_id = projects.project_id where projects.page_id=?`,
      [id]
    );
    result.chapters = response.data[0].count;
    response = mysql.QUERY(
      `SELECT COUNT(*) as 'count' FROM monga.photo_media where page_id=?`,
      [id]
    );
    result.photos = response.data[0].count;
    response = mysql.QUERY(
      `SELECT COUNT(*) as 'count' FROM followed_page where page_id=?`,
      [id]
    );
    result.following = response.data[0].count;
    res.status(200).json({
      success: true,
      data: result,
    });
  },
  project: async (req, res) => {
    const id = req.params.id;
    let result = { chapters: 0, photos: 0 };
    let response = await mysql.QUERY(
      `SELECT * FROM chapters 
      where project_id=?`,
      [id]
    );
    result.chapters = response.data.length;
    await response.data.forEach(async (el) => {
      response = await mysql.QUERY(
        `SELECT COUNT(*) as 'count' FROM photo_media where chapter_id=?`,
        [el.chapter_id]
      );
      result.photos = result.photos + response.data[0].count;
    });

    return res.status(200).json({
      success: true,
      data: result,
    });
  },
};
