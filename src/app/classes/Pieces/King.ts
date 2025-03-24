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
    movements: [{ direction: MovementDirections.Up, amount: 1 }],
  },
  {
    type: PossibleMoveTypes.Normal,
    movements: [{ direction: MovementDirections.Right, amount: 1 }],
  },
  {
    type: PossibleMoveTypes.Normal,
    movements: [{ direction: MovementDirections.Down, amount: 1 }],
  },
  {
    type: PossibleMoveTypes.Normal,
    movements: [{ direction: MovementDirections.Left, amount: 1 }],
  },
  {
    type: PossibleMoveTypes.Normal,
    movements: [{ direction: MovementDirections.UpRight, amount: 1 }],
  },
  {
    type: PossibleMoveTypes.Normal,
    movements: [{ direction: MovementDirections.DownRight, amount: 1 }],
  },
  {
    type: PossibleMoveTypes.Normal,
    movements: [{ direction: MovementDirections.DownLeft, amount: 1 }],
  },
  {
    type: PossibleMoveTypes.Normal,
    movements: [{ direction: MovementDirections.UpLeft, amount: 1 }],
  },

  {
    type: PossibleMoveTypes.Normal,
    movements: [{ direction: MovementDirections.Right, amount: 2 }],
    condition: (piece: Piece) => {
      const { firstMove, chessboard } = piece;

      if (firstMove) {
        const rookCheck = chessboard.getPiecePosition(piece.row, piece.column, [
          {
            direction: MovementDirections.Right,
            amount: 3,
          },
        ]);

        if (rookCheck) {
          const rook = chessboard.getPiece(rookCheck.row, rookCheck.column);

          return (
            rook &&
            rook.pieceType === Pieces.Rook &&
            rook.color === piece.color &&
            rook.firstMove
          );
        }
      }

      return false;
    },
    additionalAction: async (id: string, piece: Piece) => {
      const { chessboard, row, column } = piece;

      const rookCheck = chessboard.getPiecePosition(piece.row, piece.column, [
        {
          direction: MovementDirections.Right,
          amount: 1,
        },
      ]);

      if (rookCheck) {
        const rook = chessboard.getPiece(rookCheck.row, rookCheck.column);
        const newPosition = chessboard.getPiecePosition(row, column, [
          {
            direction: MovementDirections.Left,
            amount: 1,
          },
        ]);

        if (rook && newPosition) {
          await rook.movePiece(id, newPosition.row, newPosition.column, {
            ignoreImpossibleMovements: true,
          });
        }
      }
    },
    optionalOptions: {
      takePieces: false,
    },
  },
  {
    type: PossibleMoveTypes.Normal,
    movements: [{ direction: MovementDirections.Left, amount: 2 }],
    condition: (piece: Piece) => {
      const { firstMove, chessboard } = piece;

      if (firstMove) {
        const rookCheck = chessboard.getPiecePosition(piece.row, piece.column, [
          {
            direction: MovementDirections.Left,
            amount: 4,
          },
        ]);

        if (rookCheck) {
          const rook = chessboard.getPiece(rookCheck.row, rookCheck.column);

          return (
            rook &&
            rook.pieceType === Pieces.Rook &&
            rook.color === piece.color &&
            rook.firstMove
          );
        }
      }

      return false;
    },
    additionalAction: async (id: string, piece: Piece) => {
      const { chessboard, row, column } = piece;

      const rookCheck = chessboard.getPiecePosition(piece.row, piece.column, [
        {
          direction: MovementDirections.Left,
          amount: 2,
        },
      ]);

      if (rookCheck) {
        const rook = chessboard.getPiece(rookCheck.row, rookCheck.column);
        const newPosition = chessboard.getPiecePosition(row, column, [
          {
            direction: MovementDirections.Right,
            amount: 1,
          },
        ]);

        if (rook && newPosition) {
          await rook.movePiece(id, newPosition.row, newPosition.column, {
            ignoreImpossibleMovements: true,
          });
        }
      }
    },
    optionalOptions: {
      takePieces: false,
    },
  },
];

class King extends Piece {
  constructor(
    chessboard: Chessboard,
    color: Colors,
    row: Rows,
    column: Columns
  ) {
    super(
      chessboard,
      Pieces.King,
      color,
      row,
      column,
      "king.svg",
      POSSIBLE_MOVES
    );
  }

  public getMovements(
    optionalConditions: { ignoreKingCheck?: boolean } = {
      ignoreKingCheck: false,
    }
  ) {
    const possibleMovements = super.getMovements(optionalConditions);

    if (!(optionalConditions.ignoreKingCheck ?? false)) {
      console.log();

      const otherColorMoves = this.chessboard.pieces
        .filter(
          (piece) => piece.color !== this.color
          // && piece.pieceType !== Pieces.King
        )
        .map((piece) =>
          piece.getMovements({
            takePiecesOnly: true,
            ignoreTakingOtherPieces: true,
            ignoreCondition: true,
            ignoreKingCheck: true,
          })
        )
        .flat()
        .filter(
          (movement, index, self) =>
            index ===
            self.findIndex(
              (m) => JSON.stringify(m) === JSON.stringify(movement)
            )
        );

      return possibleMovements.filter(
        (movement) =>
          !otherColorMoves.some(
            (remove) =>
              remove.column === movement.column && remove.row === movement.row
          )
      );
    }

    return possibleMovements;
  }
}

export default King;
