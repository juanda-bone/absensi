import userModel from "@/schema/userModel";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
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
      const user = await userModel.findOne({ username });
      if (user && (await bcrypt.compare(password, user.password))) {
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
          expiresIn: "4d",
        });

        return res.json({
          message: "Login successful",
          token,
          user: {
            username: user.username,
            password: user.password,
          },
        });
      } else {
        return res
          .status(401)
          .json({ message: `Username dan password tidak cocok` });
      }
    } catch (error) {
      return res.status(406).json({ message: error.message });
    }
  }
  res.setHeader("Allow", ["POST"]);
  return res.status(406).json({ message: `Method ${method} tidak diiznkan` });
}
