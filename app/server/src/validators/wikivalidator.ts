import { check } from "express-validator";

export const WikiProps = {
  PARENT_ID: "parentId",
  TYPE: "type",
  TITLE: "title",
};

export const createWikiValidator = (() => {
  return [
    check(WikiProps.PARENT_ID, "Parent wiki id is required").not().isEmpty(),
    check(WikiProps.TYPE, "Wiki type is required").not().isEmpty(),
    check(WikiProps.TITLE, "Wiki title is required").not().isEmpty(),
  ];
})();
