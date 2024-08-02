import mongoDBConnect from "@/lib/mongodb_con";
import courseModel from "@/schema/courseModel";

mongoDBConnect();

export default async function handler(req, res) {
  const { method } = req;

  if (method === "GET") {
    const { id } = req.query; // Mengambil ID dari query parameter

    try {
      const course = await courseModel.findById(id);
      if (!course) {
        return res.status(404).json({ message: "Course tidak ditemukan" });
      }
      return res.status(200).json(course);
    } catch (error) {
      return res.status(501).json({ message: error.message });
    }
  }

  res.setHeader("Allow", ["GET"]);
  return res.status(405).json({ message: `Method ${method} tidak diizinkan` });
}
