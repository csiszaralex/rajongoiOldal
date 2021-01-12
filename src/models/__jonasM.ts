import mongoose from "mongoose";

const schemaOptions: mongoose.SchemaOptions = {
  collection: "JB",
  versionKey: false,
};

const schema: mongoose.Schema = new mongoose.Schema(
  {
    tipus: {
      type: Number,
      // default: [0, "A típus értéke kötelező, 0 lett az alapérték"],
      default: [0], //????
      min: [0, "A típus mezőnek legalább 0-nak kell lennie!"],
      max: [3, "A tpus mező maximum 3 lehet"],
    },
    cim: {
      type: String,
      required: [true, "A cím mező kötelező"],
      unique: [true, "Ilyen cím érték már szerepel az adatbázisban."],
      validate(this: any, value: any) {
        return value !== "";
      },
      get(val: string) {
        //. Nagykezdőbetűvel tér vissza
        return val.charAt(0).toUpperCase() + val.slice(1);
      },
    },
    hossz: {
      type: Number,
      min: [0, "A hossz nem lehet negatív szám"],
      set: Math.round, //? Íráskor egészre kerekítik
    },
    kt: {
      type: String,
      validate: [
        function (this: any, value: any) {
          return value === "-";
        },
        'A közreműködő nem lehet "-", ha nincs közreműködő, hagyja üresen a mezőt',
      ],
    },
    kiadas: {
      type: Number,
      required: [true, "A kiadas mező kötelező"],
      min: [1990, "A kiadás nem lehet az együttes megjelenése előtt"],
      max: [new Date().getFullYear(), "A kiadás nem lehet több, mint a jelenlegi év!"],
    },
    kiado: {
      type: String,
    },
    votes: {
      required: [true, "A votes mező kötelező"],
      default: [0, "A votes értéke hibás így alapértelmezetten 0 lett"],
      type: Number,
      min: [0, "A szavazatok száma nem lehet negatív"],
    },
  },
  schemaOptions
);

export interface IJonas {
  tipus: Number;
  cim: string;
  hossz?: Number;
  kt?: string;
  kiadas: Number;
  kiado?: String;
}

export default schema;
