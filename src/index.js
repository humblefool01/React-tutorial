import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { func } from 'prop-types';

/*
The Square component renders a single <button>
and the Board renders 9 squares.
The Game component renders a board with placeholder values
*/

function Square(props) {
    return (
        <button className="square"
            onClick={props.onClick}>
            {props.value}
        </button>
    );
}


/*
To collect data from multiple children, or to have two child components communicate with each other,
you need to declare the shared state in their parent component instead. 
The parent component can pass the state back down to the children by using props; 
this keeps the child components in sync with each other and with the parent component.
*/

// Board component that renders individual squares
class Board extends React.Component {

    renderSquare(i) {
        return (<Square 
            value={this.props.squares[i]}
            onClick={() => this.props.onClick(i)}
                />);
    }
    render() {
        
        return (
            <div>
                <div className="board-row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className="board-row">
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className="board-row">
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
            </div>
        );
    }
}

// Game component 
class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            history:  [{
                squares: Array(9).fill(null),
            }],
            stepNumber: 0,
            turnX: true,
        };
    }
    handleClick(i) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        /*
        we call .slice() to create a copy of the squares array to modify instead of modifying the existing array. 
        */
        
        if (calculateWinner(squares) || squares[i]) {
            return;
        }
        squares[i] = this.state.turnX ? 'X' : 'O';
        this.setState({
            history: history.concat([{
            squares: squares,
            }]),
            stepNumber: history.length,
            turnX: !this.state.turnX,
        });
    }

    jumpTo(step) {
        this.setState({
            stepNumber: step,
            turnX: (step % 2) == 0,
        })
    }

    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winner = calculateWinner(current.squares);
        let status;
        
        const moves = history.map((step, move) => {
            const desc = move ? 'Go to move #' + move : 'Go to start';
            return (
                <li key={move}>
                    <button onClick = {() => this.jumpTo(move)}>{desc}</button>
                </li>
            );
        });

        if (winner) {
            status = 'Winner: ' + winner; 
        }else {
            status = 'Next player: ' + (this.state.turnX ? 'X' : 'O');
        }

        return (
            <div className="game">
                <div className="game-board">                
                <Board
                    squares = {current.squares} 
                    onClick = {(i) => this.handleClick(i)}
                />
                </div>
                <div className="game-info">     
                    <div>{status}</div>                        
                    <ol>{moves}</ol>                    
                </div>
            </div>
        );
    }
}

// DOM renderer
ReactDOM.render(
    <Game />, 
    document.getElementById('root')
);

function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    for (let i=0; i<lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] == squares[b] && squares[a] == squares[c]) {
            return squares[a];
        }
    }
    return null;
}