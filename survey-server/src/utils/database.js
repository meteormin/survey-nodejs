import mysql from "mysql2";

export default (dbConfig) => {
    try {
        const pool = mysql.createPool(dbConfig);

        return pool.promise();
    } catch (err) {
        console.log(err);
        return null;
    }
};
