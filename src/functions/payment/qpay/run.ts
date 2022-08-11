import service from "./service";

const { create_token, create_qpay_simple } = service;
const checking_ = service.checking;

export const create = async (data: any, callBack: any) => {
  let token = null;
  create_token((err: any, results: any) => {
    if (err) {
      return callBack({
        success: false,
        message: err,
      });
    }
    token = results.access_token;
    create_qpay_simple(token, data, (err: any, results: any) => {
      if (err) {
        return callBack({
          success: false,
          message: err,
        });
      }
      return callBack({
        success: true,
        data: results,
      });
    });
  });
};
export const checking = async (invoice_id: string, callBack: any) => {
  let token = null;
  create_token((err: any, results: any) => {
    if (err) {
      return callBack({
        success: false,
        message: err,
      });
    }
    token = results.access_token;
    checking_(token, invoice_id, (err: any, results: any) => {
      if (err) {
        return callBack({
          success: false,
          message: err,
        });
      }
      return callBack(results);
    });
  });
};
export default { create, checking };
