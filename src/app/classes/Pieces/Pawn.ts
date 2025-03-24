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

const POSSIBLE_MOVES = (color: Colors): PossibleMove[] => [
  {
    type: PossibleMoveTypes.Normal,
    optionalOptions: {
      takePieces: false,
    },
    movements: [
      {
        direction:
          color === Colors.White
            ? MovementDirections.Up
            : MovementDirections.Down,
        amount: 1,
      },
    ],
  },
  {
    type: PossibleMoveTypes.Normal,
    optionalOptions: {
      takePieces: false,
    },
    condition: (piece: Piece) => piece.firstMove,
    movements: [
      {
        direction:
          color === Colors.White
            ? MovementDirections.Up
            : MovementDirections.Down,
        amount: 2,
      },
    ],
  },

  {
    type: PossibleMoveTypes.Normal,
    condition: (piece: Piece) => {
      const { chessboard } = piece;
      const position = chessboard.getPiecePosition(piece.row, piece.column, [
        {
          direction:
            color === Colors.White
              ? MovementDirections.UpRight
              : MovementDirections.DownRight,
          amount: 1,
        },
      ]);

      return position
        ? chessboard.checkForPiece(position.row, position.column) !== false
        : false;
    },
    movements: [
      {
        direction:
          color === Colors.White
            ? MovementDirections.UpRight
            : MovementDirections.DownRight,
        amount: 1,
      },
    ],
  },
  {
    type: PossibleMoveTypes.Normal,
    condition: (piece: Piece) => {
      const chessboard = piece.chessboard;
      const position = chessboard.getPiecePosition(piece.row, piece.column, [
        {
          direction:
            color === Colors.White
              ? MovementDirections.UpLeft
              : MovementDirections.DownLeft,
          amount: 1,
        },
      ]);

      return position
        ? chessboard.checkForPiece(position.row, position.column) !== false
        : false;
    },
    movements: [
      {
        direction:
          color === Colors.White
            ? MovementDirections.UpLeft
            : MovementDirections.DownLeft,
        amount: 1,
      },
    ],
  },

  {
    type: PossibleMoveTypes.Normal,
    condition: (piece: Piece) => {
      const { chessboard } = piece;
      const piecePosition = chessboard.getPiecePosition(
        piece.row,
        piece.column,
        [
          {
            direction: MovementDirections.Right,
            amount: 1,
          },
        ]
      );

      if (piecePosition) {
        const otherPawn = chessboard.getPiece(
          piecePosition.row,
          piecePosition.column
        );

        if (
          otherPawn &&
          otherPawn.pieceType === Pieces.Pawn &&
          otherPawn.color !== piece.color
        ) {
          const lastMadeMove = chessboard.madeChessMoves.at(-1);

          if (lastMadeMove) {
            const { startPosition, endPosition } = lastMadeMove;
            const expectedStartPosition = chessboard.getPiecePosition(
              endPosition.row,
              endPosition.column,
              [
                {
                  direction:
                    color === Colors.White
                      ? MovementDirections.Up
                      : MovementDirections.Down,
                  amount: 2,
                },
              ]
            );

            if (expectedStartPosition) {
              return (
                lastMadeMove.piece === Pieces.Pawn &&
                endPosition.row === piecePosition.row &&
                endPosition.column === piecePosition.column &&
                startPosition.row === expectedStartPosition.row &&
                startPosition.column === expectedStartPosition.column
              );
            }
          }
        }
      }

      return false;
    },
    additionalAction: async (id: string, piece: Piece) => {
      const { chessboard } = piece;

      const takenPiecePosition = chessboard.getPiecePosition(
        piece.row,
        piece.column,
        [
          {
            direction:
              color === Colors.White
                ? MovementDirections.Down
                : MovementDirections.Up,
            amount: 1,
          },
        ]
      );

      if (takenPiecePosition) {
        const otherPawn = chessboard.getPiece(
          takenPiecePosition.row,
          takenPiecePosition.column
        );

        if (otherPawn) {
          await otherPawn.movePiece(id, piece.row, piece.column, {
            ignoreImpossibleMovements: true,
          });
        }
      }
    },
    movements: [
      {
        direction:
          color === Colors.White
            ? MovementDirections.UpRight
            : MovementDirections.DownRight,
        amount: 1,
      },
    ],
  },
  {
    type: PossibleMoveTypes.Normal,
    condition: (piece: Piece) => {
      const { chessboard } = piece;
      const piecePosition = chessboard.getPiecePosition(
        piece.row,
        piece.column,
        [
          {
            direction: MovementDirections.Left,
            amount: 1,
          },
        ]
      );

      if (piecePosition) {
        const otherPawn = chessboard.getPiece(
          piecePosition.row,
          piecePosition.column
        );

        if (
          otherPawn &&
          otherPawn.pieceType === Pieces.Pawn &&
          otherPawn.color !== piece.color
        ) {
          const lastMadeMove = chessboard.madeChessMoves.at(-1);

          if (lastMadeMove) {
            const { startPosition, endPosition } = lastMadeMove;
            const expectedStartPosition = chessboard.getPiecePosition(
              endPosition.row,
              endPosition.column,
              [
                {
                  direction:
                    color === Colors.White
                      ? MovementDirections.Up
                      : MovementDirections.Down,
                  amount: 2,
                },
              ]
            );

            if (expectedStartPosition) {
              return (
                lastMadeMove.piece === Pieces.Pawn &&
                endPosition.row === piecePosition.row &&
                endPosition.column === piecePosition.column &&
                startPosition.row === expectedStartPosition.row &&
                startPosition.column === expectedStartPosition.column
              );
            }
          }
        }
      }

      return false;
    },
    additionalAction: async (id: string, piece: Piece) => {
      const { chessboard } = piece;

      const takenPiecePosition = chessboard.getPiecePosition(
        piece.row,
        piece.column,
        [
          {
            direction:
              color === Colors.White
                ? MovementDirections.Down
                : MovementDirections.Up,
            amount: 1,
          },
        ]
      );

      if (takenPiecePosition) {
        const otherPawn = chessboard.getPiece(
          takenPiecePosition.row,
          takenPiecePosition.column
        );

        if (otherPawn) {
          await otherPawn.movePiece(id, piece.row, piece.column, {
            ignoreImpossibleMovements: true,
          });
        }
      }
    },
    movements: [
      {
        direction:
          color === Colors.White
            ? MovementDirections.UpLeft
            : MovementDirections.DownLeft,
        amount: 1,
      },
    ],
  },
];

class Pawn extends Piece {
  constructor(
    chessboard: Chessboard,
    color: Colors,
    row: Rows,
    column: Columns
  ) {
    super(
      chessboard,
      Pieces.Pawn,
      color,
      row,
      column,
      "pawn.svg",
      POSSIBLE_MOVES(color)
    );
  }
}

export default Pawn;
