import { Schema, model, models } from "mongoose";

const configSchema = new Schema({
  idCourse: {
    type: Schema.Types.ObjectId,
    ref: "Course",
    required: true,
  },
  token: {
    type: String,
    required: true,
  },
  start: {
    type: String,
    required: true,
  },
  end: {
    type: String,
    required: true,
  },
});

const konfigModel = models.Config || model("Config", configSchema);
export default konfigModel;
