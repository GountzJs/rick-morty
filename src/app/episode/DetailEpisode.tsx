import moment from "moment";
import { useEffect, useState } from "react";
import { Spinner } from "../shared/Spinner";
import { NotFound } from "../shared/not-found/NotFound";
import { IEpisodeSchema } from "../shared/schemas/episode.schema";
import { CharactersEpisode } from "./CharactersEpisode";
import { FindEpisodeService } from "./services/FindCharacterService";

export function DetailEpisode({ id }: { id: string }) {
  const [loading, setLoading] = useState<boolean>(true);
  const [episode, setEpisode] = useState<IEpisodeSchema>();
  const [notFound, setNotFound] = useState<boolean>(false);
  const findEpisodeService = FindEpisodeService();

  useEffect(() => {
    findEpisodeService(id, setEpisode, setLoading, setNotFound);
  }, [id])

  const parsetIdsCharacters = (characters: string[]) => {
    return characters.map((resident: string) => {
      const partsUrl = resident.split('/');
      return partsUrl[partsUrl.length - 1];
    })
  }

  const getSeason = (seasonEpisode: string) => {
    const season = seasonEpisode.slice(1, 3);
    return season;
  };
  
  const getEpisode = (seasonEpisode: string) => {
    const episode = seasonEpisode.slice(4);
    return episode;
  };

  return (
    <>
      {
        episode &&
        <article className="bg-gray-600 flex flex-col items-center justify-center text-white rounded-md py-8 px-2 my-4 mx-4 min-h-[230px] w-[600px]">
          <h2 className="text-center text-xl font-extrabold mb-6 w-full">{episode.name}</h2>
          <div className="flex items-center justify-evenly w-full">
            <p className="text-gray-400 text-lg font-bold">
              Season: <span className="text-md text-white font-medium">{getSeason(episode.episode)}</span>
            </p>
            <p className="text-gray-400 text-lg font-bold">
              Episode: <span className="text-md text-white font-medium">{getEpisode(episode.episode)}</span>
            </p>
          </div>
          <p className="text-gray-400 text-lg font-bold text-center mt-6 w-full">
            Air date: <span className="text-md text-white font-medium">{moment(episode.air_date).format('LL')}</span>
          </p>
          <CharactersEpisode ids={parsetIdsCharacters(episode.characters)} />
        </article>
      }
      {
        (notFound && !loading) &&
        <div className="flex items-center justify-center w-full">
          <NotFound 
            title="No episode found" 
            description="The searched episode was not found, try searching for it in the episodes screen" 
          /> 
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