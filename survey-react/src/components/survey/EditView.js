import React, {Component} from "react";
import Card from "../layouts/Card";
import Base from "../layouts/Base";
import JsonEditor from "./JsonEditor";
import axios from "axios";
import {DEFAULT_JSON, LOCAL_STORAGE_KEY, SERVER_URL} from "../../config";

class EditView extends Component {

    static defaultProps = {
        defaultValue: DEFAULT_JSON,
        localStorageKey: LOCAL_STORAGE_KEY
    };

    state = {
        jsonData: null
    }

    componentDidMount() {
        let data = this.getDefaultData()

        if (data) {
            this.setState({
                jsonData: data
            });
        }
    }

    getDefaultData = () => {
        let data = window.localStorage.getItem(this.props.localStorageKey);
        if (!data) {
            return this.props.defaultValue;
        }

        return JSON.parse(data);
    }

    submit = () => {
        if (this.state.jsonData === null) {
            alert('JSON 형식의 데이터를 입력해주세요.');
            return;
        }

        axios.post(`${SERVER_URL}/api/survey`, {
            json: this.state.jsonData
        }).then((res) => {
            console.log(res);
            window.location.href = '/survey/' + res.data.id
        }, (error) => {
            console.log(error);
        });

    }

    handleChange = (newValue) => {

        console.log('change ' + newValue);
        try {
            this.setState({
                jsonData: JSON.parse(newValue)
            });

            window.localStorage.setItem(this.props.localStorageKey, newValue);
        } catch (e) {
            console.log(e);
        }
    }

    render() {
        return (
            <Base>
                <Card header="설문지 만들기">
                    <JsonEditor
                        defaultValue={JSON.stringify(this.getDefaultData(), null, 4)}
                        handleChange={this.handleChange}
                    />
                    <button className="btn btn-primary mt-3" onClick={this.submit}>설문지 만들기</button>
                </Card>
            </Base>
        )
    }
}

export default EditView

