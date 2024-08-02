import studentModel from "@/schema/studentModel";

const { default: mongoDBConnect } = require("@/lib/mongodb_con");

mongoDBConnect();
export default async function handler(req, res) {
  const { method } = req;
  const { id } = req.query;
  if (method === "GET") {
    try {
      const findById = await studentModel.findById(id).populate("kehadiran");

      if (!findById) {
        return res.status(404).json({ message: "Student tidak ditemukan" });
      }
      return res.status(200).json(findById);
    } catch (error) {
      return res.status(501).json(error);
    }
  }
  res.setHeader("Allow", ["GET"]);
  return res.status(406).json({ message: `Method ${method} tidak dizinkan` });
}
