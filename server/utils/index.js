import { createJWT, isTokenValid, attachCookiesToResponse } from "./jwt.js";
import createTokenUser from "./createTokenUser.js";
import checkPermission from "./checkPermission.js";
import sendVerificationEmail from "./sendVerificationEmail.js";
import createHash from "./createHash.js";
import sendResetPasswordEmail from "./sendResetPasswordEmail.js";

export default {
  createJWT,
  isTokenValid,
  attachCookiesToResponse,
  createTokenUser,
  checkPermission,
  sendVerificationEmail,
  createHash,
  sendResetPasswordEmail,
};
