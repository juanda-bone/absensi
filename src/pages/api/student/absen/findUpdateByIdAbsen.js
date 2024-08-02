import mongoDBConnect from "@/lib/mongodb_con";
import studentModel from "@/schema/studentModel";

mongoDBConnect();

export default async function handler(req, res) {
  const { method } = req;
  authMiddleware(req, res, async () => {
    if (method === "PUT") {
      try {
        const { idStudent, idKehadiran, course, absen, timestamp, message } =
          req.body;

        if (!idStudent || !idKehadiran || !course || !absen || !timestamp) {
          return res
            .status(400)
            .json({ message: "Please fill all the fields" });
        }

        const student = await studentModel.findById(idStudent);
        if (!student) {
          return res.status(404).json({
            message: `Student dengan id ${idStudent} tidak ditemukan`,
          });
        }

        const kehadiranIndex = student.kehadiran.findIndex(
          (k) => k._id.toString() === idKehadiran
        );
        if (kehadiranIndex === -1) {
          return res.status(404).json({
            message: `Kehadiran dengan id ${idKehadiran} tidak ditemukan`,
          });
        }

        // Simpan nilai _id sebelum melakukan pembaruan
        const currentKehadiranId = student.kehadiran[kehadiranIndex]._id;

        // Perbarui dokumen kehadiran tanpa mengubah _id
        student.kehadiran[kehadiranIndex] = {
          _id: currentKehadiranId,
          course,
          absen,
          timestamp,
          message,
        };

        await student.save();
        return res
          .status(200)
          .json({ message: `Kehadiran berhasil diperbarui` });
      } catch (error) {
        return res.status(501).json({ message: error.message });
      }
    }

    res.setHeader("Allow", ["PUT"]);
    return res
      .status(406)
      .json({ message: `Method ${method} tidak diizinkan` });
  });
}
