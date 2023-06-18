import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Spinner } from "../shared/Spinner";
import { ICharacterSchema } from "../shared/schemas/character.schema";
import { FindMultipleCharactersServices } from "../shared/services/FindMultipleCharactersService";

export function CharactersLocation({ ids }: { ids: string[] }) {
  const [loading, setLoading] = useState<boolean>(true);
  const [end, setEnd] = useState<number>(6);
  const [characters, setCharacters] = useState<ICharacterSchema[]>();
  const findMultipleCharactersServices = FindMultipleCharactersServices();
  
  useEffect(() => {
    ids.length 
      ? findMultipleCharactersServices(
          ids,
          setCharacters,
          setLoading
        )
      : setLoading(false);
  }, [])

  const nextPage = () => setEnd(end + 6);

  const goToCharacter = (url: string)=> {
    const partUrl = url.split('/');
    const id = partUrl[partUrl.length - 1];
    return `/character/${id}`;
  }

  return (
    <div className="flex flex-col flex-wrap py-4 text-white px-12 md:px-24 h-auto w-full">
      <h2 className="text-gray-400 text-extrabold text-xl my-4 ">Residents:</h2>
      { 
        (!loading && !characters?.length ) && 
        <p className="ml-4">There are no registered residents for this location</p> 
      }
      <div className="flex flex-wrap pb-10 w-full">
        {
          characters &&
          characters.slice(0, end).map((character: ICharacterSchema, index: number) =>
            <Link key={index} to={character.url ? goToCharacter(character.url) : '/'} className="group flex relative">
              <img key={index} className="my-2 mx-4 rounded-lg" src={character.image} height={80} width={80} alt={character.name} />
              <span 
                className={`
                  group-hover:opacity-100 transition-opacity bg-gray-800 px-1 text-sm text-gray-100 rounded-md 
                  absolute bottom-[0px] left-[10px] opacity-0 py-4 text-center w-[100px] z-[1]
                `}
              >
                {character.name}
              </span>
            </Link>
          )
        }
      </div>
      { loading && <Spinner size={'text-4xl'} /> }
      <div className="flex items-center justify-center pb-6 w-full">
        {
          (characters && end < characters.length) &&
          <button
            type="button" 
            className="bg-gray-400 px-8 py-2 rounded-lg text-sm font-black"
            onClick={nextPage}
          >
            Show more
          </button>
        }
      </div>
    </div>
  )
}