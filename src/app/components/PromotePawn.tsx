"use client";

import React from "react";

import Chessboard from "@/app/classes/Chessboard/Chessboard";
import Piece from "@/app/classes/Pieces/Piece";

import { Pieces } from "../enums/chess";

interface MadeMovesListProps {
  chessboard: Chessboard;
  piece: Piece;
  refreshSelection: () => void;
}

const PromotePawn = (props: MadeMovesListProps) => {
  const { chessboard, piece, refreshSelection } = props;

  const renderOptions = () => {
    return [
      { pieceType: Pieces.Queen, image: "queen.svg" },
      { pieceType: Pieces.Rook, image: "rook.svg" },
      { pieceType: Pieces.Knight, image: "knight.svg" },
      { pieceType: Pieces.Bishop, image: "bishop.svg" },
    ].map((pieceInfo) => (
      <div
        className="promote-pawn-list-item"
        onClick={() => {
          chessboard.promotePiece(piece, pieceInfo.pieceType);
          refreshSelection();
        }}
      >
        <img
          src={"images/pieces/" + piece.color + "/" + pieceInfo.image}
          alt=""
        />
      </div>
    ));
  };

  return (
    <div
      className={"promote-pawn-list " + "promote-" + piece.color + "-pawn-list"}
    >
      {renderOptions()}
    </div>
  );
};

export default PromotePawn;
