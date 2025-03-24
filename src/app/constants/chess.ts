import { Columns, Pieces, Rows } from "@/app/enums/chess";
import { PieceInfo } from "@/app/interfaces/chess";

export const rows = [
  Rows.Eight,
  Rows.Seven,
  Rows.Six,
  Rows.Five,
  Rows.Four,
  Rows.Three,
  Rows.Two,
  Rows.One,
];
export const columns = [
  Columns.A,
  Columns.B,
  Columns.C,
  Columns.D,
  Columns.E,
  Columns.F,
  Columns.G,
  Columns.H,
];

export const whitePieces: PieceInfo[] = [
  {
    piece: Pieces.Rook,
    row: Rows.One,
    column: Columns.A,
  },
  {
    piece: Pieces.Knight,
    row: Rows.One,
    column: Columns.B,
  },
  {
    piece: Pieces.Bishop,
    row: Rows.One,
    column: Columns.C,
  },
  {
    piece: Pieces.Queen,
    row: Rows.One,
    column: Columns.D,
  },
  {
    piece: Pieces.King,
    row: Rows.One,
    column: Columns.E,
  },
  {
    piece: Pieces.Bishop,
    row: Rows.One,
    column: Columns.F,
  },
  {
    piece: Pieces.Knight,
    row: Rows.One,
    column: Columns.G,
  },
  {
    piece: Pieces.Rook,
    row: Rows.One,
    column: Columns.H,
  },
  {
    piece: Pieces.Pawn,
    row: Rows.Two,
    column: Columns.A,
  },
  {
    piece: Pieces.Pawn,
    row: Rows.Two,
    column: Columns.B,
  },
  {
    piece: Pieces.Pawn,
    row: Rows.Two,
    column: Columns.C,
  },
  {
    piece: Pieces.Pawn,
    row: Rows.Two,
    column: Columns.D,
  },
  {
    piece: Pieces.Pawn,
    row: Rows.Two,
    column: Columns.E,
  },
  {
    piece: Pieces.Pawn,
    row: Rows.Two,
    column: Columns.F,
  },
  {
    piece: Pieces.Pawn,
    row: Rows.Two,
    column: Columns.G,
  },
  {
    piece: Pieces.Pawn,
    row: Rows.Two,
    column: Columns.H,
  },
];

export const blackPieces: PieceInfo[] = [
  {
    piece: Pieces.Rook,
    row: Rows.Eight,
    column: Columns.A,
  },
  {
    piece: Pieces.Knight,
    row: Rows.Eight,
    column: Columns.B,
  },
  {
    piece: Pieces.Bishop,
    row: Rows.Eight,
    column: Columns.C,
  },
  {
    piece: Pieces.Queen,
    row: Rows.Eight,
    column: Columns.D,
  },
  {
    piece: Pieces.King,
    row: Rows.Eight,
    column: Columns.E,
  },
  {
    piece: Pieces.Bishop,
    row: Rows.Eight,
    column: Columns.F,
  },
  {
    piece: Pieces.Knight,
    row: Rows.Eight,
    column: Columns.G,
  },
  {
    piece: Pieces.Rook,
    row: Rows.Eight,
    column: Columns.H,
  },
  {
    piece: Pieces.Pawn,
    row: Rows.Seven,
    column: Columns.A,
  },
  {
    piece: Pieces.Pawn,
    row: Rows.Seven,
    column: Columns.B,
  },
  {
    piece: Pieces.Pawn,
    row: Rows.Seven,
    column: Columns.C,
  },
  {
    piece: Pieces.Pawn,
    row: Rows.Seven,
    column: Columns.D,
  },
  {
    piece: Pieces.Pawn,
    row: Rows.Seven,
    column: Columns.E,
  },
  {
    piece: Pieces.Pawn,
    row: Rows.Seven,
    column: Columns.F,
  },
  {
    piece: Pieces.Pawn,
    row: Rows.Seven,
    column: Columns.G,
  },
  {
    piece: Pieces.Pawn,
    row: Rows.Seven,
    column: Columns.H,
  },
];
