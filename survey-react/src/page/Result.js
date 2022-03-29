import ResultView from "../components/result/ResultView";
import ResultList from "../components/result/ResultList";
import {useParams} from "react-router-dom";

export const ResultListPage = (props) => {
    const params = useParams();

    return <ResultList surveyId={params.surveyId}/>
};

export const ResultViewPage = (props) => {
    const params = useParams();

    return <ResultView
        surveyId={params.surveyId}
        resultId={params.resultId}
    />
};




