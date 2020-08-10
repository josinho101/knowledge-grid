import mongoose from "mongoose";
import * as enums from "../enums";

export interface IWiki extends mongoose.Document {
  parentId: string;
  type: string;
  title: string;
  status: enums.status;
  createdDate: Date;
  updatedDate: Date;
}

const WikiSchema = new mongoose.Schema({
  parentId: { type: String, required: true },
  type: { type: String },
  title: { type: String, required: true },
  createdDate: { type: Date },
  updatedDate: { type: Date, default: Date.now() },
  status: { type: Number, select: false, default: enums.status.none },
});

const Wiki = mongoose.model<IWiki>("wiki", WikiSchema);
export default Wiki;
