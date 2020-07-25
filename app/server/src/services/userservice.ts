import config from "config";
import mongoose from "mongoose";
import * as enums from "../enums";
import Error from "../models/error";
import Hasher from "../helpers/hasher";
import User, { IUser } from "../models/User";
import TokenGenerator from "../helpers/tokengenerator";
import { UserProps } from "../validators/uservalidator";

class UserService {
  /**
   * update a user
   * @param user user object from request
   */
  public update = async (user: IUser) => {
    let status = false;
    let error: Error = {};
    let failureMessage = "User not found";

    try {
      if (!mongoose.Types.ObjectId.isValid(user.id)) {
        throw window.Error(failureMessage);
      }

      const dbUser = await this.getById(user._id);

      if (!dbUser) {
        error.message = failureMessage;
      } else {
        await User.findByIdAndUpdate(
          { _id: user._id },
          {
            firstname: user.firstname,
            lastname: user.lastname,
            updated_date: user.updated_date,
          }
        );
        status = true;
      }
    } catch (e) {
      error.message = e.message;
    }

    return { status, error };
  };

  /**
   * delete a user
   * @param id user id
   */
  public delete = async (id: string) => {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw window.Error("Invalid user id");
    }

    await User.findByIdAndUpdate({ _id: id }, { status: enums.status.deleted });
  };

  public getAll = async (page: number, limit: number) => {
    const defaultPageLimit: number = config.get("pagination.defaultPageLimit");
    const maxPageLimit: number = config.get("pagination.maxPageLimit");

    if (isNaN(page) || page < 1) {
      page = 1;
    }

    if (isNaN(limit) || limit < 1) {
      limit = defaultPageLimit;
    }

    if (limit > maxPageLimit) {
      limit = maxPageLimit;
    }

    return await User.find({ status: enums.status.active })
      .select(`-${UserProps.PASSWORD}`)
      .sort(UserProps.FIRSTNAME)
      .limit(limit)
      .skip((page - 1) * limit);
  };

  /**
   * get user by id
   */
  public getById = async (id: string) => {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return null;
    }

    return await User.findOne({ _id: id, status: enums.status.active }).select(
      `-${UserProps.PASSWORD}`
    );
  };

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
        dbUser = null;
      } else {
        dbUser.password = "";
        token = this.generateToken(dbUser);
        status = true;
      }
    }

    return { status, error, token, dbUser };
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
      user.status = enums.status.active;
      user.created_date = new Date();
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
    return await User.findOne({ email: email, status: enums.status.active });
  };
}

let service = new UserService();
export default service;
