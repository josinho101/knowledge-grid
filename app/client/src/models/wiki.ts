import * as enums from "../enums";

export interface Wiki {
  id: string;
  type: enums.wikiType;
  title: string;
  children?: Wiki[];
}
