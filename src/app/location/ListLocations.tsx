import { useEffect, useState } from "react";
import { Spinner } from "../shared/Spinner";
import { ScrollInfiniteHook } from "../shared/hooks/ScrollInfiniteHook";
import { NotFound } from "../shared/not-found/NotFound";
import { ILocationSchema } from "../shared/schemas/location.schema";
import { FilterLocation } from "./FilterLocation";
import { Location } from "./Location";
import { IFormFilters } from "./models/interfaces/formFilters.interface";
import { FindLocationsService } from "./services/FindLocationsService";

export function ListLocations() {
  const [loading, setLoading] = useState<boolean>(true);
  const [locations, setLocations] = useState<ILocationSchema[]>([]);
  const [page, setPage] = useState<number>(1);
  const [pageTotal, setPageTotal] = useState<number>(0);
  const [filters, setFilters] = useState<IFormFilters>({ name: '', type: '', dimension: '' })
  const [notFound, setNotFound] = useState<boolean>(false);
  const findLocations = FindLocationsService();

  useEffect(() => {
    nextPage();
  }, [])


  const findQuery = (pg?: number) => {
    findLocations(
      pg ?? page, 
      locations, 
      setPage, 
      setPageTotal, 
      setLocations,
      setNotFound,
      filters,
      setLoading
    )
  }

  const nextPage = () => findQuery();

  const action = () => {
    setPage(1);
    setLocations([]);
    findQuery(1);
  }

  return (
    <article className="flex flex-col h-full max-w-screen">
      <FilterLocation action={action} filters={filters} setFilters={setFilters} loading={loading} /> 
      {
        locations.length &&
        <div 
          className="flex justify-center items-center flex-wrap overflow-y-auto h-[680px] mt-10 max-w-screen" 
          onScroll={ScrollInfiniteHook({ nextPage, conditions: page <= pageTotal })}
        >
          { locations.map((location: ILocationSchema, index: number) => <Location key={index} item={location} />) }
        </div>
      }
      {
        notFound && 
        <div className="flex items-center justify-center w-full">
          <NotFound title="No locations found" description="There are no locations for the filter used, try another one" /> 
        </div>
      }
      { loading && <Spinner size={page === 1 ? 'text-8xl' : 'text-4xl'} /> }
    </article>  
  )
}