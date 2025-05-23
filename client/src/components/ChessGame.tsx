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
      const possibleMoves = game.moves();
      const randomIndex = Math.floor(Math.random() * possibleMoves.length);
      const move = possibleMoves[randomIndex];

      setTimeout(() => {
        const gameCopy = new Chess(game.fen());
        gameCopy.move(move);
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
              {game.turn() === 'w' ? 'Your Turn (White)' : 'Computer (Black)'}
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
              {game.turn() === 'w' ? 'Computer (Black)' : 'You (White)'} wins!
            </p>
          </div>
        )}
      </div>
    </motion.div>
  );
} 