import mongoDBConnect from "@/lib/mongodb_con";
import studentModel from "@/schema/studentModel";

mongoDBConnect();
export default async function asynchandler(req, res) {
  const { method } = req;
  if (method === "POST") {
    try {
      const newStudent = await new studentModel(req.body);
      newStudent.save();
      return res
        .status(201)
        .json({ message: `Student ${req.body.nama} berhasil di tambahkan` });
    } catch (error) {
      return res.status(501).json(error);
    }
  }
  res.setHeader("Allow", ["POST"]);
  return res.status(406).json({ message: `Method ${method} tidak diizinkan` });
}
