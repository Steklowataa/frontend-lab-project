// dayMaps.ts

// Mapowanie indexu dnia (0-6) na skróty
export const dayMap: { [key: number]: string } = {
  0: "nd",
  1: "pn",
  2: "wt",
  3: "sr",
  4: "cz",
  5: "pt",
  6: "so",
};

// Pełne nazwy dni (jeśli potrzebne gdzie indziej)
export const dayDisplayMap: { [key: string]: string } = {
  pn: "Poniedziałek",
  wt: "Wtorek",
  sr: "Środa",
  cz: "Czwartek",
  pt: "Piątek",
  so: "Sobota",
  nd: "Niedziela",
};

// Skróty dni na potrzeby przycisków
export const dayShortMap: { [key: string]: string } = {
  pn: "PN",
  wt: "WT",
  sr: "SR",
  cz: "CZ",
  pt: "PT",
  so: "SO",
  nd: "ND",
};