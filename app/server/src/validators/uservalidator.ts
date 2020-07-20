import { check } from "express-validator";

export const userRegistrationValidator = (() => {
  return [
    check("firstname", "Firstname is required").not().isEmpty(),
    check("email", "Please provide a valid email id").isEmail(),
    check(
      "password",
      "Please enter a password with minimum of 6 characters"
    ).isLength({ min: 6 }),
  ];
})();
