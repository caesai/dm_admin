export interface ICity {
  id: number;
  name: string;
  name_english: string;
  name_dative: string;
}

export interface ICityCreate{
  name: string,
  name_dative: string,
  name_english: string,
}
