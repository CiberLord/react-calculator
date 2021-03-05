import React from 'react';

class Button extends React.Component{
    constructor(props){
        super(props);

    }

    render(){
        return (
            <button
                className={"button "+this.props.spec_style}
                onPointerDown={this.props.ontouchDown}
                onPointerUp={this.props.ontouchUp}
             >
                 {this.props.value}
            </button>
        )
    }
}

export default Button;