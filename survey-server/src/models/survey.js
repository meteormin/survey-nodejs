import "core-js/stable";
import "regenerator-runtime/runtime";
import mysql from "mysql2";

// const survey = (survey) => {
//     this.id = survey.id;
//     this.survey_name = survey.surveyName;
//     this.survey_json = survey.surveyJsonl;
//     this.table = "survey";
// };

// survey.connection = new db(config.database);

// survey.handleResult = (err, result, callback) => {
//     if (err) {
//         callback(err, result);
//         return;
//     }

//     callback(null, result);
// };

// survey.create = (survey, res) => {
//     let now = new Date();
//     survey.created_at = now;
//     survey.updated_at = now;

//     this.connection.query(
//         `INSERT INTO ${this.table} SET ?`,
//         survey,
//         (err, result) => {
//             this.handleResult(err, result, res);
//         }
//     );
// };

// survey.findById = (id, res) => {
//     this.connection.query(
//         `SELECT * FROM ${this.table} WHERE id = ?`,
//         id,
//         (err, result) => {
//             this.handleResult(err, result, res);
//         }
//     );
// };

// export default survey;

class Survey {
    _table = "survey";
    _attributes = {
        id: null,
        survey_name: null,
        survey_json: null,
        created_at: null,
        updated_at: null,
    };

    /**
     *
     * @param {mysql.Pool} connection
     * @param {Object} survey
     */
    constructor(connection, survey = {}) {
        this._connection = connection;
        this.mapAttributes(survey);
    }

    /**
     *
     * @param {Object} survey
     */
    mapAttributes(survey) {
        this._attributes = {
            id: survey?.id || null,
            survey_name: survey?.surveyName || null,
            survey_json: survey?.surveyJson || null,
            created_at: survey?.createdAt || null,
            updated_at: survey?.updated_at || null,
        };
    }

    /**
     *
     * @param {string} key
     * @param {*} value
     * @returns {Survey}
     */
    setAttribute(key, value) {
        this._attributes[key] = value;
        return this;
    }

    /**
     *
     * @param key
     * @returns {*}
     */
    getAttribute(key) {
        return this._attributes[key];
    }

    /**
     *
     * @returns {Promise<[(RowDataPacket[][] | RowDataPacket[] | OkPacket | OkPacket[] | ResultSetHeader), FieldPacket[]]|*>}
     */
    async findAll() {
        try {
            const [rows, fields] = await this._connection.query(`SELECT * FROM ${this._table}`);

            return rows.map((row) => {
                let jsonStr = row.survey_json;
                row.survey_json = JSON.parse(jsonStr);

                return row;
            }).reverse();
        } catch (err) {
            return err;
        }
    }

    /**
     *
     * @param survey
     * @returns {Promise<[(RowDataPacket[][] | RowDataPacket[] | OkPacket | OkPacket[] | ResultSetHeader), FieldPacket[]]|*>}
     */
    async create(survey) {
        this.mapAttributes(survey);
        const now = new Date();
        this.setAttribute('created_at', now);
        this.setAttribute('updated_at', now);
        try {
            const [rows, fields] = await this._connection.query(
                `INSERT INTO ${this._table} SET ?`,
                this._attributes
            );

            const first = rows[0];
            first.survey_json = JSON.parse(first.survey_json);
            return first;
        } catch (err) {
            return err;
        }
    }

    /**
     *
     * @param id
     * @returns {Promise<[(RowDataPacket[][] | RowDataPacket[] | OkPacket | OkPacket[] | ResultSetHeader), FieldPacket[]]|*>}
     */
    async findById(id) {
        try {
            const [rows, fields] = await this._connection.query(
                `SELECT * FROM ${this._table} WHERE id = ?`,
                id
            );
            const first = rows[0];
            first.survey_json = JSON.parse(first.survey_json);
            return first;
        } catch (err) {
            return err;
        }
    }

}

export default Survey;
