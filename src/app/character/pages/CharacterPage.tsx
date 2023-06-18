import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { DetailCharacter } from "../DetailCharacter";

export function CharacterPage() {
  const [id, setId] = useState<string>();
  const params = useParams();

  useEffect(() => {
    setId(params['id']);
  }, [params])

  return (
    <section className="bg-gray-800 flex items-center justify-center max-w-screen">
      { id && <DetailCharacter id={id} /> }
    </section>
  )
}