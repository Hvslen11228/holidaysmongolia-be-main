import request from "request";
export default {
  create_token: async (callBack: any) => {
    const options = {
      method: "POST",
      url: "https://merchant.qpay.mn/v2/auth/token",
      auth: {
        user: process.env.Qpay_Username,
        pass: process.env.Qpay_Password,
      },
    };
    request(options, function (error, response) {
      if (error) {
        return callBack(error);
      }
      return callBack(null, JSON.parse(response.body));
    });
  },
  create_qpay_simple: async (token: string, data: any, callBack: any) => {
    const options = {
      method: "POST",
      url: "https://merchant.qpay.mn/v2/invoice",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        invoice_code: process.env.Qpay_INVOICE_CODE,
        sender_invoice_no: data.id,
        invoice_receiver_code: data.user_id,
        invoice_description: data.text,
        amount: data.amount,
        callback_url: process.env.Qpay_Call_Back + data.id,
      }),
    };
    request(options, function (error, response) {
      if (error) {
        return callBack(error);
      }
      return callBack(null, JSON.parse(response.body));
    });
  },
  checking: async (token: string, data: any, callBack: any) => {
    console.log(data, token);
    const options = {
      method: "POST",
      url: "https://merchant.qpay.mn/v2/payment/check",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        object_type: "INVOICE",
        object_id: data,
        offset: {
          page_number: 1,
          page_limit: 100,
        },
      }),
    };
    request(options, function (error, response: any) {
      if (error) {
        return callBack(error);
      }
      response = JSON.parse(response.body);
      if (response.rows) {
        if (response.count > 0) {
          return callBack(null, { success: true, message: "Төлөгдсөн" });
        } else {
          return callBack(null, {
            success: false,
            message: "Төлбөр хүлээгдэж байна",
          });
        }
      } else {
        return callBack("ERROR");
      }
    });
  },
};
