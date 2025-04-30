import Chessboard from "@/app/classes/Chessboard/Chessboard";
import Piece from "@/app/classes/Pieces/Piece";

import { Colors, Columns, Pieces, Rows } from "@/app/enums/chess";

import { Position } from "@/app/interfaces/chess";
import PromotePawn from "./PromotePawn";

interface ChessboardCellProps {
  chessboard: Chessboard;
  row: Rows;
  column: Columns;
  possibleMovements: Position[];
  isPromoting: boolean;
  showMovementsOfPiece: (piece: Piece) => void;
  movePiece: (
    row: Rows,
    columns: Columns,
    additionalAction?: (id: string, piece: Piece) => void
  ) => void;
  refreshSelection: () => void;
}

const ChessboardCell = (props: ChessboardCellProps) => {
  const {
    chessboard,
    row,
    column,
    possibleMovements,
    isPromoting,
    showMovementsOfPiece,
    movePiece,
    refreshSelection,
  } = props;

  const getPiece = () => {
    return chessboard.getPiece(row, column);
  };

  const canMoveToSquare = () => {
    const possibleMove = possibleMovements.find(
      (movement) => movement.row === row && movement.column === column
    );

    if (possibleMove) {
      return possibleMove;
    }

    return false;
  };

  const renderClassName = () => {
    const classes = ["chessboard-cell"];

    if (canMoveToSquare() && getPiece() !== false) {
      classes.push("chessboard-cell-take");
    }

    return classes.join(" ");
  };

  const checkForPiece = () => {
    const piece = getPiece();

    if (piece) {
      const { pieceType, color, image } = piece;

      if (
        pieceType === Pieces.Pawn &&
        ((color === Colors.Black && row === Rows.One) ||
          (color === Colors.White && row === Rows.Eight))
      ) {
        return (
          <PromotePawn
            chessboard={chessboard}
            piece={piece}
            refreshSelection={refreshSelection}
          />
        );
      }

      return <div className="piece" style={{ background: "url('" + image + "')" }}></div>;
    } else if (canMoveToSquare()) {
      return <div className="dot"></div>;
    }
    return;
  };

  const handleOnClick = () => {
    if (!isPromoting) {
      const piece = getPiece();

      const possibleMovement = canMoveToSquare();

      if (piece !== false) {
        if (possibleMovement) {
          movePiece(row, column, possibleMovement?.additionalAction);
        } else {
          showMovementsOfPiece(piece);
        }
      } else if (possibleMovement) {
        movePiece(row, column, possibleMovement?.additionalAction);
      } else {
        refreshSelection();
      }
    }
  };

  return (
    <div onClick={handleOnClick} className={renderClassName()}>
      {checkForPiece()}
    </div>
  );
};

export default ChessboardCell;
