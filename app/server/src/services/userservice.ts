import Error from "../models/error";
import Hasher from "../helpers/hasher";
import User, { IUser } from "../models/User";

class UserService {
  /**
   * register a user
   * @param user user object
   */
  public register = async (user: IUser) => {
    let status = false;
    let error: Error = {};

    let isExist = await this.isUserExist(user.email);
    if (!isExist) {
      // hash user password
      user.password = await Hasher.hash(user.password);
      // save user
      await user.save();

      status = true;
    } else {
      error.message = "User with email already exist";
    }

    return [status, error];
  };

  /**
   * returns true if user exist
   * @param email email id
   */
  private isUserExist = async (email: string) => {
    let user = await User.findOne({ email });
    if (user) {
      return true;
    }

    return false;
  };
}

let service = new UserService();
export default service;
