const mysql = require("../../functions/mysql");
const date = require("date-and-time");
const shortid = require("shortid");
module.exports = {
  getUserByUserEmail: async (email, callBack) => {
    const checke = await mysql.SELECT_WHERE("user_email", email, "users");
    if (!checke.success) {
      return callBack("Query error");
    }
    if (checke.data.length == 0) {
      return callBack("Бүртгэлгүй хэрэглэгч");
    }
    return callBack(null, checke.data[0]);
  },
  create: async (data, callBack) => {
    //Хэрэглэгч шалгах
    const checke = await mysql.SELECT_WHERE("user_email", data.email, "users");
    if (!checke.success) {
      return callBack("Query error");
    }
    if (checke.data.length != 0) {
      return callBack("Хэрэглэгч аль хэдийн бүртгэлтэй байна.");
    }
    //end
    // Оруулах
    let inserts = {
      user_id: shortid.generate(),
      user_email: data.email,
      user_name: data.user_name.replace(/\s/g, ""),
      password: data.password,
      year: 2000,
      user_date: date.format(new Date(), "YYYY/MM/DD HH:mm:ss"),
      email_type: 1,
      role: "user",
      user_image: "",
      expired_date: date.format(new Date(), "YYYY/MM/DD HH:mm:ss"),
    };
    const response = await mysql.INSERT(inserts, "users");
    if (!response.success) {
      console.log(response);
      return callBack("Query error");
    }
    return callBack(null, "Хэрэглэгчийг бүртгэж авлаа.");
    //end
  },
};
