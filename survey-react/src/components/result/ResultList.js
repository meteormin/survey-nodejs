import {Component} from "react";
import axios from "axios";
import Base from "../layouts/Base";
import Card from "../layouts/Card";
import {SERVER_URL} from "../../config";

const dtStyle = {
    borderTop: "1px solid #e8e8e8",
    color: "#000",
    margin: "9px 0 0 0",
    padding: "10px 0 0 0",
    fontSize: "18px",
    cursor: "pointer"
};

class ResultList extends Component {
    static defaultProps = {
        surveyId: 0
    };

    state = {
        data: []
    };

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        this.getResultBySurvey(this.props.surveyId);
    }

    getResultBySurvey = (surveyId) => {
        axios.get(`${SERVER_URL}/api/survey/${surveyId}/result`)
            .then((res) => {
                console.log(JSON.stringify(res.data));
                let surveyName = res.data.survey.survey_name;

                if (res.data.results.length === 0) {
                    this.setState({
                        data: <dt style={dtStyle}>
                            Not Found Data
                        </dt>
                    })
                } else {
                    this.setState({
                        data: res.data.results.map((item) => {
                            return (
                                <dt style={dtStyle} key={item.id}
                                    onClick={() => this.handleClick(item.id)}>{item.created_at} {surveyName}:
                                    결과 {item.id}</dt>
                            )
                        })
                    });
                }

            }, (err) => {
                console.log(JSON.stringify(err));
            });
    }

    handleClick = (resultId) => {
        window.location.href += `/${resultId}`;
    }

    render() {
        return (
            <Base>
                <Card header="설문지 결과">
                    <dl>
                        {this.state.data}
                    </dl>
                </Card>
            </Base>
        )
            ;
    }
}

export default ResultList;