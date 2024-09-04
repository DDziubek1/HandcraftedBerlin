import jwt from "jsonwebtoken";

export const authenticate = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) throw new Error("Token Not Found");

    const { _id, email, role } = jwt.verify(token, process.env.JWT_SECRET);

    req.user = { _id, email };
    
    next();
  } catch (error) {
    res.status(403).send(error.message);
  }
};

export default authenticate;
