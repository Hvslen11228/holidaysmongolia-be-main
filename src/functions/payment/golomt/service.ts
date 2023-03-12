import axiosRequest from "../../axios";
export const create_golomt_simple = async (data: any) => {
  try {
    const result = await axiosRequest("invoice create", false, {
      method: "POST",
      url: encodeURI(process.env.GOLOMT_BACKEND_URL + "/api/invoice"),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.GOLOMT_TOKEN}`,
      },
      data: JSON.stringify(data),
    });
    return Promise.resolve(result);
  } catch (error) {
    return Promise.reject(error);
  }
};
export const golomt_checking = async (data: any) => {
  try {
    const result = await axiosRequest("invoice checker", false, {
      method: "POST",
      url: encodeURI(process.env.GOLOMT_BACKEND_URL + "/api/inquiry"),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.GOLOMT_TOKEN}`,
      },
      data: JSON.stringify(data),
    });
    if (result.errorCode == "000") {
      return Promise.resolve(result);
    } else {
      return Promise.reject(result.errorDesc);
    }
  } catch (error) {
    return Promise.reject(error);
  }
};
