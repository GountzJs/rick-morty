import { ILocationSchema } from "../../shared/schemas/location.schema";
import { IFormFilters } from "../models/interfaces/formFilters.interface";

export const FindLocationsService = () => {
  const findLocations = (
    page: number,
    locations: ILocationSchema[],
    setPage: React.Dispatch<React.SetStateAction<number>>,
    setPageTotal: React.Dispatch<React.SetStateAction<number>>,
    setLocations: React.Dispatch<React.SetStateAction<ILocationSchema[]>>,
    setNotFound: React.Dispatch<React.SetStateAction<boolean>>,
    filters: IFormFilters,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    setLoading(true);
    setNotFound(false);
    let queryParam = `?page=${page}`;
    if(filters.name) queryParam += `&name=${filters.name.toLowerCase()}`;
    if(filters.type) queryParam += `&type=${filters.type.toLowerCase()}`;
    if(filters.dimension) queryParam += `&dimension=${filters.dimension.toLowerCase()}`
    fetch(import.meta.env.VITE_APP_API_URL + `location${queryParam}`, {
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
        const lcts = page === 1 ? [...res.results] : [...locations, ...res.results]
        setLocations(lcts);
      })
      .catch(() => {
        setNotFound(true);
        setLocations([]);
      }).finally(() => setLoading(false));
  };

  return findLocations;
};
