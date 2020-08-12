import * as enums from "../enums";

export interface IWikiViewModel {
  id: string;
  type: enums.wikiType;
  title: string;
  children?: IWikiViewModel[];
}
