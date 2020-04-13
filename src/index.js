import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

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
        };
    }
    handleClick(i) {
        /*
        we call .slice() to create a copy of the squares array to modify instead of modifying the existing array. 
        */
        const squares = this.state.squares.slice(); 
        squares[i] = 'X';
        this.setState({squares: squares});
    }
    renderSquare(i) {
        return (<Square value={this.state.squares[i]}
                onClick={() => this.handleClick(i)}
                />);
    }
    render() {
        
        const status = 'Next player: X';

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