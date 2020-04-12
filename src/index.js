import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

/*
The Square component renders a single <button>
and the Board renders 9 squares.
The Game component renders a board with placeholder values
*/


// Square component that renders individual square of the board
class Square extends React.Component {
    render() {
        return (
            <button className="square">
                {this.props.value}
            </button>
        );
    }
}

// Board component that renders individual squares
class Board extends React.Component {
    renderSquare(i) {
        return <Square value={i}/>;
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