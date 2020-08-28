import * as enums from "../enums";
import mongoose, { Schema } from "mongoose";

export interface IWiki extends mongoose.Document {
  parentId: string;
  type: enums.wikiType;
  title: string;
  status: enums.status;
  createdDate: Date;
  updatedDate: Date;
  createdBy: string;
  updatedBy: string;
  content: string;
}

const WikiSchema = new mongoose.Schema({
  parentId: { type: Schema.Types.ObjectId, ref: "wikis", required: true },
  createdBy: { type: Schema.Types.ObjectId, ref: "users", required: true },
  updatedBy: { type: Schema.Types.ObjectId, ref: "users", required: true },
  type: { type: enums.wikiType },
  title: { type: String, required: true },
  content: { type: String },
  createdDate: { type: Date },
  updatedDate: { type: Date, default: Date.now() },
  status: { type: Number, select: false, default: enums.status.none },
});

const Wiki = mongoose.model<IWiki>("wikis", WikiSchema);
export default Wiki;
