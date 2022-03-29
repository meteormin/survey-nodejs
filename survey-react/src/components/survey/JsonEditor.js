import React, {Component} from "react";
import ace from "ace-builds";
import 'ace-builds/webpack-resolver';
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-json";
import "ace-builds/src-noconflict/theme-github";
import 'bootstrap';
import {LOCAL_STORAGE_KEY} from "../../config";

const defaultValue = {
    title: "Title",
    description: "Description",
    logoPosition: "right",
    pages: [
        {
            "name": "page1",
            "elements": [
                {
                    "type": "text",
                    "name": "question1"
                }
            ]
        }
    ]
};

function getLastUpdateValue() {
    let value = window.localStorage.getItem(LOCAL_STORAGE_KEY);

    if (value) {
        return value;
    } else {
        return JSON.stringify(defaultValue, null, 4);
    }
}

class JsonEditor extends Component {

    static defaultProps = {
        defaultValue: getLastUpdateValue(),
        handleChange: (newValue) => {
            window.localStorage.setItem(LOCAL_STORAGE_KEY, newValue);
            console.log('change ' + newValue);
        },
        width: "100%",
        height: "500px"
    }

    constructor(props) {
        super(props);

        if(this.props.defaultValue){
            window.localStorage.setItem(LOCAL_STORAGE_KEY, this.props.defaultValue);
        } else{
            this.props.defaultValue = getLastUpdateValue();
        }


    }

    render() {
        return <AceEditor
            mode="json"
            theme="github"
            onChange={this.props.handleChange}
            defaultValue={this.props.defaultValue}
            name="UNIQUE_ID_OF_DIV"
            width={this.props.width}
            height={this.props.height}
            editorProps={{$blockScrolling: true}}
        />
    }
}

export default JsonEditor

