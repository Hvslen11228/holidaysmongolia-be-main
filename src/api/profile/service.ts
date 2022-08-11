import user_model from "../../models/users";

export const one = async (_id: any, sort: any) => {
  try {
    const res = await user_model.findOne({ _id, delFlg: false }).sort(sort);
    return Promise.resolve(res);
  } catch (err) {
    console.log(err);
    return Promise.reject("Query error");
  }
};
export const Update = async (_id: any, body: any) => {
  try {
    const res = await user_model.updateOne({ _id }, { $set: { ...body } });
    return Promise.resolve(res);
  } catch (err) {
    console.log(err);
    return Promise.reject("Query error");
  }
};
export const remove = async (_id: any) => {
  try {
    const res = await user_model.findOneAndDelete(_id);
    return Promise.resolve(res);
  } catch (err) {
    console.log(err);
    return Promise.reject("Query error");
  }
};
