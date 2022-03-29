import SurveyList from '../components/survey/SurveyList'
import SurveyForm from "../components/survey/SurveyForm";
import {useParams} from "react-router-dom";
import EditView from "../components/survey/EditView";
import {DEFAULT_JSON, LOCAL_STORAGE_KEY, LOCALE} from "../config";

export const SurveyListPage = () => {
    const params = useParams();

    return <SurveyList/>
};

export const SurveyCreatePage = () => {
    const params = useParams();

    return <EditView
        defaultValue={DEFAULT_JSON}
        localStorageKey={LOCAL_STORAGE_KEY}
    />
};

export const SurveyFormPage = () => {
    const params = useParams();

    return <SurveyForm
        surveyId={params.surveyId}
        locale={LOCALE}
    />
};
