import mongoose from "mongoose";
import { Request, Response } from "express";
import schema from "../models/jonasM";

//? Mit ér ott az a string?
const model = mongoose.model("JS", schema);

export default class Controller {
  //- GET, POST simán
  //*GET
  public all(req: Request, res: Response): void {
    console.log("C");
    model.find({}, (err, data) => (err ? res.send(err) : res.json(data)));
    console.log("D");
    
  }
  //*POST
  public add(req: Request, res: Response): void {
    const newC = new model(req.body);
    newC.save((err, data) => (err ? res.send(err) : res.json(data)));
  }

  //- GET, PATCH, DELETE id-ra
  //*GET
  //*PATCH
  //*DELETE
}
