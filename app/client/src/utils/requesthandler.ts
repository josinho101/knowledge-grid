import axios from "axios";

export default class RequestHandler {
  /**
   * get request handler
   * @param url url
   */
  public static get = async (url: string) => {
    try {
      const response = await axios.get(url);
    } catch (e) {
      console.error(e);
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
    }
  };
}
