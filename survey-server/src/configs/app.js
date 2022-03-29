import env from "dotenv";
env.config();

export default {
    env: process.env.APP_ENV || process.env.NODE_ENV,
    name: process.env.APP_NAME || "express",
    url: process.env.APP_URL || "http://localhost",
    port: process.env.APP_PORT || 3000,
    timezone: process.env.TZ,
    locale: 'ko'
};
