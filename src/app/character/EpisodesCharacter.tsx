import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Spinner } from "../shared/Spinner";
import { IEpisodeSchema } from "../shared/schemas/episode.schema";
import { FindMultipleEpisodesServices } from "../shared/services/FindMultipleEpisodesService";

export function EpisodesCharacter({ ids }: { ids: string[] }) {
  const [loading, setLoading] = useState<boolean>(true);
  const [end, setEnd] = useState<number>(10);
  const [episodes, setEpisodes] = useState<IEpisodeSchema[]>();
  const findMultipleEpisodesServices = FindMultipleEpisodesServices();
  
  useEffect(() => {
    findMultipleEpisodesServices(
      ids,
      setEpisodes,
      setLoading
    );
  }, [])

  const nextPage = () => setEnd(end + 10);

  return (
    <div className="flex flex-col flex-wrap py-4 text-white px-24 h-auto w-full">
      <h2 className="text-gray-400 text-extrabold text-xl my-4 ">Appearances:</h2>
      <div className="flex flex-wrap pb-10 w-full">
        {
          episodes &&
          episodes.slice(0, end).map((episode: IEpisodeSchema, index: number) => 
            <Link to={`/episode/${episode.id}`} key={index} className="hover:text-orange-500 my-2 mx-4">
              { episode.episode }
            </Link>
          )
        }
      </div>
      { loading && <Spinner size={'text-4xl'} /> }
      <div className="flex items-center justify-center pb-6 w-full">
        {
          (episodes && end < episodes.length) &&
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