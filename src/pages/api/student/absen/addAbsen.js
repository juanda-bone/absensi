import mongoDBConnect from "@/lib/mongodb_con";
import studentModel from "@/schema/studentModel";

mongoDBConnect();
export default async function handler(req, res) {
  const { method } = req;
  if (method === "POST") {
    try {
      const { idStudent, course, absen, timestamp, message } = req.body;
      if (!idStudent || !course || !absen || !timestamp) {
        return res.status(400).json({ message: "Please fill all the fields" });
      }
      const student = await studentModel.findById(idStudent);
      if (!student) {
        return res
          .status(404)
          .json({ message: `Student dengan id ${idStudent} tidak ditemukan` });
      }

      student.kehadiran.push({ course, absen, timestamp, message });
      await student.save();
      return res
        .status(201)
        .json({ message: `Kehadiran berhasil ditambahkan` });
    } catch (error) {
      return res.status(501).json({ message: error.message });
    }
  }
  res.setHeader("Allow", ["POST"]);
  return res.status(406).json({ message: `Method ${method} tidak di izinkan` });
}
