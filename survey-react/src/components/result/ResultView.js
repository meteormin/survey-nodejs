import {Component} from "react";
import Card from "../layouts/Card";
import Base from "../layouts/Base";
import axios from "axios";
import {SERVER_URL} from "../../config";

class ResultView extends Component {

    static defaultProps = {
        surveyId: 0,
        resultId: 0
    };

    state = {
        resultData: {},
        surveyName: '',
        resultId: 0,
        result: {}
    }

    getResultData = (surveyId, resultId) => {
        axios.get(`${SERVER_URL}/api/survey/${surveyId}/result/${resultId}`)
            .then((res) => {
                console.log(JSON.stringify(res.data));
                this.setState({
                    resultData: res.data,
                    result: res.data.result.result,
                    resultId: res.data.result.id,
                    surveyName: res.data.survey.survey_name
                });
            }, (err) => {

            });
    }

    componentDidMount() {
        this.getResultData(this.props.surveyId, this.props.resultId);
    }

    render() {
        return (
            <Base>
                <Card
                    header={`${this.state.surveyName} 설문 결과 응답 ${this.state.resultId}`}>
                    <pre>{JSON.stringify(this.state.result, null, 2)}</pre>
                </Card>
            </Base>
        )
    }
}

export default ResultView;
