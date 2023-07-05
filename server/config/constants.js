const NODE_ENV = process.env.NODE_ENV;
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_SECRET_ID = process.env.GOOGLE_SECRET_ID;
const GOOGLE_CALLBACK_URL = process.env.GOOGLE_CALLBACK_URL;
const CLIENT_HOME_PAGE_URL = process.env.CLIENT_HOME_PAGE_URL;
const DB_USERNAME = process.env.DB_USERNAME;
const DB_PASSWORD = process.env.DB_PASSWORD;
const JWT_SECRET = process.env.JWT_SECRET;
const SESSION_SECRET = process.env.SESSION_SECRET;
const REDIRECT_SUCCESS_PAGE = process.env.REDIRECT_SUCCESS_PAGE;

module.exports = {
  NODE_ENV,
  GOOGLE_CALLBACK_URL,
  GOOGLE_SECRET_ID,
  CLIENT_HOME_PAGE_URL,
  GOOGLE_CLIENT_ID,
  DB_USERNAME,
  DB_PASSWORD,
  JWT_SECRET,
  SESSION_SECRET,
  REDIRECT_SUCCESS_PAGE,
};
