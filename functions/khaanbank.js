const request = require("request-promise");
const axios = require("axios");
const qs = require("qs");
const date = require("date-and-time");
function b64EncodeUnicode(str) {
  return Buffer.from(str).toString("base64");
}
var fs = require("fs");
class BANK {
  dans = null;
  uname = null;
  upass = null;
  certification = null;
  basic_token = null;
  token = null;
  cname = null;
  table = null;
  constructor(conn, table, dans, uname, upass, cname) {
    this.dans = dans;
    this.uname = uname;
    this.upass = b64EncodeUnicode(upass);
    this.certification = "certification.json";
    this.device_id = "4FAB0571-90F4-4826-8B24-C9F0E26984DC";
    this.basic_token =
      "Vm00eHFtV1BaQks3Vm5UYjNRRXJZbjlJZkxoWmF6enI6dElJQkFsU09pVXIwclV5cA==";
    this.cname = cname;
    this.conn = conn;
    this.table = table;
  }
  async setToken() {
    var data = await fs.readFileSync(__dirname + "/" + this.certification);
    if (data) {
      console.log("refresh_token");
      data = await this.refreshToken(data);
    } else {
      console.log("get token");
      data = await this.getToken();
    }
    this.token = data.access_token;
  }
  async getToken() {
    const url = `https://api.khanbank.com:9003/v1/auth/token?grant_type=password&username=${
      this.uname
    }&password=${encodeURIComponent(this.upass)}&channelId=I`;
    var options = {
      method: "POST",
      url: url,
      headers: {
        "Accept-Language": "mn-MN",
        "Content-Type": "application/x-www-form-urlencoded",
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.71 Safari/537.36",
        "device-id": this.device_id,
        Host: "api.khanbank.com:9003",
        Referer: "https://e.khanbank.com/",
        Origin: "https://e.khanbank.com",
        Authorization: "Basic " + this.basic_token,
      },
    };
    let response = await request(options).catch(async (err) => {
      return 0;
    });
    await this.writeFile(this.certification, response);
    response = JSON.parse(response);
    return response;
  }
  async refreshToken(data) {
    data = JSON.parse(data);
    const url = `https://api.khanbank.com:9003/v1/auth/refresh?grant_type=refresh_token&refresh_token=${data.refresh_token}`;
    var options = {
      method: "POST",
      url: url,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: "Basic " + this.basic_token,
      },
    };
    let response2 = null;
    let response = await request(options).catch(async (err) => {
      response2 = await this.getToken();
      if (response2) {
        return response2;
      } else {
        return 0;
      }
    });
    if (response) {
      if (typeof response != "string") {
        response = JSON.stringify(response);
      }
      await this.writeFile(this.certification, response);
      response = await JSON.parse(response);
      return response;
    }
  }
  async getTransactionList() {
    await this.setToken();
    const edate = date.format(new Date(), "YYYY-MM-DD");
    let date_use = await new Date();
    await date_use.setDate(date_use.getDate() - parseInt(50));
    const sdate = await date.format(date_use, "YYYY-MM-DD");
    const url = `https://api.khanbank.com:9003/v1/omni/user/custom/operativeaccounts/${
      this.dans
    }/transactions?transactionValue=0&transactionDate={"lt":"${sdate}T00:00:00","gt":"${edate}T23:59:59"}&amount={"lt":"0","gt":"0"}&amountType=&transactionCategoryId=&transactionRemarks=&customerName=${encodeURIComponent(
      this.cname
    )}&transactionCurrency=MNT&branchCode=5032`;
    var data = qs.stringify({});
    var config = {
      method: "get",
      url: url,
      headers: {
        Authorization: "Bearer " + this.token,
      },
      data: data,
    };

    const res = await axios(config).catch(async (err) => {
      return false;
    });
    if (res.status == 200) {
      const data_json = await this.insert2db(res.data);
      return data_json;
    } else {
      return false;
    }
  }
  async insert2db(data) {
    const res_data = [];
    await data.forEach(async (row) => {
      const push_data = {};
      let date_f = new Date(Date.parse(row.transactionDate));
      date_f = date.format(date_f, "YYYY-MM-DD");
      const in_date = date_f + " " + row.txnTime + ":00";
      push_data.date = in_date;
      const accountNumber = row.accountId ? row.accountId : "";
      push_data.accountNumber = accountNumber;
      push_data.transactionType = row.amountType.codeDescription;
      let expenseBalance = 0;
      let incomeBalance = 0;
      if (row.amountType.codeDescription == "Credit") {
        incomeBalance = row.amount.amount;
      } else {
        expenseBalance = row.amount.amount;
      }
      push_data.expenseBalance = expenseBalance;
      push_data.incomeBalance = incomeBalance;
      push_data.beginBalance = row.beginBalance.amount;
      push_data.endBalance = row.endBalance.amount;
      push_data.description = row.transactionRemarks;
      push_data.id = await this.create_id(
        push_data.date,
        push_data.accountNumber
      );
      res_data.push(push_data);
    });
    return res_data;
  }
  async writeFile(path, file) {
    var log_file = await fs.createWriteStream(__dirname + "/" + path, {
      flags: "w",
    });
    await log_file.write(file);
    return 0;
  }
  async create_id(date, accountId) {
    return "log_" + Date.parse(date) + "_" + parseInt(accountId);
  }
}

module.exports = new BANK(
  "",
  process.env.KHAANBANK_DB,
  process.env.KHAANBANK_DANS,
  process.env.KHAANBANK_USER,
  process.env.KHAANBANK_PASS,
  process.env.KHAANBANK_USERNAME
);
