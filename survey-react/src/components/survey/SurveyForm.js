import {Component} from 'react';
import {LOCALE, SERVER_URL} from "../../config";
import 'survey-react/modern.min.css';
import {Survey, StylesManager, Model} from 'survey-react';
import Card from "../layouts/Card";
import Base from "../layouts/Base";
import axios from "axios";

StylesManager.applyTheme("modern");

class SurveyForm extends Component {
    static defaultProps = {
        locale: LOCALE,
        surveyId: 0
    }

    constructor(props) {
        super(props);
        this.state = {
            model: new Model({})
        }
    }

    componentDidMount() {
        this.getDataFromApi(this.props.surveyId);
    }

    handleComplete = (sender) => {
        const surveyId = this.props.surveyId;
        console.log(JSON.stringify(sender.data));
        axios.post(`${SERVER_URL}/api/survey/${surveyId}/result`, {
            data: sender.data
        })
            .then((res) => {
                console.log('created survey result: ' + res.data.id);
                window.location.href = `/survey/${this.props.surveyId}/result/${res.data.id}`;
            });
    }

    getDataFromApi = (surveyId) => {
        axios.get(`${SERVER_URL}/api/survey/${surveyId}`)
            .then((res) => {
                console.log('get survey json: ' + JSON.stringify(res.data));
                const model = new Model(res.data.survey_json);
                model.locale = this.props.locale;
                model.onComplete.add(this.handleComplete);

                this.setState({
                    model: model
                });
            });
    }

    render() {
        return (
            <Base>
                <Card header="설문지">
                    <Survey model={this.state.model}/>
                </Card>
            </Base>
        );
    }
}

export default SurveyForm
