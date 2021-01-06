import { Request, Response, NextFunction, Application } from "express";
import Controller from "../controllers/jonasC";

export default class Jonas {
  public controller: Controller = new Controller();

  public routes(app: Application): void {
    app
      .route("/api")
      .post(async (req: Request, res: Response, next: NextFunction) => {
        this.log(req);
        console.log("req");
        console.log(req.body);
        next();
      }, this.controller.add)
      .get(async (req: Request, res: Response, next: NextFunction) => {
        this.log(req);
        console.log("req");
        console.log(req.body);
        next();
      }, this.controller.get)
      .delete(async (req: Request, res: Response, next: NextFunction) => {
        this.log(req);
        next();
      }, this.controller.del)
      .patch(async (req: Request, res: Response, next: NextFunction) => {
        this.log(req);
        next();
      }, this.controller.upd);

    app
      .route("/api/:ID")
      .get(async (req: Request, res: Response, next: NextFunction) => {
        this.log(req);
        console.log(req.body);
        
        next();
      }, this.controller.getO)
      .delete(async (req: Request, res: Response, next: NextFunction) => {
        this.log(req);
        next();
      }, this.controller.delO)
      .patch(async (req: Request, res: Response, next: NextFunction) => {
        this.log(req);
        
        console.log("req");
        console.log(req.query);
        
        next();
      }, this.controller.updO);
  }

  public log(req: Request): void {
    console.log(
      `\u001b[34m[${req.method}]\u001b[0m on ${
        req.originalUrl
      } at ${new Date().toLocaleTimeString()}`
    );
  }
}
