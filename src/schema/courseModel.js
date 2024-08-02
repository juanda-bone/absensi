import { Schema, model, models } from "mongoose";

const courseSchema = new Schema({
  mataKuliah: { type: String, required: true },
  dosen: { type: String, required: true },
  hari: { type: String, required: true },
  jam: { type: String, required: true },
});

const courseModel = models.Course || model("Course", courseSchema);
export default courseModel;
