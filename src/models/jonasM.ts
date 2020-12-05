import mongoose from "mongoose";

const schemaOptions: mongoose.SchemaOptions = {
  collection: "JB",
  versionKey: false,
};

const schema: mongoose.Schema = new mongoose.Schema(
  {
    tipus: {
      default: 0,
      required: true,
      type: Number,
      min: 0,
      max: 3,
    },
    cim: {
      type: String,
      required: true,
      unique: true,
      validate: /^(?=\s*\S).*$/,
    },
    hossz: {
      type: Number,
      min: 0,
      get: Math.round, //? Amikor az értéke beállítódik az kell
    },
    kt: {
      type: String,
    },
    kiadas: {
      type: Number,
      required: true,
      min: 1990,
      max: new Date().getFullYear(),
    },
    kiado: {
      type: String,
    },
  },
  schemaOptions
);

export default schema;
