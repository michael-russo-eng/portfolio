'use client';

import { useState, useCallback, useEffect } from 'react';
import { Chess, Move, Square } from 'chess.js';
import { Chessboard } from 'react-chessboard';
import { motion } from 'framer-motion';
import ErrorMessage from './ErrorMessage';

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

// Add game phase detection
const GAME_PHASES = {
  OPENING: 0,    // First 10 moves
  MIDGAME: 1,    // Moves 11-20
  ENDGAME: 2,    // After move 20
};

// Piece movement priorities by game phase
const PIECE_MOVEMENT_PRIORITIES = {
  OPENING: {
    p: 2,    // Pawns get second priority in opening
    r: 3,    // Rooks get highest priority in opening
    n: 4,    // Knights get highest priority in opening
    b: 4,    // Bishops get highest priority in opening
    q: 0,    // Queen gets lowest priority
    k: 0,    // King not used in movement priority
  },
  MIDGAME: {
    p: 3,    // Pawns get highest priority in midgame
    r: 2,    // Rooks get second priority in midgame
    n: 1,    // Knights get third priority in midgame
    b: 1,    // Bishops get third priority in midgame
    q: 0,    // Queen gets lowest priority
    k: 0,    // King not used in movement priority
  },
  ENDGAME: {
    p: 2,    // Pawns get second priority in endgame
    r: 3,    // Rooks get highest priority in endgame
    n: 1,    // Knights get third priority in endgame
    b: 1,    // Bishops get third priority in endgame
    q: 4,    // Queen gets highest priority in endgame
    k: 0,    // King not used in movement priority
  },
};

// Time management constants
const MAX_SEARCH_TIME = 1000; // Maximum time to search in milliseconds
const MIN_DEPTH = 2;
const MAX_DEPTH = 5;
const TIME_PER_MOVE = 200; // Time to wait before making a move

// Add new type for tracking move history
type MoveHistory = {
  fen: string;
  piece: string;
  from: string;
  to: string;
  count: number;
  moveNumber: number;
};

// Add repetition tracking
type RepetitionTracker = {
  pieceMoves: { [key: string]: { from: string; to: string; count: number }[] };
  positionCounts: { [fen: string]: number };
  lastMoves: MoveHistory[];
};

// Get current game phase
function getGamePhase(game: Chess): number {
  const moveCount = game.history().length;
  if (moveCount <= 10) return GAME_PHASES.OPENING;
  if (moveCount <= 20) return GAME_PHASES.MIDGAME;
  return GAME_PHASES.ENDGAME;
}

