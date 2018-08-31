import CookieManager from "react-native-cookies";
import moment from "moment";

const defaultField = "userdata";

export const setCookies = (userdata, field = defaultField) => {
  CookieManager.set({
    name: field,
    value: JSON.stringify(userdata),
    domain: "https://todolist.xn--7-dtbrueb.xn--p1ai/todoserver.php",
    origin: "https://todolist.xn--7-dtbrueb.xn--p1ai/todoserver.php",
    path: "/",
    version: "1",
    expiration: moment()
      .add(3, "month")
      .toDate()
  });
};

export const getCookies = async (field = defaultField) => {
  let data;
  return CookieManager.getAll().then(res => {
    data = res[field] && res[field].value;
    return data && JSON.parse(data);
  });
};

export const removeCookies = (field = defaultField) =>
  CookieManager.clearByName(field);
