import {Component} from "react";

class Card extends Component {

    static defaultProps = {
        header: ''
    }

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="card">
                <div className="card-header">
                    {this.props.header}
                </div>
                <div className="card-body">
                    {this.props.children}
                </div>
            </div>
        )
    }
}

export default Card;
