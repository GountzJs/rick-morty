import { ICharacterSchema } from "../schemas/character.schema";

export const FindMultipleCharactersServices = () => {
  const findEpisodes = (
    ids: string[],
    setCharacter: React.Dispatch<React.SetStateAction<ICharacterSchema[] | undefined>>,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    fetch(import.meta.env.VITE_APP_API_URL + `character/${ids}`, {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((res) => {
        const listEpisodes = res.length > 1 ? res : [res];
        setCharacter(listEpisodes);
      })
      .catch(() => setCharacter([]))
      .finally(() => setLoading(false));
  };

  return findEpisodes;
}