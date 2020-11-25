import jwt from "jsonwebtoken";
import authConfig from "../config/auth";

// jwt token generator
const generateToken = (params = {}) => {
  return jwt.sign(params, authConfig.secret, {
    expiresIn: 86400,
  });
};

export default generateToken;
