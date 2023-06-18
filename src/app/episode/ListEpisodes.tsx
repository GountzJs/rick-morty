import { useEffect, useState } from "react";
import { Spinner } from "../shared/Spinner";
import { ScrollInfiniteHook } from "../shared/hooks/ScrollInfiniteHook";
import { NotFound } from "../shared/not-found/NotFound";
import { IEpisodeSchema } from "../shared/schemas/episode.schema";
import { Episode } from "./Episode";
import { FilterEpisode } from "./FilterEpisode";
import { IFormFilters } from "./models/interfaces/formFilters.interface";
import { FindEpisodesService } from "./services/FindEpisodesService";

export function ListEpisodes() {
  const [episodes, setEpisodes] = useState<IEpisodeSchema[]>([]);
  const [page, setPage] = useState<number>(1);
  const [filters, setFilters] = useState<IFormFilters>({ name: '', episode: '' });
  const [pageTotal, setPageTotal] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [notFound, setNotFound] = useState<boolean>(false);
  const findEpisodes = FindEpisodesService()

  useEffect(() => {
    nextPage();
  }, [])

  const findQuery = (pg?: number) => {
    findEpisodes(
      pg ?? page, 
      episodes, 
      setPage, 
      setPageTotal, 
      setEpisodes,
      setNotFound,
      filters,
      setLoading
    )
  }

  const nextPage = () => findQuery();

  const action = () => {
    setPage(1);
    setEpisodes([]);
    findQuery(1);
  }

  return (
    <article className="flex flex-col h-full max-w-screen">
      <FilterEpisode action={action} filters={filters} setFilters={setFilters} loading={loading} />
      {
        episodes.length &&
        <div 
          className="flex justify-center items-center flex-wrap overflow-y-auto h-[70%] mt-10 max-w-screen"  
          onScroll={ScrollInfiniteHook({ nextPage , conditions: page <= pageTotal })}
        >
          {
            episodes.map(( episode: IEpisodeSchema, index: number) => <Episode key={index} item={episode} />)
          }
        </div>
      }
      {
        notFound &&
        <div className="flex items-center justify-center w-full">
          <NotFound title="No episodes found" description="There are no episodes for the filter used, try another one" /> 
        </div>
      }
      { loading && <Spinner size={page === 1 ? 'text-8xl' : 'text-4xl'} /> }
    </article>  
  )
}