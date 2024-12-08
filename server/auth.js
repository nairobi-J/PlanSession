import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../models/user.js";

const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer ")
  ) {
    // console.log("Token Found")
    try {
      token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // console.log(decoded);
      //  fetch i
      req.user = await User.findById(decoded.id).select("-password");

      next();
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error("Not authorized , token failed");
    }
  }
  if (!token) {
    res.status(401);
    throw new Error("Not Authorized Token");
  }
});

// const host = (req, res, next) => {
// if (req.user && req.user.isHost) {
// next();
// } else {
// res.status(401);
//  throw new Error("Not Authorized as an Admin");
// }
// };

export { protect };
