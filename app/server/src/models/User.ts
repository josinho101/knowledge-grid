import mongoose from "mongoose";

export interface IUser extends mongoose.Document {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
}

const UserSchema = new mongoose.Schema({
  firstname: { type: String, required: true },
  lastname: { type: String },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  created_date: { type: Date, default: Date.now() },
});

const User = mongoose.model<IUser>("user", UserSchema);
export default User;
