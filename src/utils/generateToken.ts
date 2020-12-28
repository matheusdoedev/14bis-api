import jwt from 'jsonwebtoken';

import authConfig from '../config/auth';

// jwt sign token generator
const generateToken = (params = {}) => {
  const token = jwt.sign(params, authConfig.secret, {
    expiresIn: 86400,
  });

  return token ? token : null;
};

export default generateToken;
