import mongoDBConnect from "@/lib/mongodb_con";
import courseModel from "@/schema/courseModel";

mongoDBConnect();
export default async function handler(req, res) {
  const { method } = req;
  if (method === "POST") {
    try {
      const newCourse = await new courseModel(req.body);
      newCourse.save();
      return res.status(201).json({ message: "Course Berhasil di Tambahkan" });
    } catch (error) {
      return res.status(501).json({ message: error });
    }
  }

  res.setHeader("Allow", ["POST"]);
  return res.status(405).json({ message: `Method ${method} tidak di iznkan` });
}
