import Chessboard from "@/app/classes/Chessboard/Chessboard";
import Piece from "@/app/classes/Pieces/Piece";

import { PossibleMove } from "@/app/interfaces/chess";

import {
  Colors,
  Columns,
  MovementDirections,
  Pieces,
  PossibleMoveTypes,
  Rows,
} from "@/app/enums/chess";

const POSSIBLE_MOVES: PossibleMove[] = [
  {
    type: PossibleMoveTypes.Infinity,
    direction: MovementDirections.Up,
  },
  {
    type: PossibleMoveTypes.Infinity,
    direction: MovementDirections.Right,
  },
  {
    type: PossibleMoveTypes.Infinity,
    direction: MovementDirections.Down,
  },
  {
    type: PossibleMoveTypes.Infinity,
    direction: MovementDirections.Left,
  },
];

class Rook extends Piece {
  constructor(
    chessboard: Chessboard,
    color: Colors,
    row: Rows,
    column: Columns
  ) {
    super(
      chessboard,
      Pieces.Rook,
      color,
      row,
      column,
      "rook.svg",
      POSSIBLE_MOVES
    );
  }
}

export default Rook;
