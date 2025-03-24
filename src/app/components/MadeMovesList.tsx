"use client";

import React from "react";

import Chessboard from "@/app/classes/Chessboard/Chessboard";

interface MadeMovesListProps {
  chessboard: Chessboard;
}

const MadeMovesList = (props: MadeMovesListProps) => {
  const renderMadeMoves = () => {
    return props.chessboard.madeChessMoves.map((madeChessMove, index) => {
      const { startPosition, endPosition, piece, color } = madeChessMove;

      return (
        <div className="made-move" key={"made-move-" + index}>
          <p>{color}</p>
          <p>{piece}</p>
          <p>
            {startPosition.column}
            {startPosition.row}
          </p>
          <p>-</p>
          <p>
            {endPosition.column}
            {endPosition.row}
          </p>
        </div>
      );
    });
  };

  return <div className="made-moves">{renderMadeMoves()}</div>;
};

export default MadeMovesList;
