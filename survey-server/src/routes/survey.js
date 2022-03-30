import express from "express";
import SurveyController from "../controllers/surveyController";
import SurveyResultController from "../controllers/surveyResultController";

const router = express.Router();
/**
 *
 * @param {Container} container
 * @return {Router}
 */
export default (container) => {
    /**
     * @var {SurveyController} surveyController
     */
    const surveyController = container.make(SurveyController.name);

    /**
     * @var {SurveyResultController} surveyResultController
     */
    const surveyResultController = container.make(SurveyResultController.name);

    router.get("/", surveyController.index);
    router.get("/:surveyId", surveyController.findById);
    router.post("/", surveyController.create);
    router.post('/:surveyId/result', surveyResultController.create);
    router.get('/:surveyId/result', surveyResultController.findBySurveyId);
    router.get('/:surveyId/result/:resultId', surveyResultController.findById);

    return router;
}
