import mongoose from "mongoose";
import { Request, Response } from "express";
import schema from "../models/jonasM";
import { EWOULDBLOCK } from "constants";

//? Mit ér ott az a string?
const model = mongoose.model("JB", schema);

export default class Controller {
  //- GET, POST simán
  //*GET
  public all(req: Request, res: Response): void {
    const fields = Object.keys(model.schema.obj);
    //. Limit
    let limit = req.query._limit ? parseInt(req.query._limit.toString()) : 0;
    delete req.query._limit;
    //. Page
    if (req.query._page && limit === 0) limit = 10;
    const page = (req.query._page ? parseInt(req.query._page.toString()) - 1 : 0) * limit;
    delete req.query._page;
    //. Where (gte, lte)
    //.     Start és end
    //.     id_gte _lte nagyobb, kisebb, nem egyenlő
    //!     MAJD
    //. Select
    const select = req.query._ ? req.query._.toString().split(",").join(" ") : "";
    delete req.query._;
    //. Sort
    //. asc-növekvő; desc-csökkenő --> -1 csökk, 1 nő
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
    //? Ha olyat ír, amivel nem lehet mit kezdeni, azt figyelmen kívül hagyja + "null"-ból null
    for (var key in req.query) {
      if (!fields.includes(key) && key !== "_id") delete req.query[key];
      else if (req.query[key] === "null") {
        filters = { ...filters, [key]: null };
        delete req.query[key];
      }
    }
    filters = { ...filters, ...req.query };

    console.log(filters);
    //. Group by -- Aggregate
    //. ! jel --> !=
    //. Ha egyenlőség van és 1 a limit akkor mi legyen?!
    //? more=true ? ?Filter, !Skip, Limit, Sort, ?Select
    model
      .find(filters)
      .skip(page)
      .limit(limit)
      .sort(sort)
      .select(select)
      .exec((err, data) => (err ? res.send(err) : res.json(data)));
  }
  //*POST
  public add(req: Request, res: Response): void {
    const newC = new model(req.body);
    newC.save((err, data) =>
      err
        ? res.json({ status: "Error", msg: err.message })
        : res.json({ status: "Success", msg: data.id })
    );
  }

  //- PATCH, DELETE id-ra
  //* GET, hogy ?_id helyett / is lehessen
  //*DELETE
  //*PATCH
}
