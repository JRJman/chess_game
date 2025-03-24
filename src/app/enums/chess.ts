export enum Colors {
  White = "white",
  Black = "black",
}

export enum Pieces {
  Pawn = "pawn",
  Knight = "knight",
  Bishop = "bishop",
  Rook = "rook",
  Queen = "queen",
  King = "king",
}

export enum Rows {
  One = "1",
  Two = "2",
  Three = "3",
  Four = "4",
  Five = "5",
  Six = "6",
  Seven = "7",
  Eight = "8",
}

export enum Columns {
  A = "A",
  B = "B",
  C = "C",
  D = "D",
  E = "E",
  F = "F",
  G = "G",
  H = "H",
}

export enum MovementDirections {
  Up = "up",
  UpRight = "up-right",
  Right = "right",
  DownRight = "down-right",
  Down = "down",
  DownLeft = "down-left",
  Left = "left",
  UpLeft = "up-left",
}

export enum DiagonalDirections {
  UpRightAndDownLeft = "up-right-down-left",
  UpLeftAndDownRight = "up-left-down-right",
}

export enum PossibleMoveTypes {
  Normal = "normal",
  Infinity = "infinity",
}
