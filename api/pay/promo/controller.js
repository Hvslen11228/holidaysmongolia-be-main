const mysql = require("../../../functions/mysql");
const date = require("date-and-time");
module.exports = {
  promo_checking: async (req, res) => {
    const id = req.body.code;
    const id_ = req.body.id;
    const response = mysql.SELECT_WHERE("promo_id", id, "promo_code");
    if (!response.success) {
      return res.status(200).json({
        success: false,
        message: "Query error",
      });
    }
    if (response.data.length == 0) {
      return res.status(200).json({
        success: false,
        message: "Код буруу",
      });
    }
    if (response.data[0].active == "true") {
      if (response.data[0].promo_type == "page") {
        const response2 = mysql.SELECT_WHERE("page_id", id_, "pages");
        if (!response2.success) {
          return res.status(200).json({
            success: false,
            message: "Query error",
          });
        }
        if (response2.data.length != 0) {
          const d = await mysql.UPDATE(
            {
              active: "true",
              page_type: "true",
            },
            "page_id",
            id_,
            "pages"
          );

          await mysql.UPDATE(
            {
              active: "false",
            },
            "promo_id",
            id,
            "promo_code"
          );
          return res.status(200).json({
            success: true,
            message: "Амжилттай",
          });
        } else {
          return res.status(200).json({
            success: false,
            message: "Хуудас байхгүй",
          });
        }
      } else if (response.data[0].promo_type == "user") {
        const user = await mysql.QUERY("SELECT * FROM users where user_id=?", [
          id_,
        ]);
        let date_use = await new Date(user.data[0].expired_date);
        await date_use.setDate(date_use.getDate() + parseInt(30));
        let new_date = await date.format(date_use, "YYYY/MM/DD HH:mm:ss");
        await mysql.UPDATE(
          {
            expired_date: new_date,
          },
          "user_id",
          id_,
          "users"
        );
        await mysql.UPDATE(
          {
            active: "false",
          },
          "promo_id",
          id,
          "promo_code"
        );
      }
      return res.status(200).json({
        success: true,
        message: "Амжилттай",
      });
    } else {
      return res.status(200).json({
        success: false,
        message: "Кодыг аль хэдийн хэрэглсэн байна",
      });
    }
  },
};
