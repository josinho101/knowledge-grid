import axios, { AxiosRequestConfig } from "axios";

export default class RequestHandler {
  /**
   * get request handler
   * @param url url
   */
  public static get = async (url: string) => {
    try {
      return await axios.get(url);
    } catch (e) {
      console.error(e);
      return e.response;
    }
  };

  /**
   * post request handler
   * @param url url
   * @param data data to post
   */
  public static post = async (url: string, data: any) => {
    try {
      return await axios.post(url, data);
    } catch (e) {
      console.error(e);
      return e.response;
    }
  };
}
