import { check } from "express-validator";

export const UserProps = {
  FIRSTNAME: "firstname",
  LASTNAME: "lastname",
  EMAIL: "email",
  PASSWORD: "password",
};

export const updateValidator = (() => {
  return [check(UserProps.FIRSTNAME, "Firstname is required").not().isEmpty()];
})();

export const registrationValidator = (() => {
  return [
    check(UserProps.FIRSTNAME, "Firstname is required").not().isEmpty(),
    check(UserProps.EMAIL, "Please provide a valid email id").isEmail(),
    check(
      UserProps.PASSWORD,
      "Please enter a password with minimum of 6 characters"
    ).isLength({ min: 6 }),
  ];
})();

export const loginValidator = (() => {
  return [
    check(UserProps.EMAIL, "Please provide a valid email id").isEmail(),
    check(UserProps.PASSWORD, "Password can't be empty").exists(),
  ];
})();
