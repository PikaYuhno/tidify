export const FORGOT_PW_PREFIX = "forgotPassword:";
export const SESSION_USERID_PREFIX = "userIds:";
export const SESSION_PREFIX = "sess:"
export const CONFIRMATION_CODE_PREFIX = "confirmCode:";
// @todo add production ip 
export const CLIENT_HOST = process.env.NODE_ENV === "production" ? "http://localhost" : "http://localhost:3000";
