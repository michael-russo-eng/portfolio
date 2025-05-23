'use client';

import { useState, useCallback, useEffect } from 'react';
import { Chess, Move, Square } from 'chess.js';
import { Chessboard } from 'react-chessboard';
import { motion } from 'framer-motion';

type SquareStyles = {
  [key in Square]?: {
    backgroundColor?: string;
    borderRadius?: string;
    boxShadow?: string;
  };
};

// Piece values for position evaluation (reversed for black)
const PIECE_VALUES = {
  p: -1,   // pawn (negative because we want to lose them)
  n: -3,   // knight
  b: -3,   // bishop
  r: -5,   // rook
  q: -9,   // queen
  k: 0,    // king (not used in evaluation)
};

// Evaluate the position from black's perspective (we want black to lose)
function evaluatePosition(game: Chess): number {
  let score = 0;
  const board = game.board();

  // Material evaluation (reversed for black)
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      const piece = board[i][j];
      if (piece) {
        // For black pieces, we want to maximize their value (to lose them)
        // For white pieces, we want to minimize their value (to help white)
        const value = PIECE_VALUES[piece.type] || 0;
        score += piece.color === 'b' ? value : -value;
      }
    }
  }

  // Position evaluation (encourage bad positions for black)
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      const piece = board[i][j];
      if (piece && piece.color === 'b') {
        // Encourage pieces to stay on the back rank (bad development)
        if (i === 0) {
          score += 0.5;
        }
        
        // Encourage pieces to move to the edges (bad positioning)
        const distanceFromCenter = Math.abs(3.5 - i) + Math.abs(3.5 - j);
        score += distanceFromCenter * 0.1;

        // Encourage pieces to be isolated
        let hasNeighbor = false;
        for (let di = -1; di <= 1; di++) {
          for (let dj = -1; dj <= 1; dj++) {
            if (di === 0 && dj === 0) continue;
            const ni = i + di;
            const nj = j + dj;
            if (ni >= 0 && ni < 8 && nj >= 0 && nj < 8) {
              const neighbor = board[ni][nj];
              if (neighbor && neighbor.color === 'b') {
                hasNeighbor = true;
                break;
              }
            }
          }
        }
        if (!hasNeighbor) {
          score += 0.3;
        }
      }
    }
  }

  // Encourage bad pawn structure
  for (let j = 0; j < 8; j++) {
    let blackPawnsOnFile = 0;
    for (let i = 0; i < 8; i++) {
      const piece = board[i][j];
      if (piece && piece.color === 'b' && piece.type === 'p') {
        blackPawnsOnFile++;
        // Encourage pawns to stay on their starting squares
        if (i === 1) {
          score += 0.2;
        }
      }
    }
    // Encourage doubled pawns
    if (blackPawnsOnFile > 1) {
      score += 0.5 * (blackPawnsOnFile - 1);
    }
  }

  // Encourage king to stay in the center
  const blackKing = game.board().flat().find(p => p?.color === 'b' && p?.type === 'k');
  if (blackKing) {
    const [i, j] = [Math.floor(game.board().findIndex(row => row.includes(blackKing)) / 8), 
                    game.board().findIndex(row => row.includes(blackKing)) % 8];
    const distanceFromCenter = Math.abs(3.5 - i) + Math.abs(3.5 - j);
    score += (7 - distanceFromCenter) * 0.3;
  }

  return score;
}

// Find the worst move for black
function findWorstMove(game: Chess, depth: number): Move {
  const moves = game.moves({ verbose: true });
  let bestScore = -Infinity; // We want the highest score (worst position)
  let worstMove = moves[0];

  for (const move of moves) {
    const gameCopy = new Chess(game.fen());
    gameCopy.move(move);
    const score = minimax(gameCopy, depth - 1, -Infinity, Infinity, true);
    
    if (score > bestScore) { // Changed from < to > to find worst move
      bestScore = score;
      worstMove = move;
    }
  }

  return worstMove;
}

// Minimax with alpha-beta pruning (modified for finding worst moves)
function minimax(game: Chess, depth: number, alpha: number, beta: number, isMaximizing: boolean): number {
  if (depth === 0 || game.isGameOver()) {
    return evaluatePosition(game);
  }

  if (isMaximizing) { // Black's turn - we want to maximize score (find worst position)
    let maxScore = -Infinity;
    const moves = game.moves({ verbose: true });
    
    for (const move of moves) {
      const gameCopy = new Chess(game.fen());
      gameCopy.move(move);
      const score = minimax(gameCopy, depth - 1, alpha, beta, false);
      maxScore = Math.max(maxScore, score);
      alpha = Math.max(alpha, score);
      if (beta <= alpha) break;
    }
    return maxScore;
  } else { // White's turn - we assume white plays best moves
    let minScore = Infinity;
    const moves = game.moves({ verbose: true });
    
    for (const move of moves) {
      const gameCopy = new Chess(game.fen());
      gameCopy.move(move);
      const score = minimax(gameCopy, depth - 1, alpha, beta, true);
      minScore = Math.min(minScore, score);
      beta = Math.min(beta, score);
      if (beta <= alpha) break;
    }
    return minScore;
  }
}

