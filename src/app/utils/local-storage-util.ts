import ConverterUtil from "./converter-util";

export default class LocalStorageUtil {
  ls = window.localStorage;
  cUtil = new ConverterUtil();
  constructor() {}

  get(key) {
    return this.cUtil.convertToJSONObject(this.ls.getItem(key));
  }

  post(key, value) {
    this.ls.setItem(key, this.cUtil.convertToString(value));
  }

  put(key, value) {
    this.post(key, value);
  }

  remove(key) {
    this.ls.removeItem(key);
  }
}
