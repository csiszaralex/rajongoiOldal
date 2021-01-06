import mongoose from "mongoose";
import { Request, Response } from "express";
import schema from "../models/jonasM";

//? Mit ér ott az a string?
const model = mongoose.model("JB", schema);

export default class Controller {
  //- POST, GET, DELETE, Patch simán
  //? Delete és update szűrővel? .where
  //*POST
  public add(req: Request, res: Response): void {
    const newC = new model(req.body);
    newC.save((err, data) => {
      if (err) {
        res.status(400);
        res.json({ status: "Error", msg: err.message });
      } else {
        res.status(201);
        res.json({ status: "POST successful", msg: data.id });
      }
    });
  }
  //*GET
  public get(req: Request, res: Response): void {
    const fields = Object.keys(model.schema.obj);
    //. Limit
    let limit = req.query._limit ? parseInt(req.query._limit.toString()) : 0;
    delete req.query._limit;
    //. Page
    if (req.query._page && limit === 0) limit = 10;
    const page = (req.query._page ? parseInt(req.query._page.toString()) - 1 : 0) * limit;
    delete req.query._page;
    //. Select
    const select = req.query._ ? req.query._.toString().split(",").join(" ") : "";
    delete req.query._;
    //. Sort
    let sort = {};

    for (let key in req.query) {
      key = key === "__id" ? "_id" : key.split("_")[1];
      if (fields.includes(key) || key === "_id") {
        sort = { ...sort, [key]: req.query["_" + key] };
        delete req.query["_" + key];
      }
    }

    //. Filter
    let filters = {};
    for (var key in req.query) {
      if (!fields.includes(key) && key !== "_id") delete req.query[key];
      else if (req.query[key] === "null") {
        filters = { ...filters, [key]: null };
        delete req.query[key];
      }
    }

    filters = { ...filters, ...req.query };
    model
      .find(filters)
      .skip(page)
      .limit(limit)
      .sort(sort)
      .select(select)
      .exec((err, data) => {
        if (err) {
          res.status(400);
          res.json({ status: "Error", msg: "Bad request" });
        } else res.json(data);
      });
  }
  //*DELETE
  public del(req: Request, res: Response): void {
    const fields = Object.keys(model.schema.obj);
    let filters = {};
    for (var key in req.query) {
      if (!fields.includes(key) && key !== "_id") delete req.query[key];
    }
    filters = { ...filters, ...req.query };
    if (Object.entries(filters).length === 0) {
      res.status(400);
      res.json({ status: "Error", msg: "You can't delete every data" });
    } else {
      model.deleteMany(filters).exec((err, data) => {
        if (err) {
          res.status(400);
          res.json({ status: "Error", msg: "Bad request" });
        } else res.json({ status: "DELETE successful", msg: data.n });
      });
    }
  }
  //*PATCH
  public upd(req: Request, res: Response): void {    
    const fields = Object.keys(model.schema.obj);
    let filters = {};
    for (var key in req.query) {
      if (!fields.includes(key) && key !== "_id") delete req.query[key];
    }
    filters = { ...filters, ...req.query };

    const options: mongoose.QueryOptions = {
      new: true, // return the modified document
      runValidators: true, // runs update validators on this command
    };
    if (Object.entries(filters).length === 0) {
      res.status(400);
      res.json({ status: "Error", msg: "You can't update every data" });
    } else {
      model.updateMany(filters, req.body, options).exec((err, data) => {
        if (err) {
          res.status(400);
          res.json({ status: "Error", msg: err.message });
        } else {
          res.status(201);
          res.json({ status: "UPDATE successful", msg: data.n });
        }
      });
    }
  }

  //- GET, DELETE, PATCH id-ra
  //* GET
  public getO(req: Request, res: Response): void {
    //. Select
    const select = req.query._ ? req.query._.toString().split(",").join(" ") : "";
    delete req.query._;

    model
      .findById(req.params.ID)
      .select(select)
      .exec((err, data) => {
        if (err) {
          res.status(400);
          res.json({ status: "Error", msg: "Bad request" });
        } else res.json(data);
      });
  }
  //*DELETE
  public delO(req: Request, res: Response): void {
    model.deleteOne({ _id: req.params.ID }).exec((err, data) => {
      if (err) {
        res.status(400);
        res.json({ status: "Error", msg: "Bad request" });
      } else res.json({ status: "DELETE successful", msg: data.n });
    });
  }
  //*PATCH
  public updO(req: Request, res: Response): void {
    const options: mongoose.QueryOptions = {
      new: true, // return the modified document
      runValidators: true, // runs update validators on this command
    };
    console.log("query");
    console.log(req.body);
    res.json(req.body);
    // model
    //   .findById(req.params.ID)
    //   .updateOne({}, req.body, options)
    //   .exec((err, data) => {
    //     if (err) {
    //       res.status(400);
    //       res.json({ status: "Error", msg: err.message });
    //     } else {
    //       res.status(201);
    //       res.json({ status: "UPDATE successful", msg: data.n });
    //     }
    //   });
  }
}
