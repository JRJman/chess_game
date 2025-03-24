import Chessboard from "@/app/classes/Chessboard/Chessboard";
import Piece from "@/app/classes/Pieces/Piece";

import {
  Colors,
  Columns,
  MovementDirections,
  PossibleMoveTypes,
  Pieces,
  Rows,
} from "@/app/enums/chess";

export interface ChessPiece {
  chessboard: Chessboard;
  pieceType: Pieces;
  image: string;
  color: Colors;

  row: Rows;
  column: Columns;

  possibleMoves: PossibleMove[];

  firstMove: boolean;

  movePiece(id: string, row: Rows, column: Columns): Promise<boolean>;

  getMovements(): Position[];
}

export interface ChessMove {
  startPosition: Position;
  endPosition: Position;
  piece: Pieces;
  color: Colors;
}

export interface PieceInfo {
  piece: Pieces;
  row: Rows;
  column: Columns;
}

export interface Position {
  row: Rows;
  column: Columns;
  additionalAction?: (id: string, piece: Piece) => Promise<void>;
}

export type PossibleMoves = Record<Colors, PossibleMove[]>;

export type PossibleMove = PossibleMoveNormal | PossibleMoveInfinity;

interface PossibleMoveInterface {
  optionalOptions?: {
    takePieces?: boolean;
    ignorePieceCheck?: boolean;
  };
  condition?: (piece: Piece) => boolean;
  additionalAction?: (id: string, piece: Piece) => Promise<void>;
}

export interface PossibleMoveNormal extends PossibleMoveInterface {
  type: PossibleMoveTypes.Normal;
  movements: PieceMovement[];
}

export interface PossibleMoveInfinity extends PossibleMoveInterface {
  type: PossibleMoveTypes.Infinity;
  direction: MovementDirections;
}

export interface PieceMovement {
  direction: MovementDirections;
  amount: number;
}
