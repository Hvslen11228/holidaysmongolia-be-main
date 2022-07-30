const request = require("request-promise");
const callback_url = "https://api.monga.one/pay/monpay/callback";
class Monpay {
  async TOKEN() {
    var options = {
      method: "POST",
      url: "https://wallet.candy.mn/v2/oauth/token",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      form: {
        client_id: "zkOnEGDHt89tTELJ",
        client_secret: "ifC4zSR39RieRPJv",
        grant_type: "client_credentials",
      },
    };
    let response = await request(options);
    response = JSON.parse(response);
    if (response.access_token) {
      return {
        success: true,
        data: response,
      };
    } else {
      return {
        success: false,
        data: null,
      };
    }
  }
  async CREATE_QR(data) {
    var options = {
      method: "POST",
      url: "https://wallet.monpay.mn/rest/branch/qrpurchase/generate",
      headers: {
        // Authorization: "Basic VG9ndG9raF9kZXY6TUtaRTZZ",
        "Content-Type": "application/json",
      },
      auth: {
        user: process.env.Monpay_Username,
        pass: "10314020" || process.env.Monpay_Password,
      },
      body: JSON.stringify({
        amount: data.amount,
        generateUuid: true,
        displayName: data.displayName,
        callbackUrl: callback_url + "/qr",
      }),
    };
    console.log(callback_url + "/qr");
    let response = await request(options);
    response = JSON.parse(response);
    if (response.code == 0) {
      return {
        success: true,
        data: response.result,
      };
    } else {
      return {
        success: false,
        data: null,
      };
    }
  }
  async CREATE_DEEP(data) {
    const token = await this.TOKEN();
    var options = {
      method: "POST",
      url: "https://wallet.candy.mn/v2/api/oauth/invoice",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token.data.access_token,
      },
      body: JSON.stringify({
        amount: data.amount, //Дүн
        redirectUri: "gyals://gyals", //Webhook буюу гүйлгээний үр дүн илгээгдэх буцах хаяг
        clientServiceUrl: callback_url + "/deep", //Амжилттай гүйлгээний дараа backend-ээс дуудах webhook url.
        receiver: "Togtokh_dev", //Нэхэмжлэхийн төрлөөс хамаарч утга нь өөр өөр байна
        invoiceType: "P2B", //Хэрэглэгчээс мерчант
        description: data.description, //Тайлбар
      }),
    };
    let response = await request(options);
    response = JSON.parse(response);
    if (response.code == "OK") {
      return {
        success: true,
        data: response,
      };
    } else {
      return {
        success: false,
        data: null,
      };
    }
  }
  async CHECK_QR(id) {
    var options = {
      method: "GET",
      url: "https://wallet.monpay.mn/rest/branch/qrpurchase/check?uuid=" + id,
      headers: {
        Authorization: "Basic VG9ndG9raF9kZXY6TUtaRTZZ",
      },
      auth: {
        user: process.env.Monpay_Username,
        pass: process.env.Monpay_Password,
      },
    };
    let response = await request(options);
    response = JSON.parse(response);
    if (response.code == 0) {
      return {
        success: true,
        data: response.result,
        message: response.info,
      };
    } else {
      return {
        success: false,
        data: null,
        message: response.info,
      };
    }
  }
  async CHECK_DEEP(id) {
    const token = await this.TOKEN();
    var options = {
      method: "GET",
      url: "https://wallet.candy.mn/v2/api/oauth/invoice/" + id,
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token.data.access_token,
      },
    };
    let response = await request(options);
    response = JSON.parse(response);
    if (response.code == "OK") {
      if (response.result.status == "PAID") {
        return {
          success: true,
          data: response.result,
          message: response.result.statusInfo,
        };
      } else {
        return {
          success: false,
          data: null,
          // data: null || response.result,
          message: "Төлбөр төлөлт хийгдээгүй байна",
        };
      }
    } else {
      return {
        success: false,
        data: null,
        message: response.info,
      };
    }
  }
  async ALL(data) {
    const QR = await this.CREATE_QR(data);
    const DEEP = await this.CREATE_DEEP(data);
    const res = {};
    if (QR.success) {
      res.qr = QR.data;
    } else {
      return {
        success: false,
        data: res,
      };
    }
    if (DEEP.success) {
      res.deep = DEEP.data.result;
    } else {
      return {
        success: false,
        data: res,
      };
    }
    return {
      success: true,
      data: res,
    };
  }
}
module.exports = new Monpay();
