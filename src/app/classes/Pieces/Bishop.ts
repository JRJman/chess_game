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
    direction: MovementDirections.UpRight,
  },
  {
    type: PossibleMoveTypes.Infinity,
    direction: MovementDirections.DownRight,
  },
  {
    type: PossibleMoveTypes.Infinity,
    direction: MovementDirections.DownLeft,
  },
  {
    type: PossibleMoveTypes.Infinity,
    direction: MovementDirections.UpLeft,
  },
];

class Bishop extends Piece {
  constructor(
    chessboard: Chessboard,
    color: Colors,
    row: Rows,
    column: Columns
  ) {
    super(
      chessboard,
      Pieces.Bishop,
      color,
      row,
      column,
      "bishop.svg",
      POSSIBLE_MOVES
    );
  }
}

export default Bishop;
