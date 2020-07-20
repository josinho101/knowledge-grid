import express from "express";
import { Application } from "express";

const configureMiddleware = (app: Application) => {
  app.use(express.json());
};

export default configureMiddleware;
