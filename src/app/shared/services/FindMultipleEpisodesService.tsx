import { IEpisodeSchema } from "../schemas/episode.schema";

export const FindMultipleEpisodesServices = () => {
  const findEpisodes = (
    ids: string[],
    setEpisodes: React.Dispatch<React.SetStateAction<IEpisodeSchema[] | undefined>>,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    fetch(import.meta.env.VITE_APP_API_URL + `episode/${ids}`, {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((res) => {
        const listEpisodes = res.length > 1 ? res : [res];
        setEpisodes(listEpisodes);
      })
      .catch(() => setEpisodes([]))
      .finally(() => setLoading(false));
  };

  return findEpisodes;
}