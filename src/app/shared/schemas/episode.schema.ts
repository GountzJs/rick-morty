export interface IEpisodeSchema {
  id: string;
  name: string;
  air_date: Date;
  episode: string;
  characters: string[];
  url: string;
  created: Date;
}
