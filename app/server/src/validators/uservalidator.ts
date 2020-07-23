import { check } from "express-validator";

export const registrationValidator = (() => {
  return [
    check("firstname", "Firstname is required").not().isEmpty(),
    check("email", "Please provide a valid email id").isEmail(),
    check(
      "password",
      "Please enter a password with minimum of 6 characters"
    ).isLength({ min: 6 }),
  ];
})();

export const loginValidator = (() => {
  return [
    check("email", "Please provide a valid email id").isEmail(),
    check("password", "Password can't be empty").exists(),
  ];
})();
