import mongoDBConnect from "@/lib/mongodb_con";
import courseModel from "@/schema/courseModel";

mongoDBConnect();
export default async function handler(req, res) {
  const { method } = req;
  if (method === "GET") {
    try {
      const getCourses = await courseModel.find()
      return res.json(getCourses);
    } catch (error) {
      return res.status(501).json(error);
    }
  }
  res.setHeader("Allow", ["GET"]);
  return res.status(405).json({ message: `Method ${method} tidak di izinkan` });
}
