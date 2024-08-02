const { default: mongoDBConnect } = require("@/lib/mongodb_con");
import konfigModel from "@/schema/configurModel";

mongoDBConnect();
export default async function handler(req, res) {
  const { method } = req;
  if (method === "POST") {
    const { idCourse, token, start, end } = req.body;
    if (!idCourse || !token || !start || !end) {
      return res.status(400).json({ message: "Please fill all the fields" });
    }
    try {
      const addConfig = await new konfigModel(req.body);
      addConfig.save();
      return res.status(201).json({ message: "Config added successfully" });
    } catch (error) {
      return res.status(501).json({ message: error.message });
    }
  }
  res.setHeader("Allow", ["POST"]);
  return res.status(406).json({ message: `Method ${method} tidak diizinkan` });
}
