import mysql from "mysql2";

class SurveyResult {
    _table = 'survey_result';
    _attributes = {
        id: null,
        survey_id: null,
        result: null,
        created_at: null,
        updated_at: null
    }

    /**
     * @param {mysql.Pool} connection
     * @param {Object} result
     */
    constructor(connection, result) {
        this._connection = connection;
        this.mapAttributes(result);
    }

    /**
     *
     * @param {Object} result
     */
    mapAttributes(result) {
        this._attributes = {
            id: result?.id || null,
            survey_id: result?.surveyId || null,
            result: result?.result || null,
            created_at: result?.createdAt || null,
            updated_at: result?.updated_at || null,
        };
    }

    /**
     *
     * @param {string} key
     * @param {*} value
     * @returns {SurveyResult}
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

    async findAll() {
        try {
            const [rows, fields] = await this._connection.query(`SELECT * FROM ${this._table}`);

            return rows.map((row) => {
                row.result = JSON.parse(row.result);
                return row;
            }).reverse();
        } catch (err) {
            return err;
        }
    }

    /**
     *
     * @param {int} id
     * @returns {Promise<[(RowDataPacket[][] | RowDataPacket[] | OkPacket | OkPacket[] | ResultSetHeader), FieldPacket[]]|*>}
     */
    async findById(id) {
        try {
            const [rows, fields] = await this._connection.query(
                `SELECT * FROM ${this._table} WHERE id = ?`,
                id
            );

            const first = rows[0];
            first.result = JSON.parse(first.result);

            return first;
        } catch (err) {
            return err;
        }
    }

    /**
     *
     * @param {int} surveyId
     * @returns {Promise<[(RowDataPacket[][] | RowDataPacket[] | OkPacket | OkPacket[] | ResultSetHeader), FieldPacket[]]|*>}
     */
    async findBySurveyId(surveyId) {
        try {
            const [rows, fields] = await this._connection.query(
                `SELECT * FROM ${this._table} WHERE survey_id = ?`,
                surveyId
            );

            return rows.map((row) => {
                row.result = JSON.parse(row.result);
                return row;
            }).reverse();

        } catch (err) {
            return err;
        }
    }

    /**
     *
     * @param {Object} result
     * @returns {Promise<[(RowDataPacket[][] | RowDataPacket[] | OkPacket | OkPacket[] | ResultSetHeader), FieldPacket[]]|*>}
     */
    async create(result) {
        this.mapAttributes(result);
        const now = new Date();
        this.setAttribute('created_at', now);
        this.setAttribute('updated_at', now);
        try {
            const [rows, fields] = await this._connection.query(
                `INSERT INTO ${this._table} SET ?`,
                this._attributes
            );

            const first = rows[0];
            first.result = JSON.parse(first.result);
            return first;
        } catch (err) {
            return err;
        }
    }
}

export default SurveyResult;