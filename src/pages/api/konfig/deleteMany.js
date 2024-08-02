import studentModel from "@/schema/studentModel";

const { default: mongoDBConnect } = require("@/lib/mongodb_con");

mongoDBConnect();
export default async function handler(req, res) {
  const { method } = req;
  if (method == "DELETE") {
    try {
      const result = await studentModel.updateMany(
        {},
        { $set: { kehadiran: [] } }
      );
      return res
        .status(200)
        .json({ message: "Semua kehadiran berhasil di reset" });
    } catch (error) {
      return res.status(501).json({ message: "Terjadi error di sisi server" });
    }
  }
  res.setHeader("Allow", ["DELETE"]);
  return res.status(406).json({ message: `Method ${method} tidak diiznikan` });
}
