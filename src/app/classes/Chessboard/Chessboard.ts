import Piece from "@/app/classes/Pieces/Piece";
import Pawn from "@/app/classes/Pieces/Pawn";
import Bishop from "@/app/classes/Pieces/Bishop";
import Knight from "@/app/classes/Pieces/Knight";
import Rook from "@/app/classes/Pieces/Rook";
import Queen from "@/app/classes/Pieces/Queen";
import King from "@/app/classes/Pieces/King";

import {
  Colors,
  Columns,
  DiagonalDirections,
  MovementDirections,
  Pieces,
  Rows,
} from "@/app/enums/chess";
import { blackPieces, columns, rows, whitePieces } from "@/app/constants/chess";
import { Position, PieceInfo, ChessMove } from "@/app/interfaces/chess";
import { hashPassword } from "@/app/functions/chess";

class Chessboard {
  private _id: string = "";
  private _pieces: Piece[] = [];
  private _removedPieces: Piece[] = [];

  private _madeChessMoves: ChessMove[] = [];

  constructor() {
    this._pieces = [
      ...whitePieces.map((pieceInfo) =>
        this.renderPiece(pieceInfo, Colors.White)
      ),
      ...blackPieces.map((pieceInfo) =>
        this.renderPiece(pieceInfo, Colors.Black)
      ),
    ];

    this.renderHiddenId();
  }

  get id(): string {
    return this._id;
  }
  get pieces(): Piece[] {
    return this._pieces;
  }
  get removedPieces(): Piece[] {
    return this._removedPieces;
  }
  get currentColor(): Colors {
    return this._madeChessMoves.length % 2 === 1 ? Colors.Black : Colors.White;
  }
  get madeChessMoves(): ChessMove[] {
    return this._madeChessMoves;
  }

  private renderPiece(pieceInfo: PieceInfo, color: Colors): Piece {
    switch (pieceInfo.piece) {
      case "pawn":
        return new Pawn(this, color, pieceInfo.row, pieceInfo.column);
      case "bishop":
        return new Bishop(this, color, pieceInfo.row, pieceInfo.column);
      case "knight":
        return new Knight(this, color, pieceInfo.row, pieceInfo.column);
      case "rook":
        return new Rook(this, color, pieceInfo.row, pieceInfo.column);
      case "queen":
        return new Queen(this, color, pieceInfo.row, pieceInfo.column);
      case "king":
        return new King(this, color, pieceInfo.row, pieceInfo.column);
      default:
        throw new Error("Invalid piece");
    }
  }

  private async renderHiddenId() {
    const chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const id = Array.from({ length }, () =>
      chars.charAt(Math.floor(Math.random() * chars.length))
    ).join("");

    this._id = await hashPassword(id);

    return id;
  }

  public async movePiece(
    piece: Piece,
    row: Rows,
    column: Columns,
    additionalAction = (id: string, piece: Piece) => {}
  ) {
    if (this.currentColor === piece.color) {
      const id = await this.renderHiddenId();

      const previousPosition: Position = {
        row: piece.row,
        column: piece.column,
      };

      const movePieceCheck = await piece.movePiece(id, row, column, {
        additionalAction: additionalAction,
      });

      if (movePieceCheck)
        this._madeChessMoves.push({
          startPosition: previousPosition,
          endPosition: { row: row, column: column },
          piece: piece.pieceType,
          color: piece.color,
        });

      this.checkForTakenPiece(piece);

      return movePieceCheck;
    }

    return false;
  }

  public getPiece(row: Rows, column: Columns): Piece | false {
    return (
      this._pieces.filter(
        (piece) => piece.row === row && piece.column === column
      )[0] ?? false
    );
  }

  public checkForPiece(row: Rows, column: Columns) {
    const foundPiece = this._pieces.find(
      (piece) => piece.row === row && piece.column === column
    );

    if (foundPiece) return foundPiece.color;

    return false;
  }

