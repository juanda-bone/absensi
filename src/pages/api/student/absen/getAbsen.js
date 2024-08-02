import studentModel from "@/schema/studentModel";

const { default: mongoDBConnect } = require("@/lib/mongodb_con");

mongoDBConnect();
export default async function handler(req, res) {
  const { method } = req;
  const { id } = req.query;
  if (method === "GET") {
    try {
      const student = await studentModel.findById(id);
      if (!id) {
        return res.status(403).json({ message: "Lengkapi Id" });
      }
      if (!student) {
        return res.status(404).json({ message: "Student tidak ditemukan" });
      }
      return res.status(200).json(student.kehadiran);
    } catch (error) {
      return res.status(501).json({ message: error.message });
    }
  }

  res.setHeader("Allow", ["GET"]);
  return res.status(406).json({ message: `Method ${method} tidak diizinkan` });
}