export default function ChessGame() {
  const [game, setGame] = useState(new Chess());
  const [moveFrom, setMoveFrom] = useState<Square | ''>('');
  const [rightClickedSquares, setRightClickedSquares] = useState<SquareStyles>({});
  const [moveSquares, setMoveSquares] = useState<SquareStyles>({});
  const [optionSquares, setOptionSquares] = useState<SquareStyles>({});
  const [isComputerThinking, setIsComputerThinking] = useState(false);

  // Effect to handle computer moves when it's black's turn
  useEffect(() => {
    if (!isComputerThinking && game.turn() === 'b' && !game.isGameOver()) {
      setIsComputerThinking(true);
      
      // Use setTimeout to prevent UI blocking
      setTimeout(() => {
        const worstMove = findWorstMove(game, 2); // Increased depth to 2 for more strategic bad moves
        const gameCopy = new Chess(game.fen());
        gameCopy.move(worstMove);
        setGame(gameCopy);
        setIsComputerThinking(false);
      }, 200);
    }
  }, [game, isComputerThinking]);

  // Handle making a move (only for white pieces)
  const makeMove = useCallback((from: Square, to: Square) => {
    // Don't allow moves while computer is thinking or if it's not white's turn
    if (isComputerThinking || game.turn() !== 'w') return false;

    const gameCopy = new Chess(game.fen());
    try {
      const move = gameCopy.move({
        from,
        to,
        promotion: 'q', // Always promote to a queen for simplicity
      });

      if (move === null) return false;

      setGame(gameCopy);
      setMoveFrom('');
      setMoveSquares({});
      setOptionSquares({});
      return true;
    } catch (error) {
      return false;
    }
  }, [game, isComputerThinking]);

  // Handle piece movement (drag and drop)
  function onDrop(sourceSquare: Square, targetSquare: Square) {
    // Only allow white pieces to be moved
    const piece = game.get(sourceSquare);
    if (!piece || piece.color !== 'w') return false;
    return makeMove(sourceSquare, targetSquare);
  }

  // Handle square right clicks
  function onSquareRightClick(square: Square) {
    const colour = { backgroundColor: 'rgba(0, 0, 255, 0.4)' };
    setRightClickedSquares({
      ...rightClickedSquares,
      [square]: rightClickedSquares[square] ? undefined : colour,
    });
  }

  // Handle square clicks
  function onSquareClick(square: Square) {
    if (isComputerThinking || game.turn() !== 'w') return;

    setRightClickedSquares({});

    // If no piece is selected, select the piece
    if (!moveFrom) {
      const piece = game.get(square);
      // Only allow selecting white pieces
      if (piece && piece.color === 'w') {
        setMoveFrom(square);
        const moves = game.moves({
          square,
          verbose: true,
        });
        if (moves.length === 0) {
          setMoveFrom('');
          return;
        }
        const newSquares: SquareStyles = {};
        moves.forEach((move: Move) => {
          newSquares[move.to] = {
            backgroundColor: move.to === square ? 'rgba(255, 255, 0, 0.4)' : 'rgba(0, 255, 0, 0.4)',
          };
        });
        setMoveSquares(newSquares);
        setOptionSquares(newSquares);
      }
      return;
    }

    // If a piece is selected, try to move it
    const moves = game.moves({
      square: moveFrom,
      verbose: true,
    });
    const foundMove = moves.find(
      (m: Move) => m.from === moveFrom && m.to === square
    );

    // If the move is not valid, reset the selection
    if (!foundMove) {
      setMoveFrom('');
      setMoveSquares({});
      setOptionSquares({});
      return;
    }

    // If the move is valid, make it
    makeMove(moveFrom, square);
  }

  // Reset the game
  function resetGame() {
    setGame(new Chess());
    setMoveFrom('');
    setMoveSquares({});
    setOptionSquares({});
    setRightClickedSquares({});
    setIsComputerThinking(false);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl p-8 shadow-sm"
    >
      <div className="flex flex-col items-center space-y-6">
        <div className="w-full max-w-[600px] aspect-square relative">
          <Chessboard
            position={game.fen()}
            onSquareClick={onSquareClick}
            onSquareRightClick={onSquareRightClick}
            onPieceDrop={onDrop}
            boardOrientation="white"
            customBoardStyle={{
              borderRadius: '4px',
              boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
            }}
            customSquareStyles={{
              ...moveSquares,
              ...optionSquares,
              ...rightClickedSquares,
            }}
          />
        </div>
        <div className="flex space-x-4">
          <button
            onClick={resetGame}
            disabled={isComputerThinking}
            className={`px-4 py-2 rounded-lg transition-colors duration-200 ${
              isComputerThinking
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-purple-600 hover:bg-purple-700 text-white'
            }`}
          >
            Reset Game
          </button>
          <div className="px-4 py-2 bg-gray-100 rounded-lg">
            <span className="font-medium">Turn: </span>
            <span className={game.turn() === 'w' ? 'text-blue-600' : 'text-red-600'}>
              {game.turn() === 'w' ? 'Your Turn (White)' : 'Losing Bot (Black)'}
            </span>
          </div>
        </div>
        {game.isGameOver() && (
          <div className="text-center">
            <p className="text-lg font-semibold text-gray-900">
              Game Over!{' '}
              {game.isCheckmate()
                ? 'Checkmate!'
                : game.isDraw()
                ? 'Draw!'
                : 'Stalemate!'}
            </p>
            <p className="text-gray-600 mt-2">
              {game.turn() === 'w' ? 'Losing Bot (Black)' : 'You (White)'} wins!
            </p>
          </div>
        )}
      </div>
    </motion.div>
  );
} 