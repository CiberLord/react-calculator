import React from 'react';

class Display extends React.Component{
    constructor(props){
        super(props);

    }

    render(){
        return (
            <div className="display">
                <div className="current-val">{this.props.value}</div>
                <div className="expression">{this.props.exp}</div>
            </div>
        )
    }
}

export default Display;