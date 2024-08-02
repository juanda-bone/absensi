// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import authMiddleware from "@/middleware/authMiddleware";

export default function handler(req, res) {
  authMiddleware(req, res, async () => {
    return res.json({ message: "halooo semuaa" });
  });
}
