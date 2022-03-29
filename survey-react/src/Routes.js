import {Component} from "react";
import {BrowserRouter as Router, Routes, Route, Link} from "react-router-dom";

import {SurveyFormPage, SurveyListPage, SurveyCreatePage} from "./page/Survey";
import {ResultListPage, ResultViewPage} from "./page/Result";

class RouteComponent extends Component {
    render() {
        return (
            <Router>
                <div>
                    <nav className="navbar navbar-expand-lg navbar-light bg-light">
                        <div className="container-fluid">
                            <a className="navbar-brand" href="/">
                                Survey Creator
                            </a>
                            <button className="navbar-toggler" type="button" data-toggle="collapse"
                                    data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                                    aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"></span>
                            </button>
                            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/survey">설문지</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/survey/create">설문지 만들기</Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </nav>
                    <Routes>
                        <Route exact path="/" element={<SurveyListPage/>}/>
                        <Route path="/survey/:surveyId/result/:resultId" element={<ResultViewPage/>}/>
                        <Route path="/survey/:surveyId/result" element={<ResultListPage/>}/>
                        <Route path="/survey/create" element={<SurveyCreatePage/>}/>
                        <Route path="/survey/:surveyId" element={<SurveyFormPage/>}/>
                        <Route path="/survey" element={<SurveyListPage/>}/>
                    </Routes>
                </div>
            </Router>
        )
    }
}

export default RouteComponent;
