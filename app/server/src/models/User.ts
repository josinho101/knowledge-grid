import mongoose from "mongoose";
import * as enums from "../enums";

export interface IUser extends mongoose.Document {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  status: enums.status;
  created_date: Date;
  updated_date: Date;
}

const UserSchema = new mongoose.Schema({
  firstname: { type: String, required: true },
  lastname: { type: String },
  password: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  created_date: { type: Date },
  updated_date: { type: Date, default: Date.now() },
  status: { type: Number, select: false, default: enums.status.none },
});

const User = mongoose.model<IUser>("user", UserSchema);
export default User;
