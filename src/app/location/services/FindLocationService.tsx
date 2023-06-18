import { ILocationSchema } from '../../shared/schemas/location.schema';

export const FindLocationService = () => {
  const findLocations = (
    id: string,
    setLocation: React.Dispatch<React.SetStateAction<ILocationSchema | undefined>>,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>,
    setNotFound: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    setLoading(true);
    fetch(import.meta.env.VITE_APP_API_URL + `location/${id}`, {
      method: 'GET',
    })
      .then((res) => {
        if(!res.ok) throw res;
        return res.json()
      })
      .then((res) => {
        setLocation(res);
      })
      .catch(() => {
        setNotFound(true);
        setLocation(undefined);
      })
      .finally(() => setLoading(false));
  };

  return findLocations;
};
