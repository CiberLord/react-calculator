import React from 'react';
import '../styles/calc-style.less';
import Button from './Button.jsx';
import Display from './Display.jsx';

class Calculator extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            displayValue: '0',//значение отображаемое на дисплее
            exp: "0", //выражение
            inputState: 1,
            isNum: true
        }
        this.oper = false;
        this.drob = false;
        this.zero = false;
        // список значений кнопок
        this.vals = [
             'CE', '/', 'x',
            '1', '2', '3', '-',
            '4', '5', '6', '+',
            '7', '8', '9', '=',
            '0', '.'
        ];

        this.ontouchUp = this.ontouchUp.bind(this);
        this.ontouchDown = this.ontouchDown.bind(this);
    }

    ontouchDown(event) {
        event.target.classList.add('button-active');
    }

    ontouchUp(event) {
        event.target.classList.remove('button-active');
        let val = event.target.textContent;
        let result = this.state.displayValue.slice(0, this.state.displayValue.length);
        let exp = this.state.exp.slice(0, this.state.exp.length);
        let isNum = this.state.isNum;

        if(exp==="limit") exp="0";
        if(exp==Infinity){
            exp="0";
            result="0";
        }
        switch (val) {
            case "CE": {
                console.log("clear");

                result = "0";
                exp = "0";
                break;
            }
            case "=": {
                console.log("equal");

                let tmp = eval(exp);
                if (tmp != undefined) {
                    result = "" + tmp;
                    if(result.length>12){
                        result=result.slice(0,11);
                    }
                    exp = "" + result;
                    isNum = true;
                } else {
                    console.log("input error");
                }

                break;
            }
            case "+":
            case "-":
            case "x":
            case "/": {
                console.log("oper");

                result = val;
                let op=exp[exp.length-1];
                console.log(op)
                isNum=false;
                if(op==="+"||op==="-"||op==="/"||op==="*")
                    exp=exp.slice(0,exp.length-1)+((val === "x") ? "*" : val);
                else
                    exp += ((val === "x") ? "*" : val);

                break;
            }
            case ".": {
                console.log('drob');
                if (isNum) {
                    if (result.indexOf(".") < 0) {
                        result += val;
                        exp += val;
                    }
                }
                break;
            }
            case "0": {
                if (isNum) {
                    if (result !== "0") {
                        result += val;
                        exp += val;
                    }
                }else{
                    isNum=true;
                    result=val;
                    if(exp!=="0") exp+=val;
                }
                break;
            }
            default: {
                console.log("nubmers");

                if (!isNum) {
                    result = val;
                    if (exp === "0") exp = val;
                    else exp += val;
                    isNum = true;
                }
                else {
                    if (result === "0") {
                        result = val;
                        exp = val;
                    } else {
                        result += val;
                        if (exp === "0") exp = val;
                        else exp += val;
                        isNum = true;
                    }
                }
                break;
            }
        };
        if(result.length>=15){
            result="0";
            exp="limit";
        }
        this.setState({
            displayValue: result,
            exp: exp,
            isNum: isNum
        })
    }

    render() {

        //создание списка кнопок
        let btnList = [];
        for (let e of this.vals) {
            let spec = "";
            if (e === 'CE') spec = "red-button";
            if (e === '0') spec = 'zero-button';
            if (e === '=') spec = 'equal-button'
            btnList.push((<Button value={e} spec_style={spec} ontouchDown={this.ontouchDown} ontouchUp={this.ontouchUp} />));
        }

        return (
            <div className="calc">
                <Display value={this.state.displayValue} exp={this.state.exp} />
                <div className="buttons-grid">
                    {btnList}
                </div>
            </div>
        )
    }
}

export default Calculator;