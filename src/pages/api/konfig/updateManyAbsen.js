import studentModel from "@/schema/studentModel";

const { default: mongoDBConnect } = require("@/lib/mongodb_con");

mongoDBConnect();
export default async function handler(req, res) {
  const { method } = req;
  if (method === "POST") {
    try {
      const { idCourse, timestamp } = req.body;
      const newKehadiran = {
        course: idCourse,
        timestamp,
        absen: "Alfa",
      };
      await studentModel.updateMany({}, { $push: { kehadiran: newKehadiran } });
      res.status(200).json({ message: "Attendance added to all students" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
  res.setHeader("Allow", ["POST"]);
  return res.status(406).json(`Method ${method} tidak diizinkan`);
}
