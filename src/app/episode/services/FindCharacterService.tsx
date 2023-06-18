import { IEpisodeSchema } from "../../shared/schemas/episode.schema";

export const FindEpisodeService = () => {
  const findCharacter = (
    id: string, 
    setEpisode: React.Dispatch<React.SetStateAction<IEpisodeSchema | undefined>>,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>,
    setNotFound: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    setLoading(true);
    fetch(import.meta.env.VITE_APP_API_URL + `episode/${id}`, {
      method: 'GET',
    })
      .then((res) => {
        if(!res.ok) throw res;
        return res.json()
      })
      .then((res) => {
        setEpisode(res);
      })
      .catch(() => {
        setNotFound(true);
      })
      .finally(() => setLoading(false));
  };

  return findCharacter;
};
