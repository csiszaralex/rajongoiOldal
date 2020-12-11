import { Request, Response, NextFunction, Application } from "express";
import Controller from "../controllers/jonasC";

export default class Jonas {
  public controller: Controller = new Controller();

  public routes(app: Application): void {
    app
      .route("/api")
      .post(async (req: Request, res: Response, next: NextFunction) => {
        console.log(`${req.method} on ${req.originalUrl} at ${new Date().toLocaleTimeString()}`);
        next();
      }, this.controller.add)
      .get(async (req: Request, res: Response, next: NextFunction) => {
        console.log(`${req.method} on ${req.originalUrl} at ${new Date().toLocaleTimeString()}`);
        next();
      }, this.controller.get)
      .delete(async (req: Request, res: Response, next: NextFunction) => {
        console.log(`${req.method} on ${req.originalUrl} at ${new Date().toLocaleTimeString()}`);
        next();
      }, this.controller.del)
      .patch(async (req: Request, res: Response, next: NextFunction) => {
        console.log(`${req.method} on ${req.originalUrl} at ${new Date().toLocaleTimeString()}`);
        next();
      }, this.controller.upd);

    app
      .route("/api/:ID")
      .get(async (req: Request, res: Response, next: NextFunction) => {
        console.log(`${req.method} on ${req.originalUrl} at ${new Date().toLocaleTimeString()}`);
        next();
      }, this.controller.getO)
      .delete(async (req: Request, res: Response, next: NextFunction) => {
        console.log(`${req.method} on ${req.originalUrl} at ${new Date().toLocaleTimeString()}`);
        next();
      }, this.controller.delO)
      .patch(async (req: Request, res: Response, next: NextFunction) => {
        console.log(`${req.method} on ${req.originalUrl} at ${new Date().toLocaleTimeString()}`);
        next();
      }, this.controller.updO);
  }
}
