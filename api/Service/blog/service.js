const mysql = require("../../../functions/mysql");
const date = require("date-and-time");
const shortid = require("shortid");
module.exports = {
  create: async (data, user_id, id, callBack) => {
    const chapter_id = shortid.generate();
    let inserts = {
      ...{
        chapter_id,
        project_id: id,
        chapter_active: "true",
        chapter_created_date: date.format(new Date(), "YYYY/MM/DD HH:mm:ss"),
        user_id,
      },
      ...data,
    };
    console.log(inserts);
    const response = await mysql.INSERT(inserts, "chapters");
    if (!response.success) {
      console.log(response);
      return callBack("Query error");
    }
    return callBack(null, chapter_id);
  },
};
