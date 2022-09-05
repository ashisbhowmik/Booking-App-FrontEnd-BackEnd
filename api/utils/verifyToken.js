import jwt from "jsonwebtoken";
import { handleError } from "./error.js";

export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) {
    return next(handleError(401, "Your are not authenticated"));
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return next(handleError(403, "Token is not valid !"));
    }
    req.user = user; // here we can write whatever req.llll/ bllaablla
    next();
  });
};

export const verifyUser = (req, res, next) => {
  verifyToken(req, res, () => {
    console.log(req.user.id);
    console.log(req.params.id);
    if (!req.user.isAdmin) {
      console.log("This user is not Admin");
    }
    if (req.user.isAdmin) {
      console.log("This user is a Admin");
    }
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      return next(handleError(403, "Your are not authorized"));
    }
  });
};
export const verifyAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      return next(handleError(403, "Your are not authorized"));
    }
  });
};
