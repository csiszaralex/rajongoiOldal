import mongoose from "mongoose";
import { Request, Response } from "express";
import schema from "../models/jonasM";

//? Mit ér ott az a string?
const model = mongoose.model("JB", schema);

export default class Controller {
  //- GET, POST simán
  //*GET
  public all(req: Request, res: Response): void {
    const fields = Object.keys(model.schema.obj);
    //. Limit
    const limit = req.query.limit ? parseInt(req.query.limit.toString()) : 0;
    delete req.query.limit;
    //. Page
    //? lehessen e limit nélkül, mondjuk akkor 10 a limit
    const page = (req.query.page ? parseInt(req.query.page.toString()) - 1 : 0) * limit;
    delete req.query.page;
    //. Where (gte, lte)
    //.     Start és end
    //.     id_gte _lte _ne nagyobb, kisebb, nem egyenlő
    //!     MAJD
    //. Select
    const select = req.query._ ? req.query._.toString().split("|").join(" ") : "";
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
    //? Ha olyat ír, amivel nem lehet mit kezdeni, azt figyelmen kívül hagyja
    for (var key in req.query) if (!fields.includes(key) && key !== "_id") delete req.query[key];
    filters = { ...req.query };

    console.log(filters);
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
    newC.save((err, data) => (err ? res.send(err) : res.json(data)));
  }

  //- PATCH, DELETE id-ra
  //* GET, hogy ?_id helyett / is lehessen
  //*PATCH
  //*DELETE
}
