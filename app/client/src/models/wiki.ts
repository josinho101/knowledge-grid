import * as enums from "../enums";

export interface Wiki {
  id?: string;
  parentId?: string;
  type: enums.wikiType;
  title: string;
  children?: Wiki[];
  content?: string;
}
