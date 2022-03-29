import express from "express";
import SurveyController from "../controllers/surveyController";
import SurveyResultController from "../controllers/surveyResultController";
import {container} from "../utils/register";


/**
 * @var {SurveyController} surveyController
 */
const surveyController = container().get(SurveyController.name);

/**
 * @var {SurveyResultController} surveyResultController
 */
const surveyResultController = container().get(SurveyResultController.name);

const router = express.Router();

router.get("/", surveyController.index);
router.get("/:surveyId", surveyController.findById);
router.post("/", surveyController.create);
router.post('/:surveyId/result', surveyResultController.create);
router.get('/:surveyId/result', surveyResultController.findBySurveyId);
router.get('/:surveyId/result/:resultId', surveyResultController.findById);

export default router;
