import Survey from "../models/survey";
import express from "express";
// const controller = () => {};

// const index = (req, res, next) => {
//     console.log(Survey.connection);

//     survey.findById(1, (err, result) => {
//         if (err) {
//             res.send(err);
//             return;
//         }

//         res.send(result);
//     });
// };

// const findById = () => {};

// export { index, findById };

class SurveyController {
    /**
     *
     * @param {Survey} model
     */
    constructor(model) {
        this._model = model;
    }

    /**
     *
     * @param {express.Request}req
     * @param {express.Response} res
     * @param next
     */
    index = (req, res, next) => {
        this._model.findAll()
            .then((rows) => {
                res.json(rows);
            })
            .catch((err) => {
                console.log(err);
                next();
            });
    };

    /**
     *
     * @param {express.Request}req
     * @param {express.Response} res
     * @param next
     */
    findById = (req, res, next) => {
        this._model.findById(req.params.surveyId)
            .then((row) => {
                res.json(row);
            })
            .catch((err) => {
                console.log(err);
                next();
            });
    }

    /**
     *
     * @param {express.Request}req
     * @param {express.Response} res
     * @param next
     */
    create(req, res, next) {
        this._model.create(req.body)
            .then((row) => {
                res.json(row);
            })
            .catch((err) => {
                console.log(err);
                next();
            });
    }
}

export default SurveyController;
