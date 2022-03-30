import Container from "./container";
import config from "../configs";
import DB from "./database";
import SurveyController from "../controllers/surveyController";
import Survey from "../models/survey";
import SurveyResult from "../models/surveyResult";
import SurveyResultController from "../controllers/surveyResultController";
import Application from "../app";
import logger from "morgan";
import express from "express";
import cookieParser from "cookie-parser";
import path from "path";
import cors from "cors";
import indexRouter from "../routes";
import surveyRouter from "../routes/survey";

/**
 * @param {Application} container
 */
export const containerRegister = (container) => {
    if (container instanceof Container) {
        container.register('config.app', config.app);

        container.register('config.db', config.database);

        container.resolve(DB.name, DB, ['config.db']);

        container.resolve(Survey.name, Survey, [DB.name]);

        container.resolve(SurveyController.name, SurveyController, [Survey.name]);

        container.resolve(SurveyResult.name, SurveyResult, [DB.name]);

        container.resolve(SurveyResultController.name, SurveyResultController, [
            Survey.name,
            SurveyResult.name
        ]);

        return;
    }

    throw new Error('parameter is not Application');
}

/**
 *
 * @param {Application} container
 */
export const middlewareRegister = (container) => {
    if (container instanceof Application) {
        container.app.use(logger("dev"));
        container.app.use(express.json());
        container.app.use(express.urlencoded({extended: false}));
        container.app.use(cookieParser());
        container.app.use(express.static(path.join(__dirname, "../public")));
        container.app.use(cors());

        return;
    }

    throw new Error('parameter is not Application');
}

/**
 *
 * @param {Application} container
 */
export const routerRegister = (container) => {
    if (container instanceof Application) {
        // routes
        container.app.use("/", indexRouter);
        container.app.use("/api/survey", surveyRouter);

        return;
    }

    throw new Error('parameter is not Application');
}