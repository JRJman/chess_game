import Chessboard from "@/app/classes/Chessboard/Chessboard";

import { ChessPiece, Position, PossibleMove } from "@/app/interfaces/chess";
import {
  Colors,
  Columns,
  Pieces,
  PossibleMoveTypes,
  Rows,
} from "@/app/enums/chess";
import { verifyPassword } from "@/app/functions/chess";

class Piece implements ChessPiece {
  protected _chessboard: Chessboard;
  protected _pieceType: Pieces;
  protected _image: string;
  protected _color: Colors;
  protected _row: Rows;
  protected _column: Columns;
  protected _possibleMoves: PossibleMove[];

  protected _firstMove: boolean = true;

  constructor(
    chessboard: Chessboard,
    pieceType: Pieces,
    color: Colors,
    row: Rows,
    column: Columns,
    image: string,
    possibleMoves: PossibleMove[]
  ) {
    this._chessboard = chessboard;
    this._pieceType = pieceType;
    this._image = image;
    this._color = color;
    this._row = row;
    this._column = column;
    this._possibleMoves = possibleMoves;
  }

  get chessboard(): Chessboard {
    return this._chessboard;
  }
  get pieceType(): Pieces {
    return this._pieceType;
  }
  get image(): string {
    return "images/pieces/" + this._color + "/" + this._image;
  }
  get color(): Colors {
    return this._color;
  }
  get row(): Rows {
    return this._row;
  }
  get column(): Columns {
    return this._column;
  }
  get possibleMoves(): PossibleMove[] {
    return this._possibleMoves;
  }
  get firstMove(): boolean {
    return this._firstMove;
  }

  public async movePiece(
    id: string,
    row: Rows,
    column: Columns,
    optionalProps: {
      additionalAction?: (id: string, piece: Piece) => void;
      ignoreImpossibleMovements?: boolean;
    } = {
      additionalAction: (id: string, piece: Piece) => {},
      ignoreImpossibleMovements: false,
    }
  ) {
    if (await verifyPassword(id, this._chessboard.id)) {
      if (
        (optionalProps.ignoreImpossibleMovements ?? false) ||
        this.getMovements().some(
          (movement) => movement.row === row && movement.column === column
        )
      ) {
        if (this._firstMove) this._firstMove = false;

        this._row = row;
        this._column = column;

        if (optionalProps.additionalAction) {
          await optionalProps.additionalAction(id, this);
        }

        return true;
      }
    }

    return false;
  }

  public getMovements(
    optionalConditions: {
      ignoreTakingOtherPieces?: boolean;
      ignoreCondition?: boolean;
      takePiecesOnly?: boolean;
      ignoreKingCheck?: boolean
    } = {
      takePiecesOnly: false,
      ignoreCondition: false,
      ignoreTakingOtherPieces: false,
    }
  ): Position[] {
    return this._possibleMoves
      .map((possibleMovement) => {
        if (
          (optionalConditions?.takePiecesOnly ?? false) &&
          !(possibleMovement.optionalOptions?.takePieces ?? true)
        ) {
          return false;
        }

        if (
          (optionalConditions?.ignoreCondition ?? false) ||
          !possibleMovement.condition ||
          possibleMovement.condition(this)
        ) {
          if (possibleMovement.type === PossibleMoveTypes.Normal) {
            const getMovements = this._chessboard.getPiecePosition(
              this._row,
              this._column,
              possibleMovement.movements,
              possibleMovement.optionalOptions?.ignorePieceCheck ?? false
            );

            if (getMovements !== false) {
              const checkedPiece = this._chessboard.checkForPiece(
                getMovements.row,
                getMovements.column
              );

              if (
                checkedPiece &&
                (!(possibleMovement.optionalOptions?.takePieces ?? true) ||
                  (checkedPiece === this._color &&
                    (optionalConditions?.ignoreTakingOtherPieces ?? false) ===
                      false))
              ) {
                return false;
              }

              return {
                row: getMovements.row,
                column: getMovements.column,
                additionalAction: possibleMovement?.additionalAction,
              };
            }
          } else if (possibleMovement.type === PossibleMoveTypes.Infinity) {
            const possibleMovements = [];
            let movementChecked = true;
            let number = 1;

            while (movementChecked) {
              let addPossibleMovement = true;

              const getMovements = this._chessboard.getPiecePosition(
                this._row,
                this._column,
                [
                  {
                    direction: possibleMovement.direction,
                    amount: number,
                  },
                ],
                possibleMovement.optionalOptions?.ignorePieceCheck ?? false
              );

              if (getMovements !== false) {
                const checkedPiece = this._chessboard.checkForPiece(
                  getMovements.row,
                  getMovements.column
                );

                if (checkedPiece) {
                  if (
                    !(
                      possibleMovement.optionalOptions?.ignorePieceCheck ??
                      false
                    )
                  ) {
                    movementChecked = false;
                  }

                  if (
                    !(possibleMovement.optionalOptions?.takePieces ?? true) ||
                    (checkedPiece === this._color &&
                      (optionalConditions?.ignoreTakingOtherPieces ?? false) ===
                        false)
                  ) {
                    addPossibleMovement = false;
                  }
                }

                if (addPossibleMovement) {
                  possibleMovements.push({
                    row: getMovements.row,
                    column: getMovements.column,
                    additionalAction: possibleMovement?.additionalAction,
                  });
                }

                number++;
              } else {
                movementChecked = false;
              }
            }

            return possibleMovements;
          }
        }

        return false;
      })
      .flat()
      .filter((movement) => movement !== false);
  }
}

export default Piece;
