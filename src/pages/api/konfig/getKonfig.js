import konfigModel from "@/schema/configurModel";
const { default: mongoDBConnect } = require("@/lib/mongodb_con");

mongoDBConnect();
export default async function handler(req, res) {
  const { method } = req;
  if (method === "GET") {
    try {
      const Konfig = await konfigModel.find().populate("idCourse");
      return res.json(Konfig);
    } catch (error) {
      return res.status(501).json({ message: error.message });
    }
  }
  res.setHeader("Allow", ["GET"]);
  return res.status(406).json({ message: `Method ${method} tidak diizinkan` });
}
