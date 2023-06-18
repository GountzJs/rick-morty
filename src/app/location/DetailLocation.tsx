import { useEffect, useState } from "react";
import { Spinner } from "../shared/Spinner";
import { NotFound } from "../shared/not-found/NotFound";
import { ILocationSchema } from "../shared/schemas/location.schema";
import { CharactersLocation } from "./CharactersLocation";
import { FindLocationService } from "./services/FindLocationService";

export function DetailLocation({ id }: { id: string }) {
  const [loading, setLoading] = useState<boolean>(true);
  const [notFound, setFound] = useState<boolean>(false);
  const [location, setLocation] = useState<ILocationSchema>();
  const findLocationService = FindLocationService();

  useEffect(() => {
    findLocationService(id, setLocation, setLoading, setFound);
  }, [id])

  const parsetIdsResidents = (residents: string[]) => {
    return residents?.map((resident: string) => {
      const partsUrl = resident.split('/');
      return partsUrl[partsUrl.length - 1];
    })
  }

  return (
    <>
      {
        location &&
        <article className="bg-gray-600 flex flex-col items-center justify-center text-white rounded-md py-8 px-2 my-4 mx-4 min-h-[230px] w-[600px]">
          <div className="flex items-center justify-evenly mt-6 w-full">
            <div className="flex flex-col items-center justify-center">
              <h2 className="text-gray-400 text-sm font-semibold">Type:</h2>
              <p className="mt-2">{location.type}</p>
            </div>
            <div className="flex flex-col items-center justify-center">
              <h2 className="text-gray-400 text-sm font-semibold">Name:</h2>
              <p className="mt-2">{location.name}</p>
            </div>
          </div>
          <div className="flex  items-center justify-center mt-8">
            <h2 className="text-gray-400 text-md font-semibold">Dimension:</h2>
            <p className="ml-4">{location.dimension}</p>
          </div>
          <CharactersLocation ids={parsetIdsResidents(location.residents)} />
        </article>
      }
      {
        (notFound && !loading) &&
        <div className="flex items-center justify-center w-full">
          <NotFound 
            title="No location found" 
            description="The searched location was not found, try searching for it in the locations screen" 
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