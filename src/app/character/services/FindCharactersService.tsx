import { ICharacterSchema } from "../../shared/schemas/character.schema";
import { IFormFilters } from "../models/interfaces/formFilters.interface";

export const FindCharactersService = () => {
  const findCharacters = (
    page: number,
    characters: ICharacterSchema[],
    setPage: React.Dispatch<React.SetStateAction<number>>,
    setPageTotal: React.Dispatch<React.SetStateAction<number>>,
    setCharacters: React.Dispatch<React.SetStateAction<ICharacterSchema[]>>,
    setNotFound: React.Dispatch<React.SetStateAction<boolean>>,
    filters: IFormFilters,
    setLoading:  React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    setLoading(true);
    setNotFound(false);
    let queryParam = `?page=${page}`;
    if(filters.name) queryParam += `&name=${filters.name.toLowerCase()}`;
    if(filters.status) queryParam += `&status=${filters.status}`;
    if(filters.species) queryParam += `&species=${filters.species.toLowerCase()}`
    if(filters.gender) queryParam += `&gender=${filters.gender.toLowerCase()}`
    fetch(import.meta.env.VITE_APP_API_URL + `character${queryParam}`, {
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
        const chars = page === 1 ? [...res.results] : [...characters, ...res.results]
        setCharacters(chars);
      })
      .catch(() => {
        setNotFound(true);
        setCharacters([]);
      })
      .finally(() => setLoading(false));
  };

  return findCharacters;
};
