import { Schema, model, models } from "mongoose";

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    required: true,
    type: String,
  },
});

const userModel = models.User || model("User", userSchema);
export default userModel;
