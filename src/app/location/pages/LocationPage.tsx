import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { DetailLocation } from "../DetailLocation";

export function LocationPage() {
  const [id, setId] = useState<string>();
  const params = useParams();

  useEffect(() => {
    setId(params['id']);
  }, [params])

  return (
    <section className="bg-gray-800 flex items-center justify-center max-w-screen">
      { id && <DetailLocation id={id} /> }
    </section>  
  )
}