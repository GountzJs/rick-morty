import { useEffect, useState } from "react";
import { Spinner } from "../shared/Spinner";
import { ScrollInfiniteHook } from "../shared/hooks/ScrollInfiniteHook";
import { NotFound } from "../shared/not-found/NotFound";
import { ICharacterSchema } from "../shared/schemas/character.schema";
import { Character } from "./Character";
import { FilterCharacter } from "./FilterCharacter";
import { IFormFilters } from "./models/interfaces/formFilters.interface";
import { FindCharactersService } from "./services/FindCharactersService";

export function ListCharacters() {
  const [loading, setLoading] = useState<boolean>(true);
  const [characters, setCharacters] = useState<ICharacterSchema[]>([]);
  const [page, setPage] = useState<number>(1);
  const [pageTotal, setPageTotal] = useState<number>(0);
  const [filters, setFilters] = useState<IFormFilters>({ name: '', status: '', species: '', type: '', gender: '' });
  const [notFound, setNotFound] = useState<boolean>(false);
  const findCharacters = FindCharactersService(); 

  useEffect(() => {
    nextPage();
  }, [])

  const findQuery = (pg?: number) => {
    findCharacters(
      pg ?? page, 
      characters, 
      setPage, 
      setPageTotal, 
      setCharacters,
      setNotFound,
      filters,
      setLoading
    )
  }

  const nextPage = () => findQuery();

  const action = () => {
    setPage(1);
    setCharacters([]);
    findQuery(1);
  }

  return (
    <article className="flex flex-col h-[750px] w-[99vw] pb-10 w-[85vw] lg:w-[99vw]">
      <FilterCharacter action={action} filters={filters} setFilters={setFilters} />
      {
        characters.length &&
        <div
          className={`
            flex justify-center items-center flex-wrap overflow-y-auto  
            w-[100%] h-[100%]
          `}
          onScroll={ScrollInfiniteHook({ nextPage, conditions: page <= pageTotal })}
        > 
          { characters.map((character: ICharacterSchema, index: number) => <Character key={index} item={character} />) }
        </div>
      }
      {
        (notFound && !loading) &&
        <div className="flex items-center justify-center w-full">
          <NotFound title="No characters found" description="There are no characters for the filter used, try another one" /> 
        </div>
      }
      { loading && <Spinner size={page === 1 ? 'text-9xl' : 'text-4xl'} /> }
    </article>  
  )
}