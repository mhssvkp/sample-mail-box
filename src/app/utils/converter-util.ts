export default class ConverterUtil {
  j = JSON;
  constructor() {}

  convertToJSONObject(value) {
    return this.j.parse(value);
  }

  convertToString(value) {
    return this.j.stringify(value);
  }
}
