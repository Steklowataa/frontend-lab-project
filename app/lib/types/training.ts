export interface Training {
  id: string;
  name: string;
  instructure: string;
  day: string;
  hour: number;
  categorie: string
}

export interface SignedUpTraining extends Training {
  signUpId: string;
  date: string;
  docId?: string;
}
