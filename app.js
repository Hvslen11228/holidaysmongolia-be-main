require("dotenv").config();
const cors = require("cors");
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const fileupload = require("express-fileupload");
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();
const date = require("date-and-time");
//LOG START
var fs = require("fs");
var util = require("util");
var log_file = fs.createWriteStream(__dirname + "/logs/debug.log", {
  flags: "w",
});
global.LOG = function (d) {
  log_file.write(
    `${date.format(new Date(), "YYYY/MM/DD HH:mm:ss")}=>` +
      util.format(d) +
      "\n"
  );
};
//LOG END
//Router START
//auth
const authRouter = require("./api/auth/router");
//payment
const pay_qpayRouter = require("./api/pay/qpay/router");
const pay_monpayRouter = require("./api/pay/monpay/router");
const pay_khaanbankRouter = require("./api/pay/khaanbank/router");
const pay_promoRouter = require("./api/pay/promo/router");
//service
const menuRouter = require("./api/Service/menu/router");
const authorRouter = require("./api/Service/author/router");
const categoriesRouter = require("./api/Service/categories/router");
const tour_Router = require("./api/Service/tour_/router");
const mediaRouter = require("./api/Service/media/router");
//fun
const fileRouter = require("./api/functions/file/router");
const countRouter = require("./api/functions/count/router");
const locationRouter = require("./api/functions/location/router");
const videoRouter = require("./api/functions/video/router");
//
const profileRouter = require("./api/profile/router");
const orderRouter = require("./api/order/router");
const iconRouter = require("./api/Service/icons/router");
const blogRouter = require("./api/Service/blog/router");
const newsRouter = require("./api/Service/news/router");
const complexRouter = require("./api/Service/complex/router");

//Router END
// const cors_urls = [
//   "http://localhost:3000",
//   "http://monga.mn",
//   "https://monga.mn",
//   "https://www.monga.mn",
//   "http://monga.one",
//   "https://monga.one",
//   "https://www.monga.one",
// ];
const cors_urls = "*";
//USE START
app.use(
  cookieParser(),
  fileupload(),
  jsonParser,
  cors({
    origin: cors_urls,
    allowedHeaders: "Set-Cookie, Content-Type, Authorization",
    methods: "GET, POST, PUT, DELETE",
    credentials: true,
  }),
  function (req, res, next) {
    next();
    express.json();
  }
);

app.use("/auth", authRouter);
app.use("/page_media", fileRouter);
app.use("/verify_token", profileRouter);
app.use("/profile", profileRouter);
app.use("/count", countRouter);
app.use("/pay/qpay", pay_qpayRouter);
app.use("/pay/monpay", pay_monpayRouter);
app.use("/pay/khaanbank", pay_khaanbankRouter);
app.use("/pay/promo", pay_promoRouter);

app.use("/order", orderRouter);
app.use("/menu", menuRouter);
app.use("/author", authorRouter);
app.use("/function/location", locationRouter);
app.use("/function/video", videoRouter);
app.use("/categories", categoriesRouter);
app.use("/tour_", tour_Router);
app.use("/media", mediaRouter);
app.use("/icon", iconRouter);
app.use("/blog", blogRouter);
app.use("/news", newsRouter);
app.use("/complex", complexRouter);

app.use("/uploads", express.static("./file/uploads/"));
app.use("/image", express.static("./file/pages_media/"));

//USE END
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("server up and running on PORT :", port);
});
