import mongoDBConnect from "@/lib/mongodb_con";
import authMiddleware from "@/middleware/authMiddleware";
import studentModel from "@/schema/studentModel";

mongoDBConnect();
export default async function handler(req, res) {
  const { method } = req;
  const { nim } = req.query;
  authMiddleware(req, res, async () => {
    if (method === "GET") {
      try {
        if (!nim) {
          return res.status(400).json({ message: "NIM tidak boleh kosong" });
        }
        const student = await studentModel
          .findOne({ nim })
          .populate("kehadiran.course");
        if (!student) {
          return res
            .status(404)
            .json({ message: `Student dengan nim ${nim} tidak ditemukan` });
        }
        console.log("this runn");
        return res.json(student);
      } catch (error) {
        return res.status(501).json({ message: error.message });
      }
    }
    res.setHeader("Allow", ["GET"]);
    return res
      .status(406)
      .json({ message: `Method ${method} tidak di izinkannn` });
  });
}
