import { Request, Response, NextFunction, Application } from "express";
import Controller from "../controllers/jonasC";

export default class Jonas {
  public controller: Controller = new Controller();

  public routes(app: Application): void {
    app
      .route("/api")
      .get(async (req: Request, res: Response, next: NextFunction) => {
        console.log(`${req.method} request on ${req.originalUrl} at ${new Date().toLocaleTimeString()}`);
        next();
      }, this.controller.all)
      .post((req: Request, res: Response, next: NextFunction) => {
        console.log(
          `${req.method} request on ${req.originalUrl} at ${new Date().toLocaleTimeString()}`
        );
        next();
      }, this.controller.add);
  }
}
