const { getUserByUserEmail, create } = require("./service");
const { hashSync, genSaltSync, compareSync } = require("bcrypt");
const { sign } = require("jsonwebtoken");
const jwt = require("jsonwebtoken");
const sendMail = require("../../functions/nodemail");
const mysql = require("../../functions/mysql");
function makeid(length) {
  var result = "";
  var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}
function save_ip(id, login_data) {
  if (login_data) {
    if (login_data.platform) {
      const address = require("address");
      const date = require("date-and-time");
      address.mac(function (err, addr) {
        const device = login_data;
        mysql.INSERT(
          {
            user_id: id,
            mac_id: addr,
            device_name:
              device.platform.name + "/" + device.platform.product ||
              "desktop" + "/" + device.platform.manufacturer ||
              "desktop" +
                "/" +
                device.platform.os.family +
                "/" +
                "( " +
                device.platform.layout +
                " | " +
                device.platform.name +
                " )",
            device_type: device.platform.product || "desktop",
            log_date: date.format(new Date(), "YYYY/MM/DD HH:mm:ss"),
            ip_address: device.ip_address,
          },
          "Login_log"
        );
      });
    }
  }
}
module.exports = {
  create: (req, res) => {
    const body = req.body;
    const salt = genSaltSync(10);
    body.password = hashSync(body.password, salt);
    create(body, (err, results) => {
      if (err) {
        return res.status(200).json({
          success: false,
          message: err,
        });
      }
      getUserByUserEmail(body.email, (err, results) => {
        results.password = undefined;
        const jsontoken = sign({ result: results }, process.env.JWT_KEY, {
          expiresIn: process.env.JWT_EXPIRESIN,
        });
        const cookieOptions = {
          expires: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
        };
        res.status(200).cookie("token", jsontoken, cookieOptions).json({
          success: true,
          message: "Бүртгэл үүссэн нэвтэрлээ.",
          token: jsontoken,
          data: results,
        });
      });
    });
  },
  login: (req, res) => {
    const body = req.body;
    LOG(`login ${body.email}`);
    if (!body.email || body.email == null) {
      return res.status(200).json({
        success: false,
        message: "Цахим хаяг хоосон",
      });
    }
    if (!body.password || body.password == null) {
      return res.status(200).json({
        success: false,
        message: "Нууц үг хоосон",
      });
    }
    getUserByUserEmail(body.email, (err, results) => {
      if (err) {
        return res.status(200).json({
          success: false,
          message: err,
        });
      }
      const result = compareSync(body.password, results.password);
      if (result) {
        // save_ip(results.user_id, body.login_data);
        results.password = undefined;
        const jsontoken = sign({ result: results }, process.env.JWT_KEY, {
          expiresIn: process.env.JWT_EXPIRESIN,
        });
        const cookieOptions = {
          expires: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
        };
        res.status(200).cookie("token", jsontoken, cookieOptions).json({
          success: true,
          message: "Нэвтэрлээ",
          token: jsontoken,
          data: results,
        });
      } else {
        return res.status(200).json({
          success: false,
          message: "Нууц үг таарсангүй ",
        });
      }
    });
  },
  forgot_mail: async (req, res) => {
    const body = req.body;
    getUserByUserEmail(body.email, (err, results) => {
      if (err) {
        return res.status(200).json({
          success: false,
          message: err,
        });
      }
      const rand = Math.floor(100000 + Math.random() * 900000);
      const user_token = {
        id: results.user_id,
        email: results.user_email,
        pass: rand,
      };
      const jsontoken = sign(user_token, process.env.JWT_KEY, {
        expiresIn: process.env.JWT_EXPIRESIN,
      });
      let role = "Админ";
      if (results.role == "user") {
        role = "Уншигч";
      } else if (results.role == "reader") {
        role = "Уншигч";
      } else if (results.role == "translator") {
        role = "Oрчуулагч";
      } else if (results.role == "atist") {
        role = "Зураач";
      }
      sendMail(
        "forgot",
        "Monga.mn",
        role,
        body.email,
        "Нууц үг шинэчилэх код",
        {
          code: rand,
          user_name: results.user_name,
        }
      )
        .then((result) => {
          return res.status(200).json({
            success: true,
            message: "Баталгаажуулах код илээглээ",
            forgot_token: jsontoken,
          });
        })
        .catch((err) => {
          return res.status(200).json({
            success: false,
            message: "Алдаа гарлаа",
          });
        });
    });
  },
  forgot_code: async (req, res) => {
    const body = req.body;
    const id = body.forgot_token;
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Token алга байна",
      });
    }
    const code = req.body.code;
    const decoded = await jwt.verify(id, process.env.JWT_KEY);
    if (decoded.pass == code) {
      return res.status(200).json({
        success: true,
        message: "Амжилттай",
      });
    } else {
      return res.status(200).json({
        success: false,
        message: "Баталгаажуулах код таарсангүй",
      });
    }
  },
  forgot_password: async (req, res) => {
    const body = req.body;
    const id = body.forgot_token;
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Token алга байна",
      });
    }
    const code = req.body.code;
    const decoded = await jwt.verify(id, process.env.JWT_KEY);
    if (decoded.pass == code) {
      let password = body.password;
      const salt = genSaltSync(10);
      password = hashSync(password, salt);
      const checke = await mysql.UPDATE(
        { password },
        "user_id",
        decoded.id,
        "users"
      );
      if (!checke.success) {
        return res.status(200).json({
          success: false,
          message: "Query error",
        });
      }
      return res.status(200).json({
        success: true,
        message: "Амжилттай нууц үг солигдлоо",
      });
    } else {
      return res.status(200).json({
        success: false,
        message: "Баталгаажуулах код таарсангүй",
      });
    }
  },
  username_checker: async (req, res) => {
    const id = req.params.id;
    const checke = await mysql.SELECT_WHERE("user_name", id, "users");
    if (!checke.success) {
      return res.status(200).json({
        success: false,
        message: "Query error",
      });
    }
    if (checke.data.length == 0) {
      return res.status(200).json({
        success: true,
        message: "Ийм бүртгэл үүсгэх боломжтой",
      });
    } else {
      return res.status(200).json({
        success: false,
        message: "Ийм бүртгэл үүсгэх боломжгүй",
        data: checke.data[0],
      });
    }
  },
  _checker: async (req, res) => {
    const id = req.params.id;
    const checke = await mysql.SELECT_WHERE("user_id", id, "users");
    if (!checke.success) {
      return res.status(200).json({
        success: false,
        message: "Query error",
      });
    }
    if (checke.data.length == 0) {
      return res.status(200).json({
        success: false,
        message: "",
      });
    } else {
      return res.status(200).json({
        success: true,
        data: checke.data[0],
      });
    }
  },
  promo: async (req, res) => {
    const promo = makeid(7);
    const response = mysql.INSERT(
      {
        promo_id: promo,
        promo_type: "page",
        active: "true",
      },
      "promo_code"
    );
    if (!response.success) {
      return res.status(200).json({
        success: false,
        message: "Query error",
      });
    }
    return res.status(200).json({
      success: true,
      message: promo,
    });
  },
  validation_mail: async (req, res) => {
    const email = req.params.id;
    const checke = await mysql.SELECT_WHERE("user_email", email, "users");
    if (!checke.success) {
      return res.status(200).json({
        success: false,
        message: "Query error",
      });
    }
    if (checke.data.length == 0) {
      return res.status(200).json({
        success: false,
        message: "Бүртгэлгүй",
      });
    } else if (checke.data[0].email_type != 1) {
      return res.status(200).json({
        success: false,
        message: "Баталгаажсан байна",
      });
    } else {
      var rand = Math.floor(100000 + Math.random() * 900000);
      const user_token = {
        type: "email",
        id: checke.data[0].user_id,
        email: checke.data[0].user_email,
        pass: rand,
      };
      const jsontoken = sign({ user_token }, process.env.JWT_KEY, {
        expiresIn: process.env.JWT_EXPIRESIN,
      });
      let role = "Хэрэглэгч";
      sendMail("validation", "Систем", role, email, "Бүртгэл баталгаажуулалт", {
        code: "https://api.forms.mn/auth/validation/" + jsontoken,
        user_name: checke.data[0].user_firstname,
      })
        .then((result) => {
          return res.status(200).json({
            success: true,
            message: "Баталгаажуулах имайл илээглээ",
          });
        })
        .catch((err) => {
          return res.status(200).json({
            success: false,
            message: "Алдаа гарлаа",
          });
        });
    }
  },
  validation_code: async (req, res) => {
    const id = req.params.id;
    const decoded = await jwt.verify(id, process.env.JWT_KEY);
    if (decoded) {
      if (decoded.user_token) {
        if (decoded.user_token.type == "email") {
          await mysql.UPDATE(
            { email_type: 2 },
            "user_id",
            decoded.user_token.id,
            "users"
          );
          return res.send(`Амжилттай <a href="https://forms.mn">
          Буцах
        </a>`);
        }
      }
    }
    return res.send("Алдаа");
  },
};
