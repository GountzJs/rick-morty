import { ICharacterSchema } from "../../shared/schemas/character.schema";

export const FindCharacterService = () => {
  const findCharacter = (
    id: string, 
    setCharacter: React.Dispatch<React.SetStateAction<ICharacterSchema | undefined>>,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>,
    setNotFound: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    setCharacter(undefined);
    setLoading(true);
    fetch(import.meta.env.VITE_APP_API_URL + `character/${id}`, {
      method: 'GET',
    })
      .then((res) => {
        if(!res.ok) throw res;
        return res.json()
      })
      .then((res) => {
        setCharacter(res);
      })
      .catch(() => {
        setNotFound(true);
        setCharacter(undefined);
      })
      .finally(() => setLoading(false));
  };

  return findCharacter;
};
