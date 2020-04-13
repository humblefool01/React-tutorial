import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { func } from 'prop-types';

/*
The Square component renders a single <button>
and the Board renders 9 squares.
The Game component renders a board with placeholder values
*/


// Square component that renders individual square of the board
// class Square extends React.Component {
//     // All React component classes that have a constructor should start with a super(props) call.
//     constructor(props) {
//         super(props);
//         this.state = {
//             value: null,
//         };
//     }

//     /*
//     By calling this.setState from an onClick handler in the Square’s render method, 
//     we tell React to re-render that Square whenever its <button> is clicked. 
//     After the update, the Square’s this.state.value will be 'X', 
//     so we’ll see the X on the game board. If you click on any Square, an X should show up.
//     */
//     render() {
//         return (
//             <button className="square" 
//                 onClick={() => this.props.onClick()}
//             >
//                 {this.props.value}
//             </button>
//         );
//     }
// }

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
    constructor(props) {
        super(props);
        this.state = {
            squares: Array(9).fill(null),
            turnX: true,
        };
    }
    handleClick(i) {
        /*
        we call .slice() to create a copy of the squares array to modify instead of modifying the existing array. 
        */
        const squares = this.state.squares.slice(); 
        if (calculateWinner(squares) || squares[i]) {
            return;
        }
        squares[i] = this.state.turnX ? 'X' : 'O';
        this.setState({
            squares: squares,
            turnX: !this.state.turnX,
        });
    }
    renderSquare(i) {
        return (<Square value={this.state.squares[i]}
                onClick={() => this.handleClick(i)}
                />);
    }
    render() {
        
        const winner = calculateWinner(this.state.squares);
        let status;
        if (winner) {
            status = 'Winner ' + winner;
        }else {
            status = 'Next player: ' + (this.state.turnX ? 'X' : 'O');
        }        

        return (
            <div>
                <div className="status">{status}</div>
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
    render() {
        return (
            <div className="game">
                <div className="game-board">
                    <Board />
                </div>
                <div className="game-info">
                    <div> </div>
                    <div> </div>
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