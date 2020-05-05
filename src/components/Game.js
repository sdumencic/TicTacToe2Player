import React, { Component } from 'react'
import Matrix from "./Matrix";

export default class Game extends Component {
    constructor(props) {
        super(props);
        this.state = {
            x: true,
            stepNumber: 0,
            history: [{squares: Array(9).fill(null)}]            
        }
    }
    jumpTo = (step) => {
        this.setState({
            stepNumber: step,
            x: (step%2) === 0
        })
    }

    handleClick = (i) => {
        const history = this.state.history.slice(0, this.state.stepNumber+1);
        const current = history[history.length-1];
        const squares = current.squares.slice();
        const winner = calculateWinner(squares);
        if(winner || squares[i]) {
            return;
        }
        squares[i] = this.state.x ? 'X' : 'O';
        this.setState({
            history: history.concat({
                squares: squares
            }),
            x: !this.state.x,
            stepNumber: history.length
        })
    }
    
    
    
    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winner = calculateWinner(current.squares);
        const moves = history.map((step, move) => {
            const desc = move ? 'Go to #' + move : 'Start the Game';
            return (
                <li key = {move}>
                    <button className = {desc === 'Start the Game' ? "startGame" : "moves"} onClick = {() => {this.jumpTo(move)}}> {desc} </button>
                </li>
            )
        });
        let status;
        if(winner) {
            status = "Winner is: " + winner;
        } else {
            status = "Next Player is: " + (this.state.x ? 'X' : 'O');
        }

        return (
            <div className = "game">
                <div className="game-board">
                    <Matrix onClick = {(i) => this.handleClick(i)}
                    squares = {current.squares}/>
                </div>
                <div className = "status">{status}</div>
                <div className = "game-info">
                    {/*<div className = "status">{status}</div>*/}
                    <ul className = "moves2">{moves}</ul>
                </div>
            </div>
        )
    }
}

const calculateWinner = (squares) => {
    const lines = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];
    
    for(let i = 0; i < lines.length; ++i) {
        const[a, b, c] = lines[i];
        if(lines[i] && squares[a] === squares[b] && squares[b] === squares[c]) {
            return squares[a];
        }
    }
    return null;
}