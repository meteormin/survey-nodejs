import {Component} from "react";

class Base extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="row mt-5 justify-content-center">
                <div className="col-md-12">
                    {this.props.children}
                </div>
            </div>
        )
    }
}


export default Base;
