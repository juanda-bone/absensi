import { Schema } from "mongoose";
import courseModel from "./courseModel";
const kehadiranSchema = new Schema({
  course: {
    type: Schema.Types.ObjectId,
    ref: "Course",
    required: true,
  },
  timestamp: { type: String, required: true },

  absen: { type: String, required: true },
  message: { type: String, required: false },
});
export default kehadiranSchema;
