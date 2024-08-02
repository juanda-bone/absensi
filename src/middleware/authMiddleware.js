import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader) {
    return res.status(401).json({ message: "Lagi ngapain nyoba nyobaa" });
  }
  const token = authHeader.split(" ")[1];

  console.log(token == process.env.AUTH_API);
  console.log(`${token} == ${process.env.AUTH_API}`);
  if (token == process.env.AUTH_API) {
    next();
  } else {
    res.status(406).json({ message: "kamu mau ngapain lagii" });
  }
};

export default authMiddleware;
