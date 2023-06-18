import moment from "moment";
import { Link } from "react-router-dom";
import { IEpisodeSchema } from "../shared/schemas/episode.schema";

export function Episode({ item }: { item: IEpisodeSchema }) {

  const getSeason = (seasonEpisode: string) => {
    const season = seasonEpisode.slice(1, 3);
    return season;
  };
  
  const getEpisode = (seasonEpisode: string) => {
    const episode = seasonEpisode.slice(4);
    return episode;
  };

  return (
    <div className="bg-gray-700 rounded-md flex flex-col items-center text-white py-6 px-4 m-4 w-[250px]">
      <Link to={`/episode/${item.id}`} className="text-center text-xl font-extrabold hover:text-orange-500 mb-6 w-full">
        {item.name}
      </Link>
      <div className="flex items-center justify-evenly w-full">
        <p className="text-gray-400 text-lg font-bold">
          Season: <span className="text-md text-white font-medium">{getSeason(item.episode)}</span>
        </p>
        <p className="text-gray-400 text-lg font-bold">
          Episode: <span className="text-md text-white font-medium">{getEpisode(item.episode)}</span>
        </p>
      </div>
      <p className="text-gray-400 text-lg font-bold text-center mt-6 w-full">
        Air date: <span className="text-md text-white font-medium">{moment(item.air_date).format('LL')}</span>
      </p>
    </div>  
  )
}