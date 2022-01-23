import React, { Component } from "react";
import './RuleRow.css'

class RuleRow extends Component {
    render () {
        const {score, name, doScore, desc} = this.props;
        const RuleRowStatus = score === undefined;
        return (
            <tr className={`RuleRow RuleRow-${RuleRowStatus ? 'active' : 'disabled'}`} onClick={RuleRowStatus && !this.props.disable ? doScore : null} disable={this.props.disable}>
                <td className='RuleRow-name'>{name}</td>
                <td className='RuleRow-score'>{RuleRowStatus ? desc : score}</td>
            </tr>
        );
    };
}

export default RuleRow;