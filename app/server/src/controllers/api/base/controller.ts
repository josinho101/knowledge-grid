import express, { Router } from "express";

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
}

export default Controller;
