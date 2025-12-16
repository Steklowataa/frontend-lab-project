// dayMaps.ts

// Mapowanie indexu dnia (0-6) na skróty
export const dayMap: { [key: number]: string } = {
  0: "nd",
  1: "pon",
  2: "wt",
  3: "sr",
  4: "czw",
  5: "pt",
  6: "sb",
};

// Pełne nazwy dni (jeśli potrzebne gdzie indziej)
export const dayDisplayMap: { [key: string]: string } = {
  pon: "Poniedziałek",
  wt: "Wtorek",
  sr: "Środa",
  czw: "Czwartek",
  pt: "Piątek",
  sb: "Sobota",
  nd: "Niedziela",
};

// Skróty dni na potrzeby przycisków
export const dayShortMap: { [key: string]: string } = {
  pon: "PN",
  wt: "WT",
  sr: "SR",
  czw: "CZ",
  pt: "PT",
  sb: "SB",
  nd: "ND",
};
