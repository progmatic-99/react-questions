import { useState } from "react"

const initalBoard = () => Array(9).fill(null)

export default function TicTacToe() {
  const {board, handleClick, reset, getStatusMessages} = useBoard()

  return (
    <div className="game">
      <p>{getStatusMessages()}</p>
      <button onClick={reset}>Reset Game</button>
      <div className="board">
      {
        board.map((b, idx) => {
          return (<button key={idx} disabled={b !== null} onClick={() => handleClick(idx)} className="cell">{b}</button>)
        })
      }
      </div>
    </div>
  )
}

function useBoard() {
  const [board, setBoard] = useState(initalBoard())
  const [isXTurn, setIsXTurn] = useState(true)

  const handleClick = (index) => {
    const result = winner(board)
    if (board[index] || result) return;
    const newBoard = [...board];
    newBoard[index] = isXTurn ? 'X' : 'O'
    setBoard(newBoard)
    setIsXTurn(!isXTurn)
  }

  const WINNING_PATTERNS = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,4,8],
    [2,4,6],
    [0,3,6],
    [1,4,7],
    [2,5,8]
  ]

  const reset = () => {
    setBoard(initalBoard)
    setIsXTurn(true)
  }

  const winner = (board) => {
    for (let i=0; i<WINNING_PATTERNS.length; ++i) {
      const [a, b, c] = WINNING_PATTERNS[i]
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a]
      }
    }
    return null
  }

  const getStatusMessages = () => {
    const result = winner(board)
    if (result) return `Player ${result} wins!!`
    if (!board.includes(null)) return `It's a draw!!`
    return `Player ${isXTurn ? 'X' : 'O'} turn!!`
  }

  return {
    board,
    handleClick,
    reset,
    getStatusMessages
  }
}