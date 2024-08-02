import userModel from "@/schema/userModel";
import bcrypt from "bcryptjs";

const { default: mongoDBConnect } = require("@/lib/mongodb_con");

mongoDBConnect();
export default async function handler(req, res) {
  const { method } = req;
  if (method === "POST") {
    try {
      const { username, password } = req.body;
      if (!username || !password) {
        return res.status(400).json({ message: "Please fill all the fields" });
      }
      const userExists = await userModel.findOne({ username });
      if (userExists) {
        return res.status(400).json({ message: "User already exists" });
      }
      const hashPassword = await bcrypt.hash(password, 10);
      const user = await userModel.create({
        username,
        password: hashPassword,
      });

      if (user) {
        return res
          .status(201)
          .json({
            message: "User created successfully",
            _id: user._id,
            username: user.username,
            password: user.password,
          });
      }
    } catch (error) {
      return res.status(501).json({ message: error.message });
    }
  }

  res.setHeader("Allow", ["POST"]);
  return res.json(406).json({ message: `Method ${method} tidak diizinkan` });
}
