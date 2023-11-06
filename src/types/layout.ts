export interface Coordinates {
  x: number;
  y: number;
}

export interface LayoutPart {
  size: Coordinates;
  position: Coordinates;
}

export interface Layout {
  size: Coordinates;
  content: LayoutPart[]
}