// Evaluate the position from black's perspective (we want black to lose)
function evaluatePosition(game: Chess): number {
  let score = 0;
  const board = game.board();
  const history = game.history({ verbose: true });
  const gamePhase = getGamePhase(game);

  // Material evaluation (reversed for black)
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      const piece = board[i][j];
      if (piece) {
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
        // Strongly encourage back rank piece development in opening
        if (i === 0) {
          const pieceHistory = history.filter(move => 
            move.piece === piece.type && 
            move.color === 'b' && 
            move.from[1] === '8'
          );
          
          if (pieceHistory.length === 0) {
            // Extra high penalty for unmoved back rank pieces in opening
            if (gamePhase === GAME_PHASES.OPENING) {
              score += 2.0;
              // Additional penalty for specific pieces in opening
              if (piece.type === 'n') score += 1.0; // Knights
              if (piece.type === 'b') score += 1.0; // Bishops
              if (piece.type === 'r') score += 0.5; // Rooks
            } else {
              score += 1.0;
            }
          } else {
            score += 0.3;
          }
        }
        
        // Encourage pawns to move forward (but not too far)
        if (piece.type === 'p') {
          const distanceFromStart = 7 - i;
          if (distanceFromStart === 0) {
            score += gamePhase === GAME_PHASES.OPENING ? 1.0 : 1.5;
          } else if (distanceFromStart === 1) {
            score += 1.0;
          } else if (distanceFromStart === 2) {
            score += 0.5;
          }
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

// Initialize repetition tracker
function createRepetitionTracker(): RepetitionTracker {
  return {
    pieceMoves: {},
    positionCounts: {},
    lastMoves: [],
  };
}

// Check for repetitive piece movement
function isRepetitiveMove(tracker: RepetitionTracker, piece: string, from: string, to: string): boolean {
  if (!tracker.pieceMoves[piece]) {
    tracker.pieceMoves[piece] = [];
    return false;
  }

  const pieceHistory = tracker.pieceMoves[piece];
  
  // Check for back-and-forth movement
  if (pieceHistory.length >= 1) {
    const lastMove = pieceHistory[pieceHistory.length - 1];
    if (lastMove.from === to && lastMove.to === from) {
      return true;
    }
  }

  // Check for threefold repetition of the same move
  const sameMoveCount = pieceHistory.filter(
    move => move.from === from && move.to === to
  ).length;
  
  return sameMoveCount >= 2;
}

// Progressive deepening with time management
function findWorstMoveWithTimeManagement(game: Chess): Move {
  let bestMove: Move | null = null;
  const startTime = Date.now();
  const gamePhase = getGamePhase(game);
  
  // Initialize repetition tracker
  const tracker = createRepetitionTracker();
  
  // Get all possible moves
  const moves = game.moves({ verbose: true });
  
  // Sort moves by piece priority and piece type
  moves.sort((a, b) => {
    const pieceA = game.get(a.from);
    const pieceB = game.get(b.from);
    
    if (!pieceA || !pieceB) return 0;

    // Strongly penalize king moves unless in check
    const isInCheck = game.isCheck();
    if (!isInCheck) {
      if (pieceA.type === 'k' && pieceB.type !== 'k') return 1;
      if (pieceA.type !== 'k' && pieceB.type === 'k') return -1;
    }
    
    // Check for repetitive moves with the tracker
    const aIsRepetitive = isRepetitiveMove(tracker, pieceA.type, a.from, a.to);
    const bIsRepetitive = isRepetitiveMove(tracker, pieceB.type, b.from, b.to);
    if (aIsRepetitive !== bIsRepetitive) {
      return aIsRepetitive ? 1 : -1;
    }
    
    // First, prioritize unmoved back rank pieces
    const aIsBackRank = a.from[1] === '8';
    const bIsBackRank = b.from[1] === '8';
    if (aIsBackRank !== bIsBackRank) {
      if (gamePhase === GAME_PHASES.OPENING) {
        return aIsBackRank ? -2 : 2;
      }
      return aIsBackRank ? -1 : 1;
    }
    
    // Then, prioritize by piece movement priority based on game phase
    const priorityA = PIECE_MOVEMENT_PRIORITIES[gamePhase === GAME_PHASES.OPENING ? 'OPENING' : 
                                                gamePhase === GAME_PHASES.MIDGAME ? 'MIDGAME' : 
                                                'ENDGAME'][pieceA.type] || 0;
    const priorityB = PIECE_MOVEMENT_PRIORITIES[gamePhase === GAME_PHASES.OPENING ? 'OPENING' : 
                                                gamePhase === GAME_PHASES.MIDGAME ? 'MIDGAME' : 
                                                'ENDGAME'][pieceB.type] || 0;
    if (priorityA !== priorityB) {
      return priorityB - priorityA;
    }
    
    // Finally, prioritize captures and checks
    const aIsCapture = game.get(a.to) !== null;
    const bIsCapture = game.get(b.to) !== null;
    const gameCopyA = new Chess(game.fen());
    const gameCopyB = new Chess(game.fen());
    gameCopyA.move(a);
    gameCopyB.move(b);
    const aIsCheck = gameCopyA.isCheck();
    const bIsCheck = gameCopyB.isCheck();
    
    if (aIsCapture !== bIsCapture) return bIsCapture ? 1 : -1;
    if (aIsCheck !== bIsCheck) return bIsCheck ? 1 : -1;
    return 0;
  });

  // Try each depth until we run out of time or reach max depth
  for (let depth = MIN_DEPTH; depth <= MAX_DEPTH; depth++) {
    let currentBestMove: Move | null = null;
    let currentBestScore = -Infinity;
    
    // Check each move at current depth
    for (const move of moves) {
      if (Date.now() - startTime > MAX_SEARCH_TIME) {
        return bestMove || moves[0];
      }

      const gameCopy = new Chess(game.fen());
      const piece = game.get(move.from);
      
      // Skip if move is repetitive
      if (piece && isRepetitiveMove(tracker, piece.type, move.from, move.to)) {
        continue;
      }

      gameCopy.move(move);
      
      // Update move history
      if (piece) {
        if (!tracker.pieceMoves[piece.type]) {
          tracker.pieceMoves[piece.type] = [];
        }
        tracker.pieceMoves[piece.type].push({
          from: move.from,
          to: move.to,
          count: 1
        });
        
        tracker.lastMoves.push({
          fen: gameCopy.fen(),
          piece: piece.type,
          from: move.from,
          to: move.to,
          count: 1,
          moveNumber: game.history().length + 1
        });
      }
      
      // Update position counts
      tracker.positionCounts[gameCopy.fen()] = (tracker.positionCounts[gameCopy.fen()] || 0) + 1;
      
      const score = minimax(
        gameCopy, 
        depth - 1, 
        -Infinity, 
        Infinity, 
        true,
        tracker
      );
      
      // Remove the last move from history
      if (piece) {
        tracker.pieceMoves[piece.type].pop();
        tracker.lastMoves.pop();
      }
      tracker.positionCounts[gameCopy.fen()]--;
      
      if (score > currentBestScore) {
        currentBestScore = score;
        currentBestMove = move;
      }
    }

    if (currentBestMove && Date.now() - startTime <= MAX_SEARCH_TIME) {
      bestMove = currentBestMove;
    } else {
      break;
    }
  }

  return bestMove || moves[0];
}

// Modified minimax to handle cycles and repetitions
function minimax(
  game: Chess, 
  depth: number, 
  alpha: number, 
  beta: number, 
  isMaximizing: boolean,
  tracker: RepetitionTracker
): number {
  // Early exit conditions
  if (depth === 0 || game.isGameOver()) {
    let score = evaluatePosition(game);
    
    // Penalize repeated positions
    const positionCount = tracker.positionCounts[game.fen()] || 0;
    if (positionCount > 1) {
      score -= positionCount * 3; // Increased penalty for repetitions
    }
    
    // Penalize king movement unless in check
    if (!game.isCheck()) {
      const lastMove = tracker.lastMoves[tracker.lastMoves.length - 1];
      if (lastMove && lastMove.piece === 'k') {
        score -= 5; // Heavy penalty for king moves when not in check
      }
    }
    
    // Penalize repetitive piece movements
    const lastMoves = tracker.lastMoves.slice(-4);
    if (lastMoves.length >= 2) {
      const lastMove = lastMoves[lastMoves.length - 1];
      const secondLastMove = lastMoves[lastMoves.length - 2];
      
      // Check for piece moving back and forth
      if (lastMove.piece === secondLastMove.piece &&
          lastMove.from === secondLastMove.to &&
          lastMove.to === secondLastMove.from) {
        score -= 10; // Increased penalty for back-and-forth movement
      }
      
      // Check for threefold repetition
      if (lastMoves.length >= 4) {
        const isThreefold = lastMoves.every(move => 
          move.piece === lastMove.piece &&
          (move.from === lastMove.from || move.from === lastMove.to) &&
          (move.to === lastMove.from || move.to === lastMove.to)
        );
        if (isThreefold) {
          score -= 15; // Increased penalty for threefold repetition
        }
      }
    }
    
    return score;
  }

  // Check for checkmate or stalemate
  if (game.isCheckmate()) {
    return isMaximizing ? -Infinity : Infinity;
  }
  if (game.isStalemate() || game.isDraw()) {
    return 0;
  }

  const moves = game.moves({ verbose: true });
  
  // Sort moves to improve alpha-beta pruning efficiency
  moves.sort((a, b) => {
    const pieceA = game.get(a.from);
    const pieceB = game.get(b.from);
    
    if (!pieceA || !pieceB) return 0;
    
    // Check for repetitive moves
    const aIsRepetitive = isRepetitiveMove(tracker, pieceA.type, a.from, a.to);
    const bIsRepetitive = isRepetitiveMove(tracker, pieceB.type, b.from, b.to);
    if (aIsRepetitive !== bIsRepetitive) {
      return aIsRepetitive ? 1 : -1;
    }
    
    // Prioritize captures and checks
    const aIsCapture = game.get(a.to) !== null;
    const bIsCapture = game.get(b.to) !== null;
    const gameCopyA = new Chess(game.fen());
    const gameCopyB = new Chess(game.fen());
    gameCopyA.move(a);
    gameCopyB.move(b);
    const aIsCheck = gameCopyA.isCheck();
    const bIsCheck = gameCopyB.isCheck();
    
    if (aIsCapture !== bIsCapture) return bIsCapture ? 1 : -1;
    if (aIsCheck !== bIsCheck) return bIsCheck ? 1 : -1;
    return 0;
  });

  if (isMaximizing) {
    let maxScore = -Infinity;
    for (const move of moves) {
      const gameCopy = new Chess(game.fen());
      gameCopy.move(move);
      
      // Update move history
      const piece = game.get(move.from);
      if (piece) {
        if (!tracker.pieceMoves[piece.type]) {
          tracker.pieceMoves[piece.type] = [];
        }
        tracker.pieceMoves[piece.type].push({
          from: move.from,
          to: move.to,
          count: 1
        });
        
        tracker.lastMoves.push({
          fen: gameCopy.fen(),
          piece: piece.type,
          from: move.from,
          to: move.to,
          count: 1,
          moveNumber: game.history().length + 1
        });
      }
      
      // Update position counts
      tracker.positionCounts[gameCopy.fen()] = (tracker.positionCounts[gameCopy.fen()] || 0) + 1;
      
      const score = minimax(
        gameCopy, 
        depth - 1, 
        alpha, 
        beta, 
        false,
        tracker
      );
      
      // Remove the last move from history
      if (piece) {
        tracker.pieceMoves[piece.type].pop();
        tracker.lastMoves.pop();
      }
      tracker.positionCounts[gameCopy.fen()]--;
      
      maxScore = Math.max(maxScore, score);
      alpha = Math.max(alpha, score);
      if (beta <= alpha) break;
    }
    return maxScore;
  } else {
    let minScore = Infinity;
    for (const move of moves) {
      const gameCopy = new Chess(game.fen());
      gameCopy.move(move);
      
      // Update move history
      const piece = game.get(move.from);
      if (piece) {
        if (!tracker.pieceMoves[piece.type]) {
          tracker.pieceMoves[piece.type] = [];
        }
        tracker.pieceMoves[piece.type].push({
          from: move.from,
          to: move.to,
          count: 1
        });
        
        tracker.lastMoves.push({
          fen: gameCopy.fen(),
          piece: piece.type,
          from: move.from,
          to: move.to,
          count: 1,
          moveNumber: game.history().length + 1
        });
      }
      
      // Update position counts
      tracker.positionCounts[gameCopy.fen()] = (tracker.positionCounts[gameCopy.fen()] || 0) + 1;
      
      const score = minimax(
        gameCopy, 
        depth - 1, 
        alpha, 
        beta, 
        true,
        tracker
      );
      
      // Remove the last move from history
      if (piece) {
        tracker.pieceMoves[piece.type].pop();
        tracker.lastMoves.pop();
      }
      tracker.positionCounts[gameCopy.fen()]--;
      
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
  const [currentError, setError] = useState<string | null>(null);

  // Effect to handle computer moves when it's black's turn
  useEffect(() => {
    if (!isComputerThinking && game.turn() === 'b' && !game.isGameOver()) {
      setIsComputerThinking(true);
      
      // Use setTimeout to prevent UI blocking
      setTimeout(() => {
        const worstMove = findWorstMoveWithTimeManagement(game);
        const gameCopy = new Chess(game.fen());
        gameCopy.move(worstMove);
        setGame(gameCopy);
        setIsComputerThinking(false);
      }, TIME_PER_MOVE);
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

      if (move === null) {
        setError('Invalid move');
        return false;
      }

      setGame(gameCopy);
      setMoveFrom('');
      setMoveSquares({});
      setOptionSquares({});
      setError(null);
      return true;
    } catch {
      setError('An error occurred while making the move');
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
      {currentError && (
        <ErrorMessage
          message={currentError}
          onDismiss={() => setError(null)}
        />
      )}
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