// middle ware for all protected routes , checks if the incoming token is valid or not

import jwt from "jsonwebtoken";
import { userModel } from "../models/user.model.js";

const authMiddleware = async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return res.status(401).json({
      message: "Unathorized access-Login first",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await userModel.findOne({ _id: decoded.id });

    req.user=user; //setting user in req body whic will be passed on to the controller
    next(); //this calls the controller
  } catch (e) {
    return res.status(501).json({
      message: e.message,
    });
  }
};

export { authMiddleware };
