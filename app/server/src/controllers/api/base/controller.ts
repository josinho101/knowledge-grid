import Error from "../../../models/error";
import express, { Router, Request } from "express";
import { validationResult, ValidationError } from "express-validator";

abstract class Controller {
  public router: Router;

  /**
   * constructor of controller
   */
  constructor() {
    this.router = express.Router();
  }

  // map routes on controller
  protected abstract mapRoute(): void;

  // common function to validate the request and get errors
  protected validationResult = (req: Request) => {
    const errors = validationResult(req)
      .formatWith((error: ValidationError) => {
        return {
          message: error.msg,
          param: error.param,
          value: error.value,
        } as Error;
      })
      .array();

    return errors;
  };
}

export default Controller;
