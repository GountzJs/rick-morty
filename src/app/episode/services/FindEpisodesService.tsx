import { IEpisodeSchema } from "../../shared/schemas/episode.schema";
import { IFormFilters } from "../models/interfaces/formFilters.interface";

export const FindEpisodesService = () => {
  const findLocations = (
    page: number,
    episodes: IEpisodeSchema[],
    setPage: React.Dispatch<React.SetStateAction<number>>,
    setPageTotal: React.Dispatch<React.SetStateAction<number>>,
    setEpisodes: React.Dispatch<React.SetStateAction<IEpisodeSchema[]>>,
    setNotFound: React.Dispatch<React.SetStateAction<boolean>>,
    filters: IFormFilters,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    setLoading(true);
    setNotFound(false);
    let queryParam = `?page=${page}`;
    if(filters.name) queryParam += `&name=${filters.name.toLowerCase()}`;
    if(filters.episode) queryParam += `&episode=${filters.episode.toLowerCase()}`;
    fetch(import.meta.env.VITE_APP_API_URL + `episode${queryParam}`, {
      method: 'GET',
    })
      .then((res) => {
        if(!res.ok) throw res;
        return res.json()
      })
      .then((res) => {
        setNotFound(false);
        setPage(page + 1);
        setPageTotal(res.info.pages);
        const epds = page === 1 ? [...res.results] : [...episodes, ...res.results]
        setEpisodes(epds);
      })
      .catch(() => {
        setNotFound(true);
        setEpisodes([]);
      }).finally(() => setLoading(false));
  };

  return findLocations;
};
