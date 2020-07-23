import Error from "../models/error";
import Hasher from "../helpers/hasher";
import User, { IUser } from "../models/User";
import TokenGenerator from "../helpers/tokengenerator";

class UserService {
  /**
   * login a user
   * @param user user object from request
   */
  public login = async (user: IUser) => {
    let status = false;
    let error: Error = {};
    let token = null;
    let loginFailureMessage = "Invalid credentials";

    let dbUser = await this.getUserByEmail(user.email);
    if (!dbUser) {
      error.message = loginFailureMessage;
    } else {
      const isMatch = await Hasher.compare(user.password, dbUser.password);

      if (!isMatch) {
        error.message = loginFailureMessage;
      } else {
        token = this.generateToken(dbUser);
        status = true;
      }
    }

    return { status, error, token };
  };

  /**
   * register a user
   * @param user user object
   */
  public register = async (user: IUser) => {
    let status = false;
    let error: Error = {};
    let token = null;

    let dbUser = await this.getUserByEmail(user.email);
    if (dbUser) {
      error.message = "User with email already exist";
    } else {
      // hash user password
      user.password = await Hasher.hash(user.password);
      // save user and generate token
      await user.save();
      token = this.generateToken(user);
      status = true;
    }

    return { status, error, token };
  };

  /**
   * generate token
   * @param user user object
   */
  private generateToken = (user: IUser) => {
    if (!user) {
      return null;
    }

    const payload = {
      user: {
        id: user.id,
        firstname: user.firstname,
        lastname: user.lastname,
      },
    };

    const token = TokenGenerator.generate(payload);

    return token;
  };

  /**
   * returns true if user exist
   * @param email email id
   */
  private getUserByEmail = async (email: string) => {
    let user = await User.findOne({ email });
    return user;
  };
}

let service = new UserService();
export default service;
