"use client";

import React, { useState } from "react";

import MadeMovesList from "@/app/components/MadeMovesList";
import ChessboardCell from "@/app/components/ChessboardCell";

import ChessboardClass from "@/app/classes/Chessboard/Chessboard";
import Piece from "@/app/classes/Pieces/Piece";

import { Colors, Columns, Pieces, Rows } from "@/app/enums/chess";

import { columns, rows } from "@/app/constants/chess";

import { Position } from "@/app/interfaces/chess";

const CHESSBOARD = new ChessboardClass();

const Chessboard = () => {
  const [possibleMovements, setPossibleMovements] = useState<Position[]>([]);
  const [selectedPiece, setSelectedPiece] = useState<Piece | null>(null);

  const [isPromoting, setIsPromoting] = useState<boolean>(false);

  const showMovementsOfPiece = (piece: Piece) => {
    if (!isPromoting) {
      if (
        piece.row === selectedPiece?.row &&
        piece.column === selectedPiece?.column
      ) {
        refreshSelection();
      } else {
        if (piece.color === CHESSBOARD.currentColor) {
          setSelectedPiece(piece);
          setPossibleMovements(piece.getMovements());
        } else {
          refreshSelection();
        }
      }
    }
  };

  const refreshSelection = () => {
    setPossibleMovements([]);
    setSelectedPiece(null);
    setIsPromoting(false);

    CHESSBOARD.pieces.forEach((piece) => {
      if (isPromoting) return;

      const { pieceType, color, row } = piece;

      if (
        pieceType === Pieces.Pawn &&
        ((color === Colors.Black && row === Rows.One) ||
          (color === Colors.White && row === Rows.Eight))
      ) {
        setIsPromoting(true);
      }
    });
  };

  const movePiece = async (
    row: Rows,
    column: Columns,
    additionalAction = (id: string, piece: Piece) => {}
  ) => {
    if (
      !isPromoting &&
      selectedPiece &&
      (await CHESSBOARD.movePiece(selectedPiece, row, column, additionalAction))
    ) {
      refreshSelection();
    }
  };

  const createRow = (row: Rows, rowNumber: number) => {
    return (
      <div
        key={"row-" + row}
        className={
          "chessboard-row " +
          (rowNumber % 2 === 0 ? "chessboard-row-odd" : "chessboard-row-even")
        }
      >
        <div className="chessboard-row-number">{row}</div>

        {columns.map((column) => {
          return (
            <ChessboardCell
              key={"chessboard-spot-" + row + "-" + column}
              chessboard={CHESSBOARD}
              row={row}
              column={column}
              possibleMovements={possibleMovements}
              showMovementsOfPiece={showMovementsOfPiece}
              movePiece={movePiece}
              refreshSelection={refreshSelection}
              isPromoting={isPromoting}
            />
          );
        })}
      </div>
    );
  };

  return (
    <main>
      <div className="chessboard-container">
        <div className="chessboard">
          {isPromoting ? <div className="promoting-piece"></div> : <></>}

          {rows.map((row, index) => {
            return createRow(row, index);
          })}

          <div className="chessboard-row">
            <div className="chessboard-column-character"></div>
            {columns.map((column) => {
              return (
                <div
                  key={"column-" + column}
                  className="chessboard-column-character"
                >
                  {column}
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <MadeMovesList chessboard={CHESSBOARD} />
    </main>
  );
};

export default Chessboard;
