import studentModel from "@/schema/studentModel";

const { default: mongoDBConnect } = require("@/lib/mongodb_con");

mongoDBConnect();
export default async function handler(req, res) {
  const { method } = req;
  if (method === "GET") {
    try {
      const students = await studentModel.find().populate("kehadiran.course");
      return res.json(students);
    } catch (error) {
      return res.status(501).json(error);
    }
  }
  res.setHeader("Allow", ["GET"]);
  return res.status(406).json({ message: `Method ${method} tidak dizinkan` });
}
