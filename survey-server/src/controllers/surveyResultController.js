import express from "express";
import Survey from "../models/survey";
import SurveyResult from "../models/surveyResult";

class SurveyResultController {
    /**
     * @param {Survey} survey
     * @param {SurveyResult} surveyResult
     */
    constructor(survey, surveyResult) {
        this._parentModel = survey;
        this._model = surveyResult;
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
    findBySurveyId = (req, res, next) => {
        const surveyId = parseInt(req.params.surveyId);

        this._model.findBySurveyId(surveyId)
            .then(async (row) => {
                const survey = await this._parentModel.findById(surveyId);
                res.json({
                    survey: survey,
                    results: row
                });
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
    findById = (req, res, next) => {
        const surveyId = parseInt(req.params.resultId);
        this._model.findById(surveyId)
            .then(async (row) => {
                const survey = await this._parentModel.findById(surveyId);
                res.json({
                    survey: survey,
                    result: row
                });
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
    create = (req, res, next) => {
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

export default SurveyResultController;