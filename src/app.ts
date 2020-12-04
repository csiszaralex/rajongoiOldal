import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
//- Routes
import Jonas from "./routes/jonasR"; //. Ha több van akkor a Routes-ben más név kell a classnek, h ne akadjanaok össze

class App {
  public app: express.Application;
  public mongoUrl: string = process.env.MONGODB_URL || "mongodb://localhost/JBdb";
  //- Routes
  public jonasPrv: Jonas = new Jonas();

  constructor() {
    this.app = express();
    this.expressConfig();
    this.mongoSetup();
    //- Routes
    this.jonasPrv.routes(this.app);
  }

  private expressConfig(): void {
    this.app.use(bodyParser.urlencoded({ extended: false })); //. A x-www-from-urlencoded ot is elfogadja postanből
    this.app.use(bodyParser.json()); //. A json-t is elfogadja

    const corsOptions: cors.CorsOptions = {
      origin: "*", //. Honnét jöhet kérés
      methods: "GET,PATCH,POST,DELETE", //. Milyen metódus lehet
      preflightContinue: false,
      optionsSuccessStatus: 204,
    };
    this.app.use(cors(corsOptions));

    this.app.use(express.static("public")); //. Beállítja az alap mappát a /public-ra
  }
  private mongoSetup() {
    const options: mongoose.ConnectOptions = {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    };
    // require("mongoose").Promise = global.Promise;
    mongoose.connect(this.mongoUrl, options).catch(console.error);
  }
}

export default new App().app;
