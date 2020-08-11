import * as enums from "../enums";
import { check } from "express-validator";

export const WikiProps = {
  PARENT_ID: "parentId",
  TYPE: "type",
  TITLE: "title",
};

export const createWikiValidator = (() => {
  return [
    check(WikiProps.PARENT_ID, "Parent wiki id is required").not().isEmpty(),
    check(
      WikiProps.TYPE,
      "Wiki type should be either folder - 1 or page - 2"
    ).isIn([enums.wikiType.folder, enums.wikiType.page]),
    check(
      WikiProps.TITLE,
      "Wiki title length should be between 1 and 30 characters"
    ).isLength({
      min: 1,
      max: 100,
    }),
  ];
})();
