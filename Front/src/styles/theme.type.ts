// * color 타입 생성

export const colorsKey = [
  "transparent",
  "mainParagraph",
  "mainPrimary",
  "mainDanger",
  "mainButton",
  "mainModalBg",
  "mainWhite",
  "primary300",
  "primary400",
  "primary500",
  "primary600",
  "primary700",
  "primary800",
  "primary900",
  "primary600p",
  "primary500p",
  "primary400p",
  "primary300p",
  "white",
  "white100",
  "white150",
  "white200",
  "white250",
  "white300",
  "white350",
  "white400",
  "gray",
  "gray100",
  "gray150",
  "gray200",
  "gray250",
  "gray300",
  "gray350",
  "gray400",
  "black100",
  "black200",
  "black",
  "red300",
  "red400",
  "red500",
  "red600",
  "red700",
  "red800",
  "red900",
  "red600p",
  "red500p",
  "red400p",
  "red300p",
  "lightBlue300",
  "lightBlue400",
  "lightBlue500",
  "lightBlue600",
  "lightBlue700",
  "lightBlue800",
  "lightBlue900",
  "lightBlue600p",
  "lightBlue500p",
  "lightBlue400p",
  "lightBlue300p",
] as const;

export type ColorType = typeof colorsKey[number];
