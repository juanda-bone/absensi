import kehadiranSchema from "./kehadiranModel";

import { Schema, model, models } from "mongoose";

const studentSchema = new Schema({
  nim: { type: String, required: true },
  nama: { type: String, required: true },
  kehadiran: [kehadiranSchema],
});

const studentModel = models.Student || model("Student", studentSchema);
export default studentModel;
