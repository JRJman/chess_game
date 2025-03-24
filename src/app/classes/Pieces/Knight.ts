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
    type: PossibleMoveTypes.Normal,
    optionalOptions: {
      ignorePieceCheck: true,
    },
    movements: [
      { direction: MovementDirections.Up, amount: 2 },
      { direction: MovementDirections.Right, amount: 1 },
    ],
  },
  {
    type: PossibleMoveTypes.Normal,
    optionalOptions: {
      ignorePieceCheck: true,
    },
    movements: [
      { direction: MovementDirections.Up, amount: 2 },
      { direction: MovementDirections.Left, amount: 1 },
    ],
  },
  {
    type: PossibleMoveTypes.Normal,
    optionalOptions: {
      ignorePieceCheck: true,
    },
    movements: [
      { direction: MovementDirections.Right, amount: 2 },
      { direction: MovementDirections.Up, amount: 1 },
    ],
  },
  {
    type: PossibleMoveTypes.Normal,
    optionalOptions: {
      ignorePieceCheck: true,
    },
    movements: [
      { direction: MovementDirections.Right, amount: 2 },
      { direction: MovementDirections.Down, amount: 1 },
    ],
  },
  {
    type: PossibleMoveTypes.Normal,
    optionalOptions: {
      ignorePieceCheck: true,
    },
    movements: [
      { direction: MovementDirections.Down, amount: 2 },
      { direction: MovementDirections.Right, amount: 1 },
    ],
  },
  {
    type: PossibleMoveTypes.Normal,
    optionalOptions: {
      ignorePieceCheck: true,
    },
    movements: [
      { direction: MovementDirections.Down, amount: 2 },
      { direction: MovementDirections.Left, amount: 1 },
    ],
  },
  {
    type: PossibleMoveTypes.Normal,
    optionalOptions: {
      ignorePieceCheck: true,
    },
    movements: [
      { direction: MovementDirections.Left, amount: 2 },
      { direction: MovementDirections.Up, amount: 1 },
    ],
  },
  {
    type: PossibleMoveTypes.Normal,
    optionalOptions: {
      ignorePieceCheck: true,
    },
    movements: [
      { direction: MovementDirections.Left, amount: 2 },
      { direction: MovementDirections.Down, amount: 1 },
    ],
  },
];

class Knight extends Piece {
  constructor(
    chessboard: Chessboard,
    color: Colors,
    row: Rows,
    column: Columns
  ) {
    super(
      chessboard,
      Pieces.Knight,
      color,
      row,
      column,
      "knight.svg",
      POSSIBLE_MOVES
    );
  }
}

export default Knight;
