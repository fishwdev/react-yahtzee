import React, { Component } from "react";
import './Die.css';

class Die extends Component {
    static defaultProps = {
        numString: ['one', 'two', 'three', 'four', 'five', 'six'],
        val: Math.floor(Math.random() * 6) + 1
    }
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.props.handleClick(this.props.idx);
    }

    render() {
        const { numString, locked, val, disabled, rolling } = this.props;
        let digitString = numString[val - 1];
        let dice = `Die fas fa-dice-${digitString} fa-5x `;
        if (locked) dice += 'Die-locked ';
        if (rolling) dice += 'Die-rolling ';
        return (
            <i
                className={dice}
                onClick={this.handleClick}
                disabled={disabled}
            >
            </i>
        );
    }
}

export default Die;