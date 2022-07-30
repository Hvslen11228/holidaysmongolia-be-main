const request = require("request-promise");
const callback_url = "https://api.monga.one/pay/qpay/";
class qpay {
  async TOKEN() {
    let response = await request.post(
      "https://merchant.qpay.mn/v2/auth/token",
      {
        auth: {
          user: process.env.Qpay_Username,
          pass: process.env.Qpay_Password,
        },
      }
    );
    response = JSON.parse(response);
    if (response.access_token) {
      return {
        success: true,
        data: {
          refresh_token: response.refresh_token,
          access_token: response.access_token,
        },
      };
    } else {
      return {
        success: false,
        data: null,
      };
    }
  }
  async CREATE_SIMPLE(data) {
    const token = await this.TOKEN();
    var options = {
      method: "POST",
      url: "https://merchant.qpay.mn/v2/invoice",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token.data.access_token,
      },
      body: JSON.stringify({
        invoice_code: process.env.Qpay_INVOICE_CODE,
        sender_invoice_no: data.id,
        invoice_receiver_code: data.user_id,
        invoice_description: data.text,
        amount: data.amount,
        callback_url: callback_url + data.id,
      }),
    };
    let response = await request(options);
    response = JSON.parse(response);
    if (response.invoice_id) {
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
  async CREATE(data) {
    const token = await this.TOKEN();
    var options = {
      method: "POST",
      url: "https://merchant.qpay.mn/v2/invoice",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token.data.access_token,
      },
      body: JSON.stringify({
        invoice_code: process.env.Qpay_INVOICE_CODE,
        sender_invoice_no: data.id,
        invoice_receiver_code: data.user_id,
        invoice_description: data.text,
        allow_partial: false,
        minimum_amount: null,
        allow_exceed: false,
        maximum_amount: null,
        amount: (data.amount / 100) * 90,
        callback_url: callback_url + data.id,
        sender_staff_code: "online",
        tax_customer_code: "2650827",
        invoice_receiver_data: {
          register: data.user.id,
          name: data.user.firstname,
          email: data.user.email,
          phone: data.user.phone,
        },
        lines: [
          {
            tax_product_code: "8439200",
            line_description: data.text,
            line_quantity: "1.00",
            line_unit_price: (data.amount / 100) * 90,
            note: "-.",
            taxes: [
              {
                tax_code: "VAT",
                description: "НӨАТ",
                amount: (data.amount / 100) * 10,
                note: " НӨАТ",
              },
            ],
          },
        ],
      }),
    };
    let response = await request(options);
    response = JSON.parse(response);
    if (response.invoice_id) {
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
  async CHECK(id) {
    const token = await this.TOKEN();
    var options = {
      method: "POST",
      url: "https://merchant.qpay.mn/v2/payment/check",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token.data.access_token,
      },
      body: JSON.stringify({
        object_type: "INVOICE",
        object_id: id,
        offset: {
          page_number: 1,
          page_limit: 100,
        },
      }),
    };
    let response = await request(options);
    response = JSON.parse(response);
    if (response.rows) {
      if (response.count > 0) {
        return {
          success: true,
          data: response,
          paymented: true,
        };
      } else {
        return {
          success: true,
          data: response,
          paymented: false,
        };
      }
    } else {
      return {
        success: false,
        data: null,
      };
    }
  }
  async EBARIMT(data) {
    const token = await this.TOKEN();
    var options = {
      method: "POST",
      url: "https://merchant.qpay.mn/v2/ebarimt/create",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token.data.access_token,
      },
      body: JSON.stringify({
        payment_id: data.id,
        ebarimt_receiver_type: data.type,
      }),
    };
    let response = await request(options);
    response = JSON.parse(response);
    if (response) {
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
}
module.exports = new qpay();
