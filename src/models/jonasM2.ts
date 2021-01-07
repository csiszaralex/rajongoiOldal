import mongoose from "mongoose";

const schemaOptions: mongoose.SchemaOptions = {
  collection: "JB",
  versionKey: false,
};

const breakfastSchema = new mongoose.Schema({
  eggs: {
    type: Number,
    min: [6, "Too few eggs"],
    max: 12,
  },
  bacon: {
    type: Number,
    required: [true, "Why no bacon?"],
  },
  drink: {
    type: String,
    enum: ["Coffee", "Tea"],
    required(this: any) {
      return this.bacon > 3;
    },
    // validate(this: any, value: any) {},
  },
});

const schema: mongoose.Schema = new mongoose.Schema(
  {
    options: {
      // required: true,
      required() {
        return tipus == 0;
      },
    },
    tipus: {
      default: 0,
      required: true,
      type: Number,
      min: 0,
      max: 3,
    },
    // eggs: {
    //   type: Number,
    //   min: [6, 'Too few eggs'],
    //   max: 12
    // },
    cim: {
      type: String,
      required: true,
      unique: true,
      validate: /^(?=\s*\S).*$/,
    },
    hossz: {
      type: Number,
      min: 0,
      set: Math.round, //? Íráskor
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
    votes: {
      default: 0,
      required: true,
      type: Number,
      min: 0,
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