  public getPiecePosition(
    currentRow: Rows,
    currentColumn: Columns,
    movements: { direction: MovementDirections; amount: number }[],
    ignorePieceCheck: boolean = false
  ) {
    let newPosition: Position = {
      row: currentRow,
      column: currentColumn,
    };
    let impossibleMovement = false;

    const movePosition = {
      horizontal: (amount: number) => {
        if (impossibleMovement) return;

        const isNegative = amount < 0;

        const newRow = rows[rows.indexOf(newPosition.row) - amount];
        if (typeof newRow === "undefined") {
          impossibleMovement = true;
          return;
        }

        if (
          !ignorePieceCheck &&
          ((amount < -1 && isNegative) || (amount > 1 && !isNegative))
        ) {
          const checkedPositions: boolean[] = [];

          for (
            let i = isNegative ? -1 : 1;
            isNegative ? i > amount : i < amount;
            isNegative ? i-- : i++
          ) {
            const checkedRow = rows[rows.indexOf(newPosition.row) - i];

            checkedPositions.push(
              !this.checkForPiece(checkedRow, newPosition.column)
            );
          }

          if (checkedPositions.some((result) => !result)) {
            impossibleMovement = true;
            return;
          }
        }

        newPosition.row = newRow;
      },
      vertical: (amount: number) => {
        if (impossibleMovement) return;

        const isNegative = amount < 0;

        const newColumn = columns[columns.indexOf(newPosition.column) + amount];
        if (typeof newColumn === "undefined") {
          impossibleMovement = true;
          return;
        }

        if (
          !ignorePieceCheck &&
          ((amount < -1 && isNegative) || (amount > 1 && !isNegative))
        ) {
          const checkedPositions: boolean[] = [];

          for (
            let i = isNegative ? -1 : 1;
            isNegative ? i > amount : i < amount;
            isNegative ? i-- : i++
          ) {
            const checkedColumn =
              columns[columns.indexOf(newPosition.column) + i];

            checkedPositions.push(
              !this.checkForPiece(newPosition.row, checkedColumn)
            );
          }

          if (checkedPositions.some((result) => !result)) {
            impossibleMovement = true;
            return;
          }
        }

        newPosition.column = newColumn;
      },
      diagonal: (amount: number, diagonalDirections: DiagonalDirections) => {
        if (impossibleMovement) return;

        const isNegative = amount < 0;

        const newRow = rows[rows.indexOf(newPosition.row) - amount];
        const newColumn =
          columns[
            columns.indexOf(newPosition.column) -
              (diagonalDirections === DiagonalDirections.UpLeftAndDownRight
                ? amount
                : -amount)
          ];

        if (typeof newRow === "undefined" || typeof newColumn === "undefined") {
          impossibleMovement = true;
          return;
        }

        if (
          !ignorePieceCheck &&
          ((amount < -1 && isNegative) || (amount > 1 && !isNegative))
        ) {
          const checkedPositions: boolean[] = [];

          for (
            let i = isNegative ? -1 : 1;
            isNegative ? i > amount : i < amount;
            isNegative ? i-- : i++
          ) {
            const checkedRow = rows[rows.indexOf(newPosition.row) - i];
            const checkedColumn =
              columns[
                columns.indexOf(newPosition.column) -
                  (diagonalDirections === DiagonalDirections.UpLeftAndDownRight
                    ? i
                    : -i)
              ];

            checkedPositions.push(
              !this.checkForPiece(checkedRow, checkedColumn)
            );
          }

          if (checkedPositions.some((result) => !result)) {
            impossibleMovement = true;
            return;
          }
        }

        newPosition.row = newRow;
        newPosition.column = newColumn;
      },
    };

    movements.forEach((movement) => {
      if (impossibleMovement) return;

      const { direction, amount } = movement;

      switch (direction) {
        case MovementDirections.Up:
          movePosition.horizontal(amount);
          break;
        case MovementDirections.UpRight:
          movePosition.diagonal(amount, DiagonalDirections.UpRightAndDownLeft);
          break;
        case MovementDirections.Right:
          movePosition.vertical(amount);
          break;
        case MovementDirections.DownRight:
          movePosition.diagonal(-amount, DiagonalDirections.UpLeftAndDownRight);
          break;
        case MovementDirections.Down:
          movePosition.horizontal(-amount);
          break;
        case MovementDirections.DownLeft:
          movePosition.diagonal(-amount, DiagonalDirections.UpRightAndDownLeft);
          break;
        case MovementDirections.Left:
          movePosition.vertical(-amount);
          break;
        case MovementDirections.UpLeft:
          movePosition.diagonal(amount, DiagonalDirections.UpLeftAndDownRight);
          break;
      }
    });

    if (impossibleMovement) {
      return false;
    }

    return newPosition;
  }

  public checkForTakenPiece(checkedPiece: Piece) {
    const removedPieces = this._pieces.filter(
      (piece) =>
        !(
          !(
            piece.row === checkedPiece.row &&
            piece.column === checkedPiece.column
          ) ||
          (piece.row === checkedPiece.row &&
            piece.column === checkedPiece.column &&
            piece.color === checkedPiece.color)
        )
    );

    this._pieces = this._pieces.filter(
      (piece) =>
        !(
          piece.row === checkedPiece.row && piece.column === checkedPiece.column
        ) ||
        (piece.row === checkedPiece.row &&
          piece.column === checkedPiece.column &&
          piece.color === checkedPiece.color)
    );

    this._removedPieces.push(...removedPieces);
  }

  public promotePiece(piece: Piece, chosenPiece: Pieces) {
    const { pieceType, color, row, column } = piece;

    if (
      pieceType === Pieces.Pawn &&
      ((color === Colors.Black && row === Rows.One) ||
        (color === Colors.White && row === Rows.Eight))
    ) {
      this._pieces = this._pieces.filter(
        (piece) => !(piece.row === row && piece.column === column)
      );

      this._pieces.push(
        this.renderPiece(
          {
            piece: chosenPiece,
            row: row,
            column: column,
          },
          color
        )
      );
    }
  }
}

export default Chessboard;
