import Container from "./container";
import config from "../configs";
import DB from "./database";
import SurveyController from "../controllers/surveyController";
import Survey from "../models/survey";
import SurveyResult from "../models/surveyResult";
import SurveyResultController from "../controllers/surveyResultController";

const c = new Container({
    dbConfig: config.database
});

c.resolve(DB.name, DB, ['dbConfig']);
c.resolve(Survey.name, Survey, [DB.name]);
c.resolve(SurveyController.name, SurveyController, [Survey.name]);

c.resolve(SurveyResult.name, SurveyResult, [DB.name]);
c.resolve(SurveyResultController.name, SurveyResultController, [Survey.name, SurveyResult.name]);

export const container = () => {
    return c;
};