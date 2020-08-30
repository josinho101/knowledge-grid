import { Wiki } from "../models/wiki";

class WikiHelper {
  public static getSelectedWiki = (
    wikiId?: string,
    tree?: Wiki
  ): Wiki | undefined => {
    if (tree && tree.children) {
      const result = tree.children.filter((i) => i.id === wikiId);
      if (result && result.length > 0) {
        return result[0];
      } else {
        for (let i = 0; i < tree.children.length; i++) {
          const wiki = WikiHelper.getSelectedWiki(wikiId, tree.children[i]);
          if (wiki) {
            return wiki;
          }
        }
      }
    }
  };
}

export default WikiHelper;
