import user_model from "../../models/users";
import author_model from "../../models/author";
export const create_service = async (data: any) => {
  if (data.user_email == "" || data.user_email == null) {
    return Promise.reject("Мэдээлэл дутуу");
  }
  const inserts = {
    user_email: data.user_email.toLowerCase(),
    password: data.password,
    first_name: data?.first_name,
    last_name: data?.last_name,
    user_id: data.user_id,
  };
  try {
    const res_find = await user_model.findOne({
      user_email: inserts.user_email,
    });
    if (!res_find) {
      try {
        const res_create = await user_model.create(inserts);
        return Promise.resolve(res_create);
      } catch (err) {
        return Promise.reject("Query error");
      }
    } else {
      return Promise.reject("Бүртгэлтэй имэйл байна.");
    }
  } catch (err) {
    return Promise.reject("Query error");
  }
};
export const find_service = async (email: string) => {
  try {
    const res_find = await user_model.findOne({
      user_email: email,
    });
    if (res_find) {
      return Promise.resolve(res_find);
    } else {
      return Promise.reject("Бүртгэлгүй");
    }
  } catch (err) {
    return Promise.reject("Query error");
  }
};
export const find_service_auhtor = async (email: string) => {
  try {
    const res_find = await author_model.findOne({
      email: email,
    });
    if (res_find) {
      return Promise.resolve(res_find);
    } else {
      return Promise.reject("Бүртгэлгүй");
    }
  } catch (err) {
    return Promise.reject("Query error");
  }
};
export const update_service = async (_id: string, password: any) => {
  try {
    const res_find = await user_model.updateOne(
      { _id },
      { $set: { ...{ password } } }
    );
    return Promise.resolve(res_find);
  } catch (err) {
    return Promise.reject(err);
  }
};
