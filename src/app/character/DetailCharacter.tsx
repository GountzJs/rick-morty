import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Spinner } from "../shared/Spinner";
import { NotFound } from "../shared/not-found/NotFound";
import { ICharacterSchema } from "../shared/schemas/character.schema";
import { EpisodesCharacter } from "./EpisodesCharacter";
import { FindCharacterService } from "./services/FindCharacterService";

export function DetailCharacter({ id }: { id: string }) {
  const [loading, setLoading] = useState<boolean>(true);
  const [character, setCharacter] = useState<ICharacterSchema>();
  const [notFound, setNotFound] = useState<boolean>(false);
  const findCharacterService = FindCharacterService();

  useEffect(() => {
    findCharacterService(id, setCharacter, setLoading, setNotFound);
  }, [id])

  const parsetIdsEpisodes = (episodes: string[]) => {
    return episodes.map((episode) => {
      const partsUrl = episode.split('/');
      return partsUrl[partsUrl.length - 1];
    })
  }

  const getStatusClass = (character: ICharacterSchema) => {
    if(character.status === 'Alive') return 'text-green-500';
    else if(character.status === 'Dead') return 'text-red-500';
    return 'text-gray-300'
  }

  const goToLocation = (url: string)=> {
    const partUrl = url.split('/');
    const id = partUrl[partUrl.length - 1];
    return `/location/${id}`;
  }

  return (
    <>
      {
        character &&
        <article className="bg-gray-600 flex flex-col items-center justify-center text-white rounded-md py-8 px-6 my-4 mx-4 min-h-[230px] w-[600px]">
          <div className="flex items-center justify-center rounded-md h-[229px] w-[230px]">
            <img src={character.image} className="bg-cover bg-center rounded-md" alt="" />
          </div>
          <h2 className="font-black text-center text-2xl my-4 w-full">
            {character.name}
          </h2>
          <p className="text-sm">
            <i className={`bx bxs-circle text-xs mr-2 ${getStatusClass(character)}`}></i>
            {character.status} - {character.species}
          </p>
          <div className="flex items-center mt-6 justify-center">
            <h2 className="text-gray-400 text-sm font-semibold">Last known location:</h2>
            {
              character.location.url 
              ? <Link 
                  to={goToLocation(character.location.url)} 
                  className="ml-4 hover:text-orange-500"
                >
                  {character.location.name}
                </Link>
              : <p className="ml-4">{character.location.name}</p>
            }
          </div>
          <div className="flex items-center mt-6 justify-center">
            <h2 className="text-gray-400 text-sm font-semibold">First seen in:</h2>
            {
              character.origin.url 
              ? <Link 
                  to={goToLocation(character.origin.url)} 
                  className="ml-4 hover:text-orange-500"
                >
                  {character.origin.name}
                </Link>
              : <p className="ml-4">{character.origin.name}</p>
            }
          </div>
          <EpisodesCharacter ids={parsetIdsEpisodes(character.episode)} />
        </article>
      }
      {
        (notFound && !loading) &&
        <div className="flex items-center justify-center w-full">
          <NotFound 
          title="No character found" 
          description="The character you were looking for was not found, try looking for it in the character screen" /> 
        </div>
      }
      {
        loading &&
        <div className="flex items-center justify-center h-[600px] w-full">
          <Spinner size={'text-8xl'} />
        </div>
      }
    </>  
  )
}