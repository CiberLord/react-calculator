import ReactDOM from 'react-dom';
import React from 'react';
import Calculator from './components/Calculator.jsx';
import './styles/style.less';


ReactDOM.render(
    <div className="root"><Calculator /></div>,
    document.getElementById('root')
)