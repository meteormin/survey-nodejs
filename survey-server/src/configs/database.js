import env from "dotenv";

env.config();

export default {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    timezone: process.env.TZ,
    dateStrings: "date"
};
