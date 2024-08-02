import konfigModel from "@/schema/configurModel";

const { default: mongoDBConnect } = require("@/lib/mongodb_con");

mongoDBConnect();
export default async function handler(req, res) {
  const { method } = req;
  if (method === "PUT") {
    try {
      const { id } = req.body;
      const updateData = req.body;
      const updatedConfig = await konfigModel.findOneAndUpdate(
        { _id: id },
        updateData,
        { new: true }
      );

      if (!updatedConfig) {
        return res.status(404).json({ message: "Config not found" });
      }

      return res
        .status(200)
        .json({ message: "Config updated successfully", data: updatedConfig });
    } catch (error) {
      return res.status(501).json({ message: error.message });
    }
  }
  res.setHeader("Allow", ["PUT"]);
  return res.status(405).json({ error: `Method ${method} Not Allowed` });
}